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
import { refineContentPillars } from "../utils/contentPillarRefinement";
import ColorPicker from "./ColorPicker";
import ContentPillarsInput from "./ContentPillarsInput";

interface ProfileFormProps {
  onSubmit: (data: {
    brandName: string;
    instagramUrl: string;
    tiktokUrl: string;
    youtubeUrl: string;
    twitterUrl: string;
    newsletterUrl: string;
    blogUrl: string;
    podcastUrl: string;
    facebookUrl: string;
    facebookContentType: string;
    brandColors: string[];
    voiceCharacteristics: string;
    contentPillars: string[];
    about: string;
  }) => void;
  initialData?: {
    brandName: string;
    instagramUrl?: string;
    tiktokUrl?: string;
    youtubeUrl?: string;
    twitterUrl?: string;
    newsletterUrl?: string;
    blogUrl?: string;
    podcastUrl?: string;
    facebookUrl?: string;
    facebookContentType?: string;
    brandColors: string[];
    voiceCharacteristics: string;
    contentPillars: string[];
    about: string;
  };
  isLoading?: boolean;
}

export function ProfileForm({
  onSubmit,
  initialData,
  isLoading,
}: ProfileFormProps) {
  const [brandName, setBrandName] = useState(initialData?.brandName || "");
  const [instagramUrl, setInstagramUrl] = useState(
    initialData?.instagramUrl || "",
  );
  const [tiktokUrl, setTiktokUrl] = useState(initialData?.tiktokUrl || "");
  const [youtubeUrl, setYoutubeUrl] = useState(initialData?.youtubeUrl || "");
  const [twitterUrl, setTwitterUrl] = useState(initialData?.twitterUrl || "");
  const [newsletterUrl, setNewsletterUrl] = useState(
    initialData?.newsletterUrl || "",
  );
  const [blogUrl, setBlogUrl] = useState(initialData?.blogUrl || "");
  const [podcastUrl, setPodcastUrl] = useState(initialData?.podcastUrl || "");
  const [facebookUrl, setFacebookUrl] = useState(
    initialData?.facebookUrl || "",
  );
  const [facebookContentType, setFacebookContentType] = useState(
    initialData?.facebookContentType || "",
  );
  const [brandColors, setBrandColors] = useState<string[]>(
    initialData?.brandColors || [],
  );
  const [voiceCharacteristics, setVoiceCharacteristics] = useState(
    initialData?.voiceCharacteristics || "",
  );
  const [contentPillars, setContentPillars] = useState<string[]>(
    initialData?.contentPillars || [],
  );
  const [about, setAbout] = useState(initialData?.about || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Refine content pillars based on About text if About is provided
    let finalPillars = contentPillars;
    if (about.trim()) {
      const refinedPillars = refineContentPillars(about);
      if (refinedPillars.length > 0) {
        finalPillars = refinedPillars;
        setContentPillars(refinedPillars);
      }
    }

    onSubmit({
      brandName,
      instagramUrl,
      tiktokUrl,
      youtubeUrl,
      twitterUrl,
      newsletterUrl,
      blogUrl,
      podcastUrl,
      facebookUrl,
      facebookContentType,
      brandColors,
      voiceCharacteristics,
      contentPillars: finalPillars,
      about,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="brandName">Brand Name *</Label>
          <Input
            id="brandName"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Your brand name"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="instagramUrl">Instagram URL</Label>
            <Input
              id="instagramUrl"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              placeholder="https://instagram.com/username"
              type="url"
            />
          </div>

          {/* Facebook — dedicated card matching Instagram's layout */}
          <div className="space-y-2 p-3 rounded-lg border border-border bg-muted/30">
            <Label
              htmlFor="facebookUrl"
              className="font-display font-semibold text-sm"
            >
              Facebook
            </Label>
            <Input
              id="facebookUrl"
              value={facebookUrl}
              onChange={(e) => setFacebookUrl(e.target.value)}
              placeholder="https://facebook.com/username"
              type="url"
              data-ocid="profile.facebook_url.input"
            />
            <Select
              value={facebookContentType}
              onValueChange={setFacebookContentType}
            >
              <SelectTrigger
                id="facebookContentType"
                data-ocid="profile.facebook_content_type.select"
              >
                <SelectValue placeholder="Content type…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal_profile">
                  Personal Profile
                </SelectItem>
                <SelectItem value="business_page">Business Page</SelectItem>
                <SelectItem value="creator_page">Creator Page</SelectItem>
                <SelectItem value="group">Group</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="tiktokUrl">TikTok URL</Label>
            <Input
              id="tiktokUrl"
              value={tiktokUrl}
              onChange={(e) => setTiktokUrl(e.target.value)}
              placeholder="https://tiktok.com/@username"
              type="url"
            />
          </div>

          <div>
            <Label htmlFor="youtubeUrl">YouTube URL</Label>
            <Input
              id="youtubeUrl"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://youtube.com/@username"
              type="url"
            />
          </div>

          <div>
            <Label htmlFor="twitterUrl">Twitter/X URL</Label>
            <Input
              id="twitterUrl"
              value={twitterUrl}
              onChange={(e) => setTwitterUrl(e.target.value)}
              placeholder="https://twitter.com/username"
              type="url"
            />
          </div>

          <div>
            <Label htmlFor="newsletterUrl">Newsletter URL</Label>
            <Input
              id="newsletterUrl"
              value={newsletterUrl}
              onChange={(e) => setNewsletterUrl(e.target.value)}
              placeholder="https://newsletter.com/username"
              type="url"
            />
          </div>

          <div>
            <Label htmlFor="blogUrl">Blog URL</Label>
            <Input
              id="blogUrl"
              value={blogUrl}
              onChange={(e) => setBlogUrl(e.target.value)}
              placeholder="https://yourblog.com"
              type="url"
            />
          </div>

          <div>
            <Label htmlFor="podcastUrl">Podcast URL</Label>
            <Input
              id="podcastUrl"
              value={podcastUrl}
              onChange={(e) => setPodcastUrl(e.target.value)}
              placeholder="https://podcast.com/show"
              type="url"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="about">About Your Brand</Label>
          <Textarea
            id="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Describe your brand, what you do, who you serve, and what makes you unique. This helps us generate content that truly represents your brand identity."
            rows={6}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Add your information, then use the Analyze Brand button on the
            profile to generate full brand insights.
          </p>
        </div>

        <div>
          <Label>Brand Colors</Label>
          <ColorPicker colors={brandColors} onChange={setBrandColors} />
        </div>

        <div>
          <Label htmlFor="voiceCharacteristics">Voice Characteristics</Label>
          <Textarea
            id="voiceCharacteristics"
            value={voiceCharacteristics}
            onChange={(e) => setVoiceCharacteristics(e.target.value)}
            placeholder="e.g., Professional yet approachable, witty, educational, inspiring"
            rows={3}
          />
        </div>

        <div>
          <Label>Content Pillars</Label>
          <ContentPillarsInput
            pillars={contentPillars}
            onChange={setContentPillars}
          />
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {initialData ? "Update Profile" : "Create Profile"}
      </Button>
    </form>
  );
}
