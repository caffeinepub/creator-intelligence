import { useState } from "react";
import type { CreatorProfile } from "../backend";
import type {
  ActionableRecommendation,
  CoreContentData,
  LinkAnalysisResult,
  ProfileAlignment,
  SourceType,
  StrategicInterpretation,
} from "../types/linkAnalysis";

// This hook orchestrates the 6-step link analysis workflow
export function useLinkAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LinkAnalysisResult | null>(null);

  const analyzeLink = async (
    url: string,
    profile: CreatorProfile | undefined,
  ) => {
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      // Simulate analysis process (in a real implementation, this would call AI services)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // STEP 1: Identify Source Type
      const sourceType = classifySourceType(url);

      // STEP 2: Extract Core Content Data
      const coreContentData = extractCoreContent(url, sourceType);

      // STEP 3: Profile Alignment Analysis
      const profileAlignment = analyzeProfileAlignment(
        coreContentData,
        profile,
      );

      // STEP 4: Strategic Interpretation
      const strategicInterpretation = generateStrategicInterpretation(
        coreContentData,
        profileAlignment,
        profile,
      );

      // STEP 5: Actionable Recommendations
      const actionableRecommendations = generateRecommendations(
        coreContentData,
        profileAlignment,
        strategicInterpretation,
        profile,
      );

      // STEP 6: Memory Creation
      const profileInsight = generateProfileInsight(
        coreContentData,
        profileAlignment,
        strategicInterpretation,
        url,
      );

      const analysisResult: LinkAnalysisResult = {
        sourceType,
        coreContentData,
        profileAlignment,
        strategicInterpretation,
        actionableRecommendations,
        profileInsight,
      };

      setResult(analysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    analyzeLink,
    isAnalyzing,
    error,
    result,
    clearResult: () => setResult(null),
  };
}

// Helper functions for each step

function classifySourceType(url: string): SourceType {
  const urlLower = url.toLowerCase();

  if (
    urlLower.includes("instagram.com/p/") ||
    (urlLower.includes("tiktok.com/@") && urlLower.includes("/video/"))
  ) {
    return "socialMediaPost" as SourceType;
  }
  if (
    urlLower.includes("instagram.com/") ||
    urlLower.includes("tiktok.com/@") ||
    urlLower.includes("youtube.com/@")
  ) {
    return "socialMediaProfile" as SourceType;
  }
  if (
    urlLower.includes("youtube.com/watch") ||
    urlLower.includes("youtu.be/")
  ) {
    return "videoOrReel" as SourceType;
  }
  if (
    urlLower.includes("medium.com") ||
    urlLower.includes("substack.com") ||
    urlLower.includes("/blog/")
  ) {
    return "article" as SourceType;
  }

  return "unknown" as SourceType;
}

function extractCoreContent(
  url: string,
  _sourceType: SourceType,
): CoreContentData {
  // In a real implementation, this would scrape or analyze the URL
  // For now, we'll generate placeholder data based on the URL pattern

  const isInstagram = url.includes("instagram.com");
  const isTikTok = url.includes("tiktok.com");
  const isYouTube = url.includes("youtube.com");

  return {
    topic: isInstagram
      ? "Visual storytelling and lifestyle content"
      : isTikTok
        ? "Short-form video trends and entertainment"
        : isYouTube
          ? "Long-form educational or entertainment content"
          : "General content topic",
    message: "Core message extracted from the content",
    audience: isInstagram
      ? "Visual-first audience, 25-40 demographic"
      : isTikTok
        ? "Gen Z and younger millennials"
        : "General audience",
    tone: "Authentic, engaging, and conversational",
    visualSignals: isInstagram
      ? "High-quality imagery, cohesive aesthetic"
      : isTikTok
        ? "Dynamic editing, trending sounds"
        : "Professional presentation",
    valueProposition: "Provides entertainment, education, or inspiration",
    callToAction: "Follow for more, engage in comments, share with friends",
    engagementIndicators:
      "Strong engagement visible through likes and comments",
  };
}

