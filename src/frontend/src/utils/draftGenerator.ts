import type { CreatorProfile } from "../backend";

type DraftType = "bio" | "pitch" | "mediaKit";

interface GenerateDraftParams {
  profile: CreatorProfile;
  draftType: DraftType;
}

function determinePronoun(profile: CreatorProfile): "I" | "we" {
  const brandName = profile.brandName.toLowerCase();
  const about = profile.about.toLowerCase();

  const companyIndicators = [
    "studios",
    "studio",
    "agency",
    "agencies",
    "team",
    "teams",
    "co.",
    "company",
    "companies",
    "group",
    "collective",
    "partners",
    "labs",
    "media",
    "productions",
  ];

  const hasCompanyIndicator = companyIndicators.some((indicator) =>
    brandName.includes(indicator),
  );

  const teamLanguage = [
    "we are",
    "our team",
    "our mission",
    "we help",
    "we believe",
    "we create",
    "we work",
    "our company",
    "our organization",
  ];

  const hasTeamLanguage = teamLanguage.some((phrase) => about.includes(phrase));

  const voiceHasTeam =
    profile.voiceCharacteristics.toLowerCase().includes("we") ||
    profile.voiceCharacteristics.toLowerCase().includes("team") ||
    profile.voiceCharacteristics.toLowerCase().includes("collaborative");

  if (hasCompanyIndicator || hasTeamLanguage || voiceHasTeam) {
    return "we";
  }

  return "I";
}

export async function generateDraft({
  profile,
  draftType,
}: GenerateDraftParams): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const pronoun = determinePronoun(profile);
  const possessive = pronoun === "I" ? "my" : "our";

  const pillarsText = profile.contentPillars.slice(0, 3).join(", ");

  if (draftType === "bio") {
    let bio = `${profile.brandName} | `;

    if (profile.about) {
      const aboutSummary = profile.about.split(".")[0];
      bio += `${aboutSummary}.\n\n`;
    } else {
      bio += `Creator focused on ${pillarsText}\n\n`;
    }

    bio += `${pronoun === "I" ? "I" : "We"} create content that is ${profile.voiceCharacteristics}. `;
    bio += `${possessive.charAt(0).toUpperCase() + possessive.slice(1)} focus areas include ${pillarsText}.\n\n`;

    const platforms: string[] = [];
    if (profile.instagramUrl) platforms.push("Instagram");
    if (profile.tiktokUrl) platforms.push("TikTok");
    if (profile.youtubeUrl) platforms.push("YouTube");
    if (profile.twitterUrl) platforms.push("Twitter/X");

    if (platforms.length > 0) {
      bio += `Find ${pronoun === "I" ? "me" : "us"} on: ${platforms.join(", ")}`;
    }

    return bio;
  }

  if (draftType === "pitch") {
    let pitch = `Subject: Partnership Opportunity with ${profile.brandName}\n\n`;
    pitch += "Hi [Name],\n\n";
    pitch += `${pronoun === "I" ? "I'm" : "We're"} reaching out because ${pronoun} believe there's a great opportunity for ${pronoun === "I" ? "us" : "our brands"} to collaborate.\n\n`;

    if (profile.about) {
      pitch += `About ${pronoun === "I" ? "me" : "us"}: ${profile.about}\n\n`;
    }

    pitch += `${possessive.charAt(0).toUpperCase() + possessive.slice(1)} content focuses on ${pillarsText}, `;
    pitch += `and ${pronoun} create content that is ${profile.voiceCharacteristics}.\n\n`;

    pitch += `${pronoun === "I" ? "I'd" : "We'd"} love to discuss how ${pronoun === "I" ? "I" : "we"} can work together to create value for both ${possessive} audiences.\n\n`;
    pitch += "Looking forward to connecting!\n\n";
    pitch += `Best,\n${profile.brandName}`;

    return pitch;
  }

  if (draftType === "mediaKit") {
    let mediaKit = `${profile.brandName} - Media Kit\n\n`;
    mediaKit += "=== ABOUT ===\n";

    if (profile.about) {
      mediaKit += `${profile.about}\n\n`;
    } else {
      mediaKit += `${profile.brandName} is a creator focused on ${pillarsText}. `;
      mediaKit += `${pronoun === "I" ? "I" : "We"} create content that is ${profile.voiceCharacteristics}.\n\n`;
    }

    mediaKit += "=== CONTENT PILLARS ===\n";
    profile.contentPillars.forEach((pillar, index) => {
      mediaKit += `${index + 1}. ${pillar}\n`;
    });

    mediaKit += "\n=== BRAND VOICE ===\n";
    mediaKit += `${profile.voiceCharacteristics}\n\n`;

    mediaKit += "=== PLATFORMS ===\n";
    if (profile.instagramUrl)
      mediaKit += `Instagram: ${profile.instagramUrl}\n`;
    if (profile.tiktokUrl) mediaKit += `TikTok: ${profile.tiktokUrl}\n`;
    if (profile.youtubeUrl) mediaKit += `YouTube: ${profile.youtubeUrl}\n`;
    if (profile.twitterUrl) mediaKit += `Twitter/X: ${profile.twitterUrl}\n`;
    if (profile.newsletterUrl)
      mediaKit += `Newsletter: ${profile.newsletterUrl}\n`;
    if (profile.blogUrl) mediaKit += `Blog: ${profile.blogUrl}\n`;
    if (profile.podcastUrl) mediaKit += `Podcast: ${profile.podcastUrl}\n`;

    if (profile.brandColors.length > 0) {
      mediaKit += "\n=== BRAND COLORS ===\n";
      profile.brandColors.forEach((color, index) => {
        mediaKit += `${index + 1}. ${color}\n`;
      });
    }

    mediaKit += "\n=== COLLABORATION ===\n";
    mediaKit += `${pronoun === "I" ? "I'm" : "We're"} open to brand partnerships, sponsored content, and collaborations that align with ${possessive} values and content pillars.\n\n`;
    mediaKit += "Contact: [Your email]\n";

    return mediaKit;
  }

  return "";
}
