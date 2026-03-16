import type { CreatorProfile } from "../backend";
import { refineContentPillars } from "./contentPillarRefinement";

export interface BrandAnalysisResult {
  brandIdentity: string;
  contentPillars: string[];
  voiceCharacteristics: string;
}

function detectPronoun(profile: CreatorProfile): "we" | "I" {
  const text = (profile.about || "").toLowerCase();
  if (/\b(team|we|our|us|studio|agency|collective|crew)\b/.test(text)) {
    return "we";
  }
  return "I";
}

function getPlatforms(profile: CreatorProfile): string[] {
  const platforms: string[] = [];
  if (profile.instagramUrl) platforms.push("Instagram");
  if (profile.tiktokUrl) platforms.push("TikTok");
  if (profile.youtubeUrl) platforms.push("YouTube");
  if (profile.twitterUrl) platforms.push("Twitter/X");
  if (profile.newsletterUrl) platforms.push("Newsletter");
  if (profile.blogUrl) platforms.push("Blog/Website");
  if (profile.podcastUrl) platforms.push("Podcast");
  return platforms;
}

function buildBrandIdentity(
  profile: CreatorProfile,
  pillars: string[],
  platforms: string[],
): string {
  const pronoun = detectPronoun(profile);
  const platformList =
    platforms.length > 1
      ? `${platforms.slice(0, -1).join(", ")} and ${platforms[platforms.length - 1]}`
      : platforms[0] || "multiple platforms";

  let identity = `${profile.brandName} is a `;

  if (platforms.length >= 4) {
    identity += "multi-platform content brand";
  } else if (platforms.includes("YouTube") || platforms.includes("Podcast")) {
    identity += "long-form content creator";
  } else if (platforms.includes("Instagram") || platforms.includes("TikTok")) {
    identity += "visual content creator";
  } else {
    identity += "content brand";
  }

  identity += ` active on ${platformList}. `;

  if (profile.about && profile.about.trim().length > 20) {
    const firstSentence = profile.about.split(/[.!?]/)[0].trim();
    if (firstSentence.length > 10) {
      identity += `${firstSentence}. `;
    }
  }

  if (pillars.length > 0) {
    identity += `${pronoun === "we" ? "The brand focuses" : "The creator focuses"} on ${pillars.slice(0, 3).join(", ")}, building an audience that values authentic and actionable content.`;
  }

  return identity;
}

function buildVoiceCharacteristics(
  profile: CreatorProfile,
  platforms: string[],
): string {
  if (
    profile.voiceCharacteristics &&
    profile.voiceCharacteristics.trim().length > 10
  ) {
    return profile.voiceCharacteristics;
  }

  const traits: string[] = [];
  const text = (profile.about || "").toLowerCase();

  if (/educate|teach|learn|guide|tutorial|how.to|tips/i.test(text))
    traits.push("educational");
  if (/inspire|motivat|empower|transform/i.test(text))
    traits.push("inspirational");
  if (/professional|expert|authority|specialist/i.test(text))
    traits.push("authoritative");
  if (/fun|humor|laugh|entertain|playful/i.test(text))
    traits.push("entertaining");
  if (/authentic|real|honest|genuine/i.test(text)) traits.push("authentic");
  if (/community|together|connect|belong/i.test(text))
    traits.push("community-driven");

  if (platforms.includes("Instagram") || platforms.includes("TikTok"))
    traits.push("visually engaging");
  if (platforms.includes("Twitter/X")) traits.push("concise and direct");
  if (platforms.includes("YouTube") || platforms.includes("Podcast"))
    traits.push("conversational and in-depth");
  if (platforms.includes("Newsletter") || platforms.includes("Blog/Website"))
    traits.push("thoughtful and analytical");

  if (traits.length === 0)
    traits.push("authentic", "audience-focused", "engaging");

  return traits.join(", ");
}

export async function analyzeBrand(
  profile: CreatorProfile,
  profileIndex: number,
): Promise<BrandAnalysisResult> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const platforms = getPlatforms(profile);

  const extractedPillars = refineContentPillars(profile.about || "");
  const existingPillars = profile.contentPillars || [];
  const allPillars = [
    ...new Set([...existingPillars, ...extractedPillars]),
  ].slice(0, 7);

  const brandIdentity = buildBrandIdentity(profile, allPillars, platforms);
  const voiceCharacteristics = buildVoiceCharacteristics(profile, platforms);

  const result: BrandAnalysisResult = {
    brandIdentity,
    contentPillars: allPillars,
    voiceCharacteristics,
  };

  try {
    localStorage.setItem(
      `brandAnalysis_${profileIndex}`,
      JSON.stringify(result),
    );
  } catch {
    // ignore
  }

  return result;
}

export function loadCachedAnalysis(
  profileIndex: number,
): BrandAnalysisResult | null {
  try {
    const cached = localStorage.getItem(`brandAnalysis_${profileIndex}`);
    if (cached) return JSON.parse(cached) as BrandAnalysisResult;
  } catch {
    // ignore
  }
  return null;
}

export function clearCachedAnalysis(profileIndex: number): void {
  try {
    localStorage.removeItem(`brandAnalysis_${profileIndex}`);
  } catch {
    // ignore
  }
}