function analyzeProfileAlignment(
  content: CoreContentData,
  profile: CreatorProfile | undefined,
): ProfileAlignment {
  if (!profile) {
    return {
      brandVoiceAlignment: "Unable to assess - no profile data available",
      audienceAlignment: "Unable to assess - no profile data available",
      goalsAlignment: "Unable to assess - no profile data available",
      consistencyWithPastContent:
        "Unable to assess - no profile data available",
      differentiationOpportunities:
        "Create a profile to enable alignment analysis",
    };
  }

  const voiceMatch = profile.voiceCharacteristics
    .toLowerCase()
    .includes(content.tone.toLowerCase());
  const pillarMatch = profile.contentPillars.some((pillar) =>
    content.topic.toLowerCase().includes(pillar.toLowerCase()),
  );

  return {
    brandVoiceAlignment: voiceMatch
      ? `Strong alignment with your ${profile.voiceCharacteristics} voice`
      : `Differs from your typical ${profile.voiceCharacteristics} approach - could be an opportunity to expand`,
    audienceAlignment: `Content targets ${content.audience}, which ${pillarMatch ? "aligns well" : "partially aligns"} with your focus on ${profile.contentPillars.slice(0, 2).join(" and ")}`,
    goalsAlignment: pillarMatch
      ? "Directly supports your content pillars"
      : "Tangentially related to your core themes",
    consistencyWithPastContent:
      "Maintains consistency with established patterns",
    differentiationOpportunities: pillarMatch
      ? "Consider adding your unique perspective or expertise to stand out"
      : "This topic could help you reach new audience segments",
  };
}

function generateStrategicInterpretation(
  content: CoreContentData,
  alignment: ProfileAlignment,
  profile: CreatorProfile | undefined,
): StrategicInterpretation {
  return {
    why: alignment.brandVoiceAlignment.includes("Strong")
      ? "This content works because it authentically reflects your established voice while delivering clear value"
      : "This content presents an opportunity to test new approaches while maintaining your core identity",
    audienceInsight: `Your audience responds to ${content.tone} content that addresses ${content.topic}. This suggests they value authenticity and practical insights.`,
    trendPattern: `The ${content.visualSignals} approach is gaining traction. Consider how this fits into your broader content strategy.`,
    positioningEffect: profile
      ? `This positions ${profile.brandName} as ${content.valueProposition.toLowerCase()}, reinforcing your authority in ${profile.contentPillars[0] || "your niche"}`
      : "This content helps establish authority and credibility in your space",
  };
}

function generateRecommendations(
  content: CoreContentData,
  alignment: ProfileAlignment,
  _interpretation: StrategicInterpretation,
  profile: CreatorProfile | undefined,
): ActionableRecommendation[] {
  const recommendations: ActionableRecommendation[] = [];

  // Recommendation 1: Content idea
  recommendations.push({
    type: "contentIdea",
    description: `Create a follow-up piece exploring "${content.topic}" from your unique angle. Focus on ${content.valueProposition.toLowerCase()} while incorporating your signature ${profile?.voiceCharacteristics || "voice"}.`,
  });

  // Recommendation 2: Messaging or positioning
  if (alignment.brandVoiceAlignment.includes("Strong")) {
    recommendations.push({
      type: "messagingAdjustment",
      description: `Double down on the ${content.tone} tone in your next 3-5 posts. Your audience clearly resonates with this approach.`,
    });
  } else {
    recommendations.push({
      type: "positioningOpportunity",
      description: `Test this ${content.tone} approach in a single post to see if it expands your reach while maintaining authenticity.`,
    });
  }

  // Recommendation 3: Strategy improvement
  recommendations.push({
    type: "strategyImprovement",
    description:
      "Analyze engagement patterns on similar content. If performance is strong, allocate 30% of your content calendar to this theme for the next month.",
  });

  return recommendations;
}

function generateProfileInsight(
  content: CoreContentData,
  alignment: ProfileAlignment,
  interpretation: StrategicInterpretation,
  _sourceUrl: string,
): {
  insightText: string;
  category:
    | "audiencePreference"
    | "messagingPattern"
    | "contentPerformance"
    | "brandVoiceSignal"
    | "strategicLearning";
} {
  // Determine the most relevant category based on the analysis
  let category:
    | "audiencePreference"
    | "messagingPattern"
    | "contentPerformance"
    | "brandVoiceSignal"
    | "strategicLearning";
  let insightText: string;

  if (alignment.brandVoiceAlignment.includes("Strong")) {
    category = "brandVoiceSignal";
    insightText = `${content.tone} tone with ${content.visualSignals} resonates strongly with brand voice. Continue this approach for consistency.`;
  } else if (content.engagementIndicators.includes("Strong")) {
    category = "contentPerformance";
    insightText = `Content focused on "${content.topic}" with ${content.callToAction} drives strong engagement. Prioritize similar themes.`;
  } else if (interpretation.audienceInsight.includes("responds to")) {
    category = "audiencePreference";
    insightText = `Audience shows preference for ${content.tone} content addressing ${content.topic}. Incorporate more of this in content strategy.`;
  } else {
    category = "strategicLearning";
    insightText = `${content.valueProposition} approach with ${content.visualSignals} offers differentiation opportunity. Test and measure impact.`;
  }

  return { insightText, category };
}
