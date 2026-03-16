import type { CreatorProfile } from "../backend";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function detectPronoun(profile: CreatorProfile): "we" | "I" {
  const text = (profile.about || "").toLowerCase();
  if (/\b(team|we|our|us|studio|agency|collective|crew)\b/.test(text)) {
    return "we";
  }
  return "I";
}

function simulateResponse(message: string, profile: CreatorProfile): string {
  const pronoun = detectPronoun(profile);
  const brandName = profile.brandName;
  const pillars = profile.contentPillars || [];
  const voice = profile.voiceCharacteristics || "authentic and direct";
  const lc = message.toLowerCase();

  // Carousel-specific
  if (/carousel/i.test(lc)) {
    const pillar = pillars[0] || "your niche";
    const p2 = pillars[1] || pillar;
    const p3 = pillars[2] || pillar;
    return `Here are carousel ideas for **${brandName}**:

**1. "${pillars.length > 0 ? `${pillar} 101` : "Beginner's Guide"}"**
Slide 1: Hook (bold claim or question). Slides 2-6: One tip per slide with a short explanation. Last slide: CTA to save or follow.

**2. "${pronoun === "we" ? "Our" : "My"} Top Mistakes in ${p2}"**
Contrarian, honest format. Each slide = one mistake + what ${pronoun === "we" ? "we" : "I"} do now instead. High save rate.

**3. "${p3} Cheat Sheet"**
Infographic-style carousel. Dense value, minimal copy per slide. Works well for shares and profile visits.

Want ${pronoun === "we" ? "us" : "me"} to write the actual slide copy for any of these?`;
  }

  // Reel / video ideas
  if (/reel|video|short/i.test(lc)) {
    const pillar = pillars[0] || "your topic";
    return `Reel ideas for **${brandName}**:

**1. The "Before/After" reel** - Show a transformation related to ${pillar}. Hook in first 2 seconds. No talking required.

**2. "One thing ${pronoun === "we" ? "we" : "I"} stopped doing in ${pillar}"** - Controversial opinion format. Fast cuts, text overlay. Gets comments fast.

**3. POV: [relatable scenario in ${pillar}]** - Put the viewer in a moment they recognize. Ends with your take or a tip.

Want a full script for any of these?`;
  }

  // Caption writing
  if (/caption/i.test(lc)) {
    const pillar = pillars[0] || "your content";
    const topic =
      message.replace(/write|caption|a|for|me/gi, "").trim() || pillar;
    return `Caption for ${topic} (${voice} tone):

---
Most people overcomplicate ${topic}. Here's what actually works:

${pronoun === "we" ? "We" : "I"} spent [X time] figuring this out so you don't have to.

Save this for later.

[Your insight or tip here]

If this helped, follow for more on ${pillar}.
---

Swap the bracket parts with your specifics. Want a different tone or format?`;
  }

  // Hook / opening line
  if (/hook|opening|first line|attention/i.test(lc)) {
    const pillar = pillars[0] || "your niche";
    return `Strong hooks for ${brandName} (${pillar}):

1. "Stop doing [common thing] if you want [desired result]."
2. "The ${pillar} advice nobody talks about:"
3. "${pronoun === "we" ? "We" : "I"} tried [thing] for [time period]. Here's what happened."
4. "This one shift changed everything about [topic]."
5. "Hot take: [contrarian belief in ${pillar}]."

Pick one and tell me the topic - ${pronoun === "we" ? "we'll" : "I'll"} write the full post.`;
  }

  // Posting schedule / frequency
  if (/schedule|when to post|frequency|how often|posting plan/i.test(lc)) {
    return `Posting schedule for **${brandName}**:

**Instagram:** 4-5x/week. Reels: Mon, Wed, Fri. Carousels: Tue or Thu. Stories: daily.

**TikTok:** 1-2x/day if scaling. Otherwise 5x/week minimum for algorithm traction.

**X/Twitter:** 1-3x/day. Mix original takes with replies to trending conversations.

**Newsletter/Blog:** 1x/week. Consistency beats frequency here.

Batch content creation on 1-2 days and schedule the rest. Want ${pronoun === "we" ? "us" : "me"} to build a specific weekly content calendar?`;
  }

  // Content pillars question
  if (/pillar|focus|niche|theme|category/i.test(lc)) {
    if (pillars.length > 0) {
      return `**${brandName}'s content pillars:**

${pillars.map((p, i) => `${i + 1}. ${p}`).join("\n")}

These are the core themes ${pronoun === "we" ? "we" : "I"} return to consistently. Want ideas for any specific pillar?`;
    }
    return `${brandName} doesn't have content pillars set yet. Run the **Brand Analysis** above to extract them automatically, or add them manually in Edit Profile.`;
  }

  // Brand voice question
  if (/voice|tone|style|sound|write like|brand language/i.test(lc)) {
    if (profile.voiceCharacteristics) {
      return `**${brandName}'s voice:** *${profile.voiceCharacteristics}*

In practice:
- Write like ${pronoun === "we" ? "we're" : "I'm"} talking to one person, not a crowd
- Cut filler words and corporate-speak
- Lead with the most useful thing first

Want ${pronoun === "we" ? "us" : "me"} to rewrite something in this voice?`;
    }
    return `${brandName} doesn't have voice characteristics defined yet. Add them in Edit Profile, or run the Brand Analysis to auto-extract them.`;
  }

  // Repurposing content
  if (/repurpose|reuse|recycle|adapt|cross.?post/i.test(lc)) {
    const pillar = pillars[0] || "a core topic";
    return `Repurposing strategy for **${brandName}**:

One piece of long-form content (video or post) on ${pillar} becomes:
- 3-5 short clips or quote cards for social
- 1 carousel breaking down the key points
- 1 email newsletter expanding on it
- 3-5 tweet/X threads pulling individual insights

Start with whichever format comes most naturally. Want a specific repurposing plan for a piece of content?`;
  }

  // Content ideas (generic)
  if (/idea|suggest|give me|what (should|can) (i|we) post|topic/i.test(lc)) {
    const pillar = pillars[0] || "your niche";
    const p2 = pillars[1] || pillar;
    return `Content ideas for **${brandName}**:

1. **"${pronoun === "we" ? "Our" : "My"} honest take on [trending topic in ${pillar}]"** - Opinion content builds audience loyalty.
2. **"The thing about ${p2} nobody admits"** - Contrarian truth post. High engagement.
3. **"How ${pronoun === "we" ? "we" : "I"} [achieved result] in [timeframe]"** - Proof-based storytelling.
4. **Q&A or "Ask me anything" prompt** - Community-driven content with low production effort.
5. **"What ${pronoun === "we" ? "we're" : "I'm"} working on right now"** - Transparency content that builds trust.

Want any of these turned into a full caption or script?`;
  }

  // Strategy / growth
  if (/grow|strategy|audience|follower|reach|engagement/i.test(lc)) {
    const pillar = pillars[0] || "your niche";
    return `Growth strategy for **${brandName}** right now:

**1. Go deeper, not broader** - Double down on ${pillar}. Specialists grow faster than generalists.

**2. Prioritize saves and shares over likes** - These signal content worth pushing. Carousels and checklists get the most saves.

**3. Comment strategically** - Spend 15 min/day leaving substantive comments on larger accounts in ${pillar}. Visibility without posting.

**4. Repurpose your best-performing content** - If one format worked, rebuild it for another platform.

What's the current bottleneck - reach, engagement, or converting followers to something?`;
  }

  // Fallback
  const aboutSnippet = profile.about
    ? profile.about.length > 80
      ? `${profile.about.substring(0, 80)}...`
      : profile.about
    : null;

  if (aboutSnippet) {
    return `For **${brandName}** - ${aboutSnippet}

To answer "${message.length > 60 ? `${message.substring(0, 60)}...` : message}": the strongest move for this brand right now is to focus on consistency over volume, and lead every piece of content with the most useful thing first.

Can you give me more context on what you're specifically trying to do? ${pronoun === "we" ? "We'll" : "I'll"} give you a direct answer.`;
  }

  return `Got it. To give ${pronoun === "we" ? "us" : "you"} the most useful answer for **${brandName}**, can you give a bit more context?

Or if you want ${pronoun === "we" ? "us" : "me"} to just make a call - say "just do it" and ${pronoun === "we" ? "we'll" : "I'll"} go with ${pronoun === "we" ? "our" : "my"} best judgment based on the profile.`;
}

export async function generateChatResponse(
  message: string,
  profile: CreatorProfile,
  _history: ChatMessage[],
): Promise<string> {
  const delay = 800 + Math.random() * 700;
  await new Promise((resolve) => setTimeout(resolve, delay));

  return simulateResponse(message, profile);
}
