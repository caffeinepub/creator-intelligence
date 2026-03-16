import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Loader2, RotateCw } from "lucide-react";
import { toast } from "sonner";

interface GeneratedContentOutputProps {
  content: string;
  onChange: (value: string) => void;
  onRegenerate: () => void;
  isGenerating: boolean;
}

export default function GeneratedContentOutput({
  content,
  onChange,
  onRegenerate,
  isGenerating,
}: GeneratedContentOutputProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Generated Content</h3>
        {content && !isGenerating && (
          <div className="flex gap-2">
            <Button onClick={handleCopy} variant="outline" size="sm">
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
            <Button onClick={onRegenerate} variant="outline" size="sm">
              <RotateCw className="w-4 h-4 mr-1" />
              Regenerate
            </Button>
          </div>
        )}
      </div>

      {isGenerating ? (
        <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg border border-border">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : content ? (
        <Textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          rows={15}
          className="font-mono text-sm"
        />
      ) : (
        <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg border border-border">
          <p className="text-foreground/40 text-sm">
            Generated content will appear here
          </p>
        </div>
      )}
    </div>
  );
}
