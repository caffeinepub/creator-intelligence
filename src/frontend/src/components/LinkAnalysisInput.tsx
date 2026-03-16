import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link as LinkIcon, Loader2 } from "lucide-react";
import { useState } from "react";

interface LinkAnalysisInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export default function LinkAnalysisInput({
  onSubmit,
  isLoading,
}: LinkAnalysisInputProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const validateUrl = (input: string): boolean => {
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!validateUrl(url)) {
      setError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    onSubmit(url);
  };

  return (
    <Card className="border-secondary/20 shadow-sm mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <LinkIcon className="w-5 h-5 text-secondary" />
          Analyze Content Link
        </CardTitle>
        <CardDescription>
          Paste any content URL to get strategic insights and recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Content URL</Label>
            <div className="flex gap-2">
              <Input
                id="url"
                type="text"
                placeholder="https://instagram.com/p/... or any content link"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-secondary hover:bg-secondary/90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze"
                )}
              </Button>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
