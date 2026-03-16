/**
 * Analyzes About text to extract refined content pillar topics
 * based on key themes, topics, and brand focus areas
 */
export function refineContentPillars(aboutText: string): string[] {
  if (!aboutText || aboutText.trim().length === 0) {
    return [];
  }

  const text = aboutText.toLowerCase();
  const pillars: string[] = [];

  // Industry/domain keywords mapping
  const domainKeywords = {
    "Technology & Innovation": [
      "tech",
      "technology",
      "software",
      "ai",
      "artificial intelligence",
      "innovation",
      "digital",
      "coding",
      "programming",
    ],
    "Business & Entrepreneurship": [
      "business",
      "entrepreneur",
      "startup",
      "leadership",
      "strategy",
      "growth",
      "marketing",
      "sales",
    ],
    "Health & Wellness": [
      "health",
      "wellness",
      "fitness",
      "nutrition",
      "mental health",
      "mindfulness",
      "yoga",
      "exercise",
    ],
    "Education & Learning": [
      "education",
      "learning",
      "teaching",
      "training",
      "courses",
      "knowledge",
      "skills",
      "development",
    ],
    "Creative & Design": [
      "design",
      "creative",
      "art",
      "photography",
      "video",
      "content creation",
      "branding",
      "visual",
    ],
    "Finance & Investment": [
      "finance",
      "investment",
      "money",
      "wealth",
      "trading",
      "crypto",
      "stocks",
      "financial",
    ],
    "Lifestyle & Personal Development": [
      "lifestyle",
      "personal development",
      "self-improvement",
      "productivity",
      "habits",
      "motivation",
    ],
    "Food & Cooking": [
      "food",
      "cooking",
      "recipes",
      "culinary",
      "chef",
      "baking",
      "cuisine",
    ],
    "Travel & Adventure": [
      "travel",
      "adventure",
      "explore",
      "destinations",
      "tourism",
      "wanderlust",
    ],
    "Fashion & Beauty": [
      "fashion",
      "beauty",
      "style",
      "makeup",
      "skincare",
      "trends",
      "clothing",
    ],
    "Sustainability & Environment": [
      "sustainability",
      "environment",
      "eco",
      "green",
      "climate",
      "conservation",
      "renewable",
    ],
    "Community & Social Impact": [
      "community",
      "social impact",
      "nonprofit",
      "charity",
      "volunteering",
      "advocacy",
      "change",
    ],
  };

  // Content type keywords
  const contentTypes = {
    "Educational Content": [
      "teach",
      "educate",
      "explain",
      "guide",
      "tutorial",
      "how-to",
      "tips",
      "advice",
    ],
    "Inspirational Stories": [
      "inspire",
      "motivate",
      "story",
      "journey",
      "transformation",
      "success",
    ],
    "Behind-the-Scenes": [
      "behind the scenes",
      "process",
      "workflow",
      "day in the life",
      "routine",
    ],
    "Product Reviews": [
      "review",
      "product",
      "recommendation",
      "comparison",
      "testing",
    ],
    "Industry Insights": [
      "insights",
      "trends",
      "analysis",
      "research",
      "data",
      "statistics",
    ],
    "Personal Experiences": [
      "experience",
      "personal",
      "my story",
      "lessons learned",
      "mistakes",
    ],
  };

  // Audience focus keywords
  const audienceKeywords = {
    "Beginner-Friendly": [
      "beginner",
      "starter",
      "basics",
      "fundamentals",
      "introduction",
      "getting started",
    ],
    "Advanced Strategies": [
      "advanced",
      "expert",
      "professional",
      "mastery",
      "deep dive",
    ],
    "For Professionals": [
      "professional",
      "career",
      "workplace",
      "corporate",
      "industry",
    ],
    "For Creators": [
      "creator",
      "content creator",
      "influencer",
      "artist",
      "maker",
    ],
  };

  // Check domain keywords
  for (const [pillar, keywords] of Object.entries(domainKeywords)) {
    if (keywords.some((keyword) => text.includes(keyword))) {
      pillars.push(pillar);
    }
  }

  // Check content type keywords
  for (const [pillar, keywords] of Object.entries(contentTypes)) {
    if (keywords.some((keyword) => text.includes(keyword))) {
      pillars.push(pillar);
    }
  }

  // Check audience keywords
  for (const [pillar, keywords] of Object.entries(audienceKeywords)) {
    if (keywords.some((keyword) => text.includes(keyword))) {
      pillars.push(pillar);
    }
  }

  // Extract key phrases (2-3 word combinations that appear to be topics)
  const words = aboutText.split(/\s+/).filter((w) => w.length > 3);
  const phrases: string[] = [];

  for (let i = 0; i < words.length - 1; i++) {
    const twoWord = `${words[i]} ${words[i + 1]}`;
    if (twoWord.length > 8 && twoWord.length < 30) {
      phrases.push(twoWord);
    }

    if (i < words.length - 2) {
      const threeWord = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
      if (threeWord.length > 12 && threeWord.length < 40) {
        phrases.push(threeWord);
      }
    }
  }

  // Add unique phrases as pillars (limit to avoid too many)
  const uniquePhrases = [...new Set(phrases)].slice(0, 3);
  pillars.push(...uniquePhrases);

  // Remove duplicates and limit to 5-7 pillars
  const uniquePillars = [...new Set(pillars)];
  return uniquePillars.slice(0, 7);
}
