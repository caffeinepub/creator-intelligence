import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { type CreatorProfile, Platform } from "../backend";

interface WritingFormProps {
  profile: CreatorProfile;
  onGenerate: (data: {
    contentType: string;
    platform: Platform;
    topic: string;
    existingText?: string;
  }) => void;
  isGenerating: boolean;
}

export function WritingForm({
  profile: _profile,
  onGenerate,
  isGenerating,
}: WritingFormProps) {
  const [contentType, setContentType] = useState("caption");
  const [platform, setPlatform] = useState<Platform>(Platform.instagram);
  const [topic, setTopic] = useState("");
  const [existingText, setExistingText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      contentType,
      platform,
      topic,
      existingText: existingText || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="contentType">Content Type</Label>
          <Select value={contentType} onValueChange={setContentType}>
            <SelectTrigger id="contentType">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="caption">Caption</SelectItem>
              <SelectItem value="script">Script</SelectItem>
              <SelectItem value="thread">Thread</SelectItem>
              <SelectItem value="article">Article</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="platform">Platform</Label>
          <Select
            value={platform}
            onValueChange={(value) => setPlatform(value as Platform)}
          >
            <SelectTrigger id="platform">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Platform.instagram}>Instagram</SelectItem>
              <SelectItem value={Platform.tiktok}>TikTok</SelectItem>
              <SelectItem value={Platform.youtube}>YouTube</SelectItem>
              <SelectItem value={Platform.twitter}>Twitter/X</SelectItem>
              <SelectItem value={Platform.newsletter}>Newsletter</SelectItem>
              <SelectItem value={Platform.blog}>Blog</SelectItem>
              <SelectItem value={Platform.podcast}>Podcast</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="topic">Topic *</Label>
        <Input
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="What do you want to write about?"
          required
        />
      </div>

      <div>
        <Label htmlFor="existingText">Existing Text (Optional)</Label>
        <Textarea
          id="existingText"
          value={existingText}
          onChange={(e) => setExistingText(e.target.value)}
          placeholder="Paste any existing content you want to build upon..."
          rows={4}
        />
      </div>

      <Button type="submit" disabled={isGenerating} className="w-full">
        {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Generate Content
      </Button>
    </form>
  );
}
