import type { Content } from "../backend";

interface AnalyticsInsights {
  topThemes: Array<{ label: string; count: number }>;
  toneDistribution: Array<{ label: string; count: number }>;
  platformDistribution: Array<{ label: string; count: number }>;
  recommendations: Array<{
    type: "amplify" | "stop" | "frequency";
    text: string;
  }>;
}

export function analyzeContent(
  content: Content[],
  contentPillars: string[],
): AnalyticsInsights {
  const themes: Record<string, number> = {};
  const tones: Record<string, number> = {};
  const platforms: Record<string, number> = {};

  for (const item of content) {
    platforms[item.platform] = (platforms[item.platform] || 0) + 1;

    try {
      const metadata = JSON.parse(item.metadata);

      if (metadata.themes) {
        for (const theme of metadata.themes as string[]) {
          themes[theme] = (themes[theme] || 0) + 1;
        }
      }

      if (metadata.tone) {
        tones[metadata.tone] = (tones[metadata.tone] || 0) + 1;
      }
    } catch {
      // Skip invalid metadata
    }
  }

  const topThemes = Object.entries(themes)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);

  const toneDistribution = Object.entries(tones)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);

  const platformDistribution = Object.entries(platforms)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);

  const recommendations = generateRecommendations(
    topThemes,
    toneDistribution,
    platformDistribution,
    contentPillars,
    content.length,
  );

  return {
    topThemes,
    toneDistribution,
    platformDistribution,
    recommendations,
  };
}

function generateRecommendations(
  topThemes: Array<{ label: string; count: number }>,
  toneDistribution: Array<{ label: string; count: number }>,
  platformDistribution: Array<{ label: string; count: number }>,
  contentPillars: string[],
  totalContent: number,
): Array<{ type: "amplify" | "stop" | "frequency"; text: string }> {
  const recommendations: Array<{
    type: "amplify" | "stop" | "frequency";
    text: string;
  }> = [];

  if (topThemes.length > 0) {
    const topTheme = topThemes[0];
    recommendations.push({
      type: "amplify",
      text: `Your "${topTheme.label}" content is resonating. Create more in-depth pieces on this topic, exploring different angles and formats.`,
    });
  }

  if (platformDistribution.length > 0) {
    const topPlatform = platformDistribution[0];
    const underutilizedPlatforms = platformDistribution.filter(
      (p) => p.count < topPlatform.count / 2,
    );

    if (underutilizedPlatforms.length > 0) {
      recommendations.push({
        type: "frequency",
        text: `You're posting heavily on ${topPlatform.label}. Consider repurposing that content for ${underutilizedPlatforms[0].label} to expand your reach without creating from scratch.`,
      });
    }
  }

  if (toneDistribution.length > 0) {
    const dominantTone = toneDistribution[0];
    if (dominantTone.count > totalContent * 0.6) {
      recommendations.push({
        type: "amplify",
        text: `Your ${dominantTone.label} tone is consistent, which builds brand recognition. Occasionally mix in contrasting tones to keep your audience engaged and show range.`,
      });
    }
  }

  if (contentPillars.length > 0 && topThemes.length > 0) {
    const coveredPillars = topThemes.map((t) => t.label.toLowerCase());
    const uncoveredPillars = contentPillars.filter(
      (pillar) =>
        !coveredPillars.some((theme) => theme.includes(pillar.toLowerCase())),
    );

    if (uncoveredPillars.length > 0) {
      recommendations.push({
        type: "amplify",
        text: `You've defined "${uncoveredPillars[0]}" as a content pillar but haven't posted much about it. Create 2-3 pieces this month to establish authority in this area.`,
      });
    }
  }

  if (totalContent < 10) {
    recommendations.push({
      type: "frequency",
      text: `With ${totalContent} pieces in your library, focus on consistency. Aim for 3-4 posts per week across your top platforms to build momentum and audience habit.`,
    });
  } else if (totalContent > 50) {
    recommendations.push({
      type: "frequency",
      text: `You have strong content volume (${totalContent} pieces). Now focus on quality over quantity—refine your best-performing themes and retire underperforming topics.`,
    });
  }

  if (recommendations.length < 3) {
    recommendations.push({
      type: "amplify",
      text: "Analyze which content formats (videos, carousels, long-form) get the most engagement, then double down on those formats for your top themes.",
    });
  }

  return recommendations.slice(0, 5);
}
