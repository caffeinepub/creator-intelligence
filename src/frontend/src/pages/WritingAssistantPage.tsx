import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import type { Platform } from "../backend";
import ContentIdeasSection from "../components/ContentIdeasSection";
import GeneratedContentOutput from "../components/GeneratedContentOutput";
import { WritingForm } from "../components/WritingForm";
import { useAllContent, useProfile } from "../hooks/useQueries";
import { generateContent } from "../utils/contentGenerator";
import { generateContentIdeas } from "../utils/contentIdeaGenerator";

export function WritingAssistantPage() {
  const { data: profile, isLoading } = useProfile();
  const { data: content } = useAllContent();
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const contentIdeas = generateContentIdeas(
    content || [],
    profile?.contentPillars || [],
  );

  const handleGenerate = async (data: {
    contentType: string;
    platform: Platform;
    topic: string;
    existingText?: string;
  }) => {
    if (!profile) return;

    setIsGenerating(true);
    try {
      const result = await generateContent({
        profile,
        contentType: data.contentType,
        platform: data.platform,
        topic: data.topic,
        existingText: data.existingText,
      });
      setGeneratedContent(result);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    setGeneratedContent("");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2
          className="h-8 w-8 animate-spin text-primary"
          data-ocid="writing.loading_state"
        />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-display font-bold">
              No Profile Found
            </CardTitle>
            <CardDescription>
              Please create a profile first to use the writing assistant
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-4xl text-foreground tracking-tight">
          Writing Assistant
        </h1>
        <div className="h-1 w-16 bg-primary rounded-full mt-2" />
        <p className="text-muted-foreground mt-2">
          Generate content tailored to{" "}
          <span className="font-semibold text-foreground">
            {profile.brandName}
          </span>
          's voice and style
        </p>
      </div>

      <ContentIdeasSection ideas={contentIdeas} />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="font-display font-bold">
              Generate Content
            </CardTitle>
            <CardDescription>
              Create platform-specific content based on your brand
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WritingForm
              profile={profile}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary">
          <CardHeader>
            <CardTitle className="font-display font-bold">
              Generated Content
            </CardTitle>
            <CardDescription>
              Your brand-tailored content output
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generatedContent ? (
              <GeneratedContentOutput
                content={generatedContent}
                onChange={setGeneratedContent}
                onRegenerate={handleRegenerate}
                isGenerating={isGenerating}
              />
            ) : (
              <div
                className="flex items-center justify-center h-32 text-muted-foreground text-sm"
                data-ocid="writing.empty_state"
              >
                <p>Your generated content will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
