import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Loader2, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { CreatorProfile } from "../backend";
import { generateDraft } from "../utils/draftGenerator";

interface DraftGeneratorProps {
  profile: CreatorProfile;
}

export function DraftGenerator({ profile }: DraftGeneratorProps) {
  const [activeTab, setActiveTab] = useState<"bio" | "pitch" | "mediaKit">(
    "bio",
  );
  const [generatedDraft, setGeneratedDraft] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const draft = await generateDraft({
        profile,
        draftType: activeTab,
      });
      setGeneratedDraft(draft);
    } catch (error) {
      console.error("Error generating draft:", error);
      toast.error("Failed to generate draft");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDraft);
    toast.success("Copied to clipboard!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Draft Generator</CardTitle>
        <CardDescription>
          Generate professional bios, pitches, and media kits
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as typeof activeTab)}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bio">Bio</TabsTrigger>
            <TabsTrigger value="pitch">Pitch</TabsTrigger>
            <TabsTrigger value="mediaKit">Media Kit</TabsTrigger>
          </TabsList>

          <TabsContent value="bio" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Generate a professional bio for your social media profiles
            </p>
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Generate Bio
            </Button>
          </TabsContent>

          <TabsContent value="pitch" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Create a compelling pitch for brand partnerships
            </p>
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Generate Pitch
            </Button>
          </TabsContent>

          <TabsContent value="mediaKit" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Build a comprehensive media kit for collaborations
            </p>
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Generate Media Kit
            </Button>
          </TabsContent>
        </Tabs>

        {generatedDraft && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Generated Draft</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleGenerate}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Textarea
              value={generatedDraft}
              onChange={(e) => setGeneratedDraft(e.target.value)}
              rows={15}
              className="font-mono text-sm"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
