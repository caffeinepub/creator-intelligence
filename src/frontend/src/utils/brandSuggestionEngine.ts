import type { Content } from "../backend";

interface ProductIdea {
  title: string;
  description: string;
  rationale: string;
}

export function generateProductIdeas(
  content: Content[],
  contentPillars: string[],
  _voiceCharacteristics: string,
): ProductIdea[] {
  if (content.length === 0) {
    return [];
  }

  const themes: Record<string, number> = {};

  for (const item of content) {
    try {
      const metadata = JSON.parse(item.metadata);
      if (metadata.themes) {
        for (const theme of metadata.themes as string[]) {
          themes[theme] = (themes[theme] || 0) + 1;
        }
      }
    } catch {
      // Skip invalid metadata
    }
  }

  const topThemes = Object.entries(themes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([theme]) => theme);

  const ideas: ProductIdea[] = [];

  if (topThemes.length > 0) {
    ideas.push({
      title: `${topThemes[0]} Masterclass`,
      description: `A comprehensive digital course teaching your proven framework for ${topThemes[0].toLowerCase()}. Include video lessons, worksheets, and community access.`,
      rationale: `Your content shows deep expertise in ${topThemes[0]}. Your audience is already engaging with this topic—they'll pay for structured, actionable guidance.`,
    });
  }

  if (contentPillars.length > 0) {
    ideas.push({
      title: `${contentPillars[0]} Strategy Sessions`,
      description: `1-on-1 or group consulting focused on ${contentPillars[0].toLowerCase()}. Offer 60-minute deep-dive sessions with personalized recommendations.`,
      rationale: `You've established authority in ${contentPillars[0]}. People who follow your content will pay for direct access to your strategic thinking.`,
    });
  }

  if (content.length > 20) {
    ideas.push({
      title: "Creator Inner Circle",
      description:
        "A private community for serious creators. Monthly workshops, content reviews, networking, and direct access to you. Priced at $50-150/month.",
      rationale: `With ${content.length}+ pieces of content, you've built trust and demonstrated consistency. Your engaged followers want deeper connection and accountability.`,
    });
  }

  if (topThemes.length > 1) {
    ideas.push({
      title: `${topThemes[0]} × ${topThemes[1]} Workshop Series`,
      description: `Partner with complementary creators to co-host workshops at the intersection of ${topThemes[0]} and ${topThemes[1]}. Split revenue and cross-promote audiences.`,
      rationale:
        "Your content bridges multiple domains. Collaborations let you tap into adjacent audiences while providing unique value neither of you could deliver alone.",
    });
  }

  return ideas.slice(0, 3);
}
