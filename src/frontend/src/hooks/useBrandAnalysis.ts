import { useEffect, useState } from "react";

interface BrandAnalysisResult {
  contentPillars: string[];
  voiceCharacteristics: string;
  about: string;
}

interface UseBrandAnalysisProps {
  instagramUrl: string;
  tiktokUrl: string;
  youtubeUrl: string;
  twitterUrl: string;
  newsletterUrl: string;
  blogUrl: string;
  podcastUrl: string;
}

export function useBrandAnalysis({
  instagramUrl,
  tiktokUrl,
  youtubeUrl,
  twitterUrl,
  newsletterUrl,
  blogUrl,
  podcastUrl,
}: UseBrandAnalysisProps) {
  const [analysis, setAnalysis] = useState<BrandAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const urls = [
      instagramUrl,
      tiktokUrl,
      youtubeUrl,
      twitterUrl,
      newsletterUrl,
      blogUrl,
      podcastUrl,
    ].filter(Boolean);

    if (urls.length === 0) {
      setAnalysis(null);
      return;
    }

    const timeoutId = setTimeout(() => {
      analyzeBrand(urls);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [
    instagramUrl,
    tiktokUrl,
    youtubeUrl,
    twitterUrl,
    newsletterUrl,
    blogUrl,
    podcastUrl,
  ]);

  const analyzeBrand = async (urls: string[]) => {
    setIsAnalyzing(true);

    try {
      // Simulate brand analysis by extracting information from URLs
      const platforms = urls.map((url) => {
        if (url.includes("instagram")) return "Instagram";
        if (url.includes("tiktok")) return "TikTok";
        if (url.includes("youtube")) return "YouTube";
        if (url.includes("twitter") || url.includes("x.com"))
          return "Twitter/X";
        if (url.includes("newsletter") || url.includes("substack"))
          return "Newsletter";
        if (url.includes("blog") || url.includes("medium")) return "Blog";
        if (
          url.includes("podcast") ||
          url.includes("spotify") ||
          url.includes("apple")
        )
          return "Podcast";
        return "Social Media";
      });

      // Extract username/handle from URLs for brand identity
      const usernames = urls
        .map((url) => {
          const match = url.match(/(?:@|\/)([\w.-]+)(?:\/|$|\?)/);
          return match ? match[1] : null;
        })
        .filter(Boolean);

      const primaryUsername = usernames[0] || "this brand";

      // Generate comprehensive brand analysis
      const pillars: string[] = [];
      let voiceCharacteristics = "";
      let aboutText = "";

      // Determine content pillars based on platform presence
      if (platforms.includes("Instagram") || platforms.includes("TikTok")) {
        pillars.push("Visual Storytelling", "Lifestyle Content");
      }
      if (platforms.includes("YouTube")) {
        pillars.push("Video Content", "Educational Tutorials");
      }
      if (platforms.includes("Twitter/X")) {
        pillars.push("Thought Leadership", "Industry Insights");
      }
      if (platforms.includes("Newsletter") || platforms.includes("Blog")) {
        pillars.push("Long-Form Content", "Deep Dives");
      }
      if (platforms.includes("Podcast")) {
        pillars.push("Audio Content", "Conversations & Interviews");
      }

      // Add general pillars
      pillars.push("Community Engagement", "Behind-the-Scenes");

      // Determine voice characteristics based on platform mix
      const voiceTraits: string[] = [];

      if (platforms.includes("Instagram") || platforms.includes("TikTok")) {
        voiceTraits.push("visually engaging");
      }
      if (platforms.includes("Twitter/X")) {
        voiceTraits.push("concise and impactful");
      }
      if (platforms.includes("YouTube") || platforms.includes("Podcast")) {
        voiceTraits.push("conversational and in-depth");
      }
      if (platforms.includes("Newsletter") || platforms.includes("Blog")) {
        voiceTraits.push("thoughtful and analytical");
      }

      voiceTraits.push("authentic", "audience-focused");
      voiceCharacteristics = voiceTraits.join(", ");

      // Generate About text with brand identity analysis
      const platformList =
        platforms.length > 1
          ? `${platforms.slice(0, -1).join(", ")} and ${platforms[platforms.length - 1]}`
          : platforms[0];

      aboutText = `${primaryUsername} is a multi-platform creator with presence on ${platformList}. `;

      // What the brand is
      if (platforms.length >= 3) {
        aboutText +=
          "This brand represents a comprehensive content ecosystem, building authority and community across multiple channels. ";
      } else if (
        platforms.includes("YouTube") ||
        platforms.includes("Podcast")
      ) {
        aboutText +=
          "This brand focuses on creating in-depth, valuable content that educates and entertains. ";
      } else {
        aboutText +=
          "This brand creates engaging content that connects with audiences through authentic storytelling. ";
      }

      // What the brand does
      if (platforms.includes("Newsletter") || platforms.includes("Blog")) {
        aboutText +=
          "The brand delivers thoughtful analysis and insights through written content, ";
      } else {
        aboutText +=
          "The brand shares experiences and knowledge through dynamic content, ";
      }

      if (platforms.includes("Instagram") || platforms.includes("TikTok")) {
        aboutText +=
          "leveraging visual storytelling to create memorable moments. ";
      } else if (
        platforms.includes("YouTube") ||
        platforms.includes("Podcast")
      ) {
        aboutText +=
          "using long-form media to dive deep into topics that matter. ";
      } else {
        aboutText += "engaging audiences with timely and relevant content. ";
      }

      // Who the brand is (personality)
      aboutText += `The voice is ${voiceCharacteristics}, creating content that resonates with an engaged community seeking authentic perspectives and valuable insights.`;

      setAnalysis({
        contentPillars: [...new Set(pillars)].slice(0, 6),
        voiceCharacteristics,
        about: aboutText,
      });
    } catch (error) {
      console.error("Brand analysis error:", error);
      setAnalysis(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return { analysis, isAnalyzing };
}
