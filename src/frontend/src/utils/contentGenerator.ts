import type { CreatorProfile } from "../backend";
import type { Platform } from "../backend";

interface GenerateContentParams {
  profile: CreatorProfile;
  contentType: string;
  platform: Platform;
  topic: string;
  existingText?: string;
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

export async function generateContent({
  profile,
  contentType,
  platform: _platform,
  topic,
  existingText,
}: GenerateContentParams): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const pronoun = determinePronoun(profile);
  const possessive = pronoun === "I" ? "my" : "our";
  const pillarsText = profile.contentPillars.join(", ");

  let content = "";

  if (contentType === "caption") {
    content = `\uD83C\uDFAF ${topic}\n\n`;
    content += `${pronoun === "I" ? "I'm" : "We're"} diving into ${topic} today, and ${pronoun} want to share what ${pronoun === "I" ? "I've" : "we've"} learned.\n\n`;
    content += `This connects to ${possessive} focus on ${pillarsText}. `;
    content += `${profile.voiceCharacteristics}\n\n`;
    content += `What are ${possessive} thoughts? Drop a comment below! \uD83D\uDC47`;
  } else if (contentType === "script") {
    content = `[INTRO]\nHey everyone! Today ${pronoun === "I" ? "I'm" : "we're"} talking about ${topic}.\n\n`;
    content += `[MAIN CONTENT]\n${pronoun === "I" ? "I've" : "We've"} been exploring this topic because it relates to ${pillarsText}. `;
    content += `Here's what ${pronoun} discovered...\n\n`;
    content += `[CALL TO ACTION]\nIf you found this valuable, ${pronoun === "I" ? "I'd" : "we'd"} love to hear ${possessive} thoughts in the comments!`;
  } else if (contentType === "thread") {
    content = `1/ Let's talk about ${topic} \uD83E\uDDF5\n\n`;
    content += `2/ ${pronoun === "I" ? "I've" : "We've"} been thinking about this a lot lately, especially as it relates to ${pillarsText}.\n\n`;
    content += `3/ Here's ${possessive} take: [Your insights here]\n\n`;
    content += "4/ The key takeaway? [Main point]\n\n";
    content += `5/ What do you think? ${pronoun === "I" ? "I'd" : "We'd"} love to hear ${possessive} perspective!`;
  } else {
    content = `${topic}\n\n`;
    content += `${pronoun === "I" ? "I'm" : "We're"} excited to share ${possessive} thoughts on this topic. `;
    content += `This aligns with ${possessive} content pillars: ${pillarsText}.\n\n`;
    content += "[Your main content here]\n\n";
    content += `${profile.voiceCharacteristics}`;
  }

  if (existingText) {
    content = `${content}\n\n---\nBuilding on: ${existingText}`;
  }

  return content;
}
