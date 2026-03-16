import type { Content } from "../backend";

export interface ContentIdea {
  title: string;
  description: string;
  reasoning: string;
  type: "library" | "trending";
}

export function generateContentIdeas(
  content: Content[],
  contentPillars: string[],
): ContentIdea[] {
  const ideas: ContentIdea[] = [];

  // Generate library-based ideas
  if (content.length > 0) {
    const themes = extractThemes(content);
    const topThemes = themes.slice(0, 3);

    for (const theme of topThemes) {
      ideas.push({
        title: `Deep dive: ${theme}`,
        description: `Create an in-depth piece exploring ${theme} from a fresh angle`,
        reasoning: `You've touched on ${theme} multiple times - your audience wants more depth here`,
        type: "library",
      });
    }

    // Find content gaps
    const platforms = [...new Set(content.map((c) => c.platform))];
    if (platforms.length > 1) {
      ideas.push({
        title: "Cross-platform content series",
        description:
          "Repurpose your best-performing content across all your platforms",
        reasoning:
          "You have content on multiple platforms - maximize reach by adapting your hits",
        type: "library",
      });
    }
  }

  // Generate trending ideas based on pillars
  if (contentPillars.length > 0) {
    for (const pillar of contentPillars) {
      ideas.push({
        title: `${pillar}: Current trends`,
        description: `Share your take on what's happening in ${pillar} right now`,
        reasoning:
          "This aligns with your content pillar and keeps you relevant",
        type: "trending",
      });
    }

    ideas.push({
      title: "Behind-the-scenes: Your process",
      description: `Show how you create content around ${contentPillars[0]}`,
      reasoning:
        "Audiences love transparency - this builds trust and authority",
      type: "trending",
    });
  }

  // Add evergreen trending ideas
  ideas.push({
    title: "Myth-busting in your niche",
    description: "Challenge common misconceptions in your field",
    reasoning:
      "Contrarian content drives engagement and positions you as a thought leader",
    type: "trending",
  });

  ideas.push({
    title: "Your biggest lesson this year",
    description: "Share a transformative insight from your recent experience",
    reasoning: "Personal stories resonate deeply and showcase your growth",
    type: "trending",
  });

  return ideas.slice(0, 6);
}

function extractThemes(content: Content[]): string[] {
  const themeMap = new Map<string, number>();

  for (const item of content) {
    try {
      const metadata = JSON.parse(item.metadata);
      if (metadata.themes && Array.isArray(metadata.themes)) {
        for (const theme of metadata.themes as string[]) {
          themeMap.set(theme, (themeMap.get(theme) || 0) + 1);
        }
      }
    } catch {
      // Skip invalid metadata
    }
  }

  return Array.from(themeMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([theme]) => theme);
}
