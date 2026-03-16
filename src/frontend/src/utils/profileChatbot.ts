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

function isBrandSpecific(message: string, profile: CreatorProfile): boolean {
  const lc = message.toLowerCase();
  const brandNameLc = profile.brandName.toLowerCase();
  if (
    /\b(my|our|brand|profile|voice|pillar|niche)\b/.test(lc) ||
    lc.includes(brandNameLc)
  ) {
    return true;
  }
  if (profile.contentPillars?.some((p) => lc.includes(p.toLowerCase()))) {
    return true;
  }
  const contentCreationTerms =
    /carousel|reel|caption|hook|script|post|idea|content|strategy|schedule|growth/i;
  if (
    contentCreationTerms.test(lc) &&
    (profile.contentPillars?.length > 0 || profile.about)
  ) {
    return true;
  }
  return false;
}

function handleCarousel(message: string, profile: CreatorProfile): string {
  const pronoun = detectPronoun(profile);
  const brandName = profile.brandName;
  const pillars = profile.contentPillars || [];
  const lc = message.toLowerCase();

  const topicMatch = lc.match(
    /carousel(?:\s+(?:about|on|for|around))?\s+([a-z0-9 ]+?)(?:\s*$|\s+for\b)/i,
  );
  const rawTopic = topicMatch ? topicMatch[1].trim() : "";
  const topic =
    rawTopic.length > 3 ? rawTopic : pillars[0] || "your core topic";
  const secondaryPillar = pillars[1] || pillars[0] || topic;

  const ownerWord = pronoun === "we" ? "We" : "I";
  const possPronoun = pronoun === "we" ? "our" : "my";

  return `Here's a ready-to-post carousel for **${brandName}** on **"${topic}"**:

---
**SLIDE 1 — HOOK**
"The ${topic} mistake costing you [audience pain point]."
*(Big, bold text. No logo, no preamble. Make them stop scrolling.)*

**SLIDE 2**
**Headline:** Most people think [common misconception about ${topic}].
**Body:** But here's what's actually happening — [brief truth]. ${ownerWord} learned this the hard way.

**SLIDE 3**
**Headline:** The real problem is [root cause].
**Body:** It's not about [what they think it is]. It's about [reframe]. And it shows up every time you [situation].

**SLIDE 4**
**Headline:** What actually works for ${topic}.
**Body:** [Specific tactic from ${possPronoun} experience]. Not theory — this is what moved the needle for ${brandName}.

**SLIDE 5**
**Headline:** Here's the shift:
**Body:** Stop [old behavior]. Start [new behavior]. The difference is [key insight from ${secondaryPillar}].

**SLIDE 6**
**Headline:** Quick recap:
**Body:**
✓ [Point from Slide 2]
✓ [Point from Slide 3]
✓ [Point from Slide 4]

**FINAL SLIDE — CTA**
"Save this for when you need it. Follow for more on ${topic} every week."
*(Add: link in bio or DM me [keyword] for [lead magnet])*

---

**Production notes:**
- Font: Bold display on headlines, lighter weight for body
- Color: Use ${brandName}'s primary colors for slide backgrounds
- Each slide should be readable in under 3 seconds

Replace the brackets with your specifics. Want me to swap the angle or write it for a different topic?`;
}

function handleReelScript(message: string, profile: CreatorProfile): string {
  const pronoun = detectPronoun(profile);
  const brandName = profile.brandName;
  const pillars = profile.contentPillars || [];
  const lc = message.toLowerCase();

  const topicMatch = lc.match(
    /(?:reel|short|video|script)(?:\s+(?:about|on|for))?\s+([a-z0-9 ]+?)(?:\s*$|\s+for\b)/i,
  );
  const rawTopic = topicMatch ? topicMatch[1].trim() : "";
  const topic = rawTopic.length > 3 ? rawTopic : pillars[0] || "your topic";
  const ownerWord = pronoun === "we" ? "We" : "I";
  const possPronoun = pronoun === "we" ? "our" : "my";

  return `Here's a complete reel script for **${brandName}** on **"${topic}"**:

---
**HOOK (0:00–0:03) — TEXT ON SCREEN**
"${ownerWord} almost quit ${topic} because of this."
*Visual: Close-up face or hands mid-action. Fast cut. No intro.*

**VISUAL DIRECTION (0:03–0:08)**
Cut to: [Show the problem scenario] — messy desk, failed attempt, before state.
Text overlay: "Here's what changed everything."

**VOICEOVER / CAPTION LINE 1 (0:08–0:18)**
"Most people approach ${topic} like [common way]. That's the first mistake."
*Visual: Show yourself doing the wrong thing, then stop.*

**VOICEOVER / CAPTION LINE 2 (0:18–0:30)**
"What actually works is [${possPronoun} method]. And once ${ownerWord} made this one switch, [result] happened within [timeframe]."
*Visual: Show the correct approach. Keep it hands-on, not talking-head.*

**VOICEOVER / CAPTION LINE 3 (0:30–0:40)**
"The difference isn't [what they assume]. It's [real insight about ${topic}]."
*Visual: Product, workspace, or behind-the-scenes that supports the claim.*

**CTA (0:40–0:45)**
"Follow for more on ${topic}. Or DM me [keyword] and ${ownerWord} send you [specific resource]."
*Visual: Direct camera address. Smile. Quick cut to black or loop.*

---

**Optimization notes:**
- Add captions — 80%+ of reels are watched muted
- First frame must work as a static image for Instagram grid
- Trending audio: pick a sound in the top 50 in your niche this week
- Optimal length for reach: 7–15 seconds for pure Reels, 30–60 for educational

**Caption to pair with this reel:**
${ownerWord} almost didn't share this. But if it helps even one person with ${topic}, it's worth it. Save this reel.
[5–8 hashtags in first comment, not in caption]

Want me to adjust the hook angle or write it for a specific outcome?`;
}

function handleCaptions(message: string, profile: CreatorProfile): string {
  const pronoun = detectPronoun(profile);
  const brandName = profile.brandName;
  const pillars = profile.contentPillars || [];
  const voice = profile.voiceCharacteristics || "direct and authentic";
  const lc = message.toLowerCase();

  const topicMatch = lc.match(
    /caption(?:\s+(?:for|about|on))?\s+([a-z0-9 ]+?)(?:\s*$)/i,
  );
  const rawTopic = topicMatch
    ? topicMatch[1].replace(/^(a |an |the )/, "").trim()
    : "";
  const topic =
    rawTopic.length > 3 ? rawTopic : pillars[0] || "your latest content";
  const ownerWord = pronoun === "we" ? "We" : "I";

  return `Three ready-to-post captions for **${brandName}** — **"${topic}"** (${voice} tone):

---
**Option A — Direct/Value**
${ownerWord} spent [X time] figuring out ${topic} so you don't have to.

Here's the thing nobody tells you: [Key insight].

Most people skip [step]. That's why they stay stuck.

If this helped, save it and share it with someone who needs to hear this.

*#${topic.replace(/\s+/g, "")} #[YourNiche] #[AudiencePain] #[Solution] #CreatorTips #${brandName.replace(/\s+/g, "")}*

---
**Option B — Story-Led**
[Start with a real moment or scene related to ${topic}]

${ownerWord} remember when [specific situation]. It felt like [emotion].

Then [turning point]. And that's when ${ownerWord} realized: [lesson].

Now [where you/they are]. That's the whole point of ${brandName}.

If you're in the thick of [topic], this one's for you. Drop a if this lands.

*#[Emotion] #[Topic] #${topic.replace(/\s+/g, "")} #RealTalk #[YourNiche] #${brandName.replace(/\s+/g, "")}*

---
**Option C — Punchy/Engagement**
Hot take: most advice on ${topic} is backwards.

[Contrarian one-liner].

Change ${ownerWord === "We" ? "our" : "my"} mind.

*(Use this one when you want comments. The shorter, the better for Reels.)*

*#[Niche] #${topic.replace(/\s+/g, "")} #ContentCreator #[Platform]*

---

**Hashtag strategy:**
- 3–5 niche-specific tags (high relevance, medium volume)
- 1–2 broad tags (discovery)
- Put hashtags in the first comment for a cleaner caption aesthetic

Replace brackets with your specifics. Want a different tone or topic?`;
}

function handleFacebook(message: string, profile: CreatorProfile): string {
  const lc = message.toLowerCase();
  const brandName = profile.brandName;
  const pronoun = detectPronoun(profile);
  const pillars = profile.contentPillars || [];
  const pillar = pillars[0] || "your niche";
  const ownerWord = pronoun === "we" ? "We" : "I";

  if (/ad|boost|paid|sponsor/i.test(lc)) {
    return `**Facebook Ad Copy for ${brandName}** — ready to paste:

---
**FORMAT: Standard Feed Ad**

**HOOK (first line — make it stop the scroll):**
"[Specific audience pain point] is costing you [measurable result]."

**BODY:**
${ownerWord}'ve helped [X] people with ${pillar}, and the one thing they all had in common was [insight].

Here's what ${ownerWord === "We" ? "we" : "I"} do differently:
✓ [Benefit 1]
✓ [Benefit 2]
✓ [Benefit 3]

**CTA:**
"[Click/Sign up/Learn more] → [What they get immediately]."

---
**FORMAT: Boosted Post (best for warm audiences)**
Boost posts that already have organic engagement. Pick posts with:
- 20+ reactions organically
- Comments that show genuine interest
- A clear, single CTA

**Targeting basics for ${brandName}:**
- Warm: website visitors, page engagers (last 90 days)
- Lookalike: 1–2% LAL based on your best customers/followers
- Interest: layer 2–3 specific interests, not broad (avoid "fitness" — use "CrossFit" or "HIIT training")

**Budget guidance:**
- Testing: $5–$10/day per ad set, run for 3–5 days before cutting
- Scaling: double budget every 3–4 days on winners, don't 10x overnight

Want me to write ad copy for a specific offer or campaign?`;
  }

  if (/reel|short|video/i.test(lc)) {
    return `**Facebook Reels Strategy for ${brandName}:**

Facebook Reels are currently getting outsized organic reach — the algorithm is pushing them hard to compete with TikTok.

**What performs on Facebook Reels (vs Instagram Reels):**
- Slightly longer captions work — Facebook audience reads more
- Emotional storytelling > pure tips
- Shareable content is the #1 signal (shares to feed, shares to Messenger)
- Family/community angle resonates more than hustle culture

**Repurposing from Instagram:**
Use the same reel, but:
1. Write a longer, more personal caption for Facebook
2. Tag your Facebook Page and personal profile both
3. Post natively to Facebook (do NOT cross-post via Instagram — algorithm treats it as duplicate content)
4. Engage in comments for the first 30 min

**For ${brandName}:** Your strongest angle on Facebook is [${pillar} presented as community/shared experience]. Think "${ownerWord} learned this so you don't have to" energy.

Want a full reel script optimized for Facebook specifically?`;
  }

  if (/page|personal|profile/i.test(lc)) {
    return `**Facebook Page vs Personal Profile — what to use for ${brandName}:**

**Use your Page for:**
- Running ads (required)
- Building a brand separate from your personal identity
- Scheduling posts, accessing insights
- Long-term asset building (Pages can be transferred/sold)

**Use your Personal Profile for:**
- Raw, unfiltered behind-the-scenes — Facebook's algorithm favors personal posts right now
- Network effect — friends sharing to their friends
- Community building via personal + Public posts

**Best approach for ${brandName}:**
Post on both, but with different angles. Personal: first-person story. Page: slightly more polished version of the same content.

**Page optimization checklist:**
- Profile photo: face (not logo) if you're a personal brand
- Cover: shows what you do + your offer/CTA
- Bio: keyword-rich, includes a link
- CTA button: set to your most valuable action (link, message, book)
- Featured posts: pin your 3 best-performing pieces

Want me to write your Facebook Page bio for ${brandName}?`;
  }

  return `**Facebook Post Strategy for ${brandName}:**

**Two formats that consistently perform:**

**1. Short + Punchy (Reels/Algorithm reach)**
1 sentence hook. 2–3 sentences max. One image or Reel. Used for reach.

*Example for ${brandName}:*
"Most ${pillar} content is wrong about [topic]. Here's what actually works: [insight]. Save this."

**2. Long-form Storytelling (Engagement + Trust)**
Facebook users read more than Instagram users. 150–300 word posts with a genuine story beat almost every other format for comments and shares.

*Structure:* Open with a scene → conflict/problem → what ${ownerWord === "We" ? "we" : "I"} did → lesson → question for the audience.

**Posting cadence for ${brandName}:**
- 4–5x/week on Page
- 1–2 Reels/week
- Daily Stories (optional but great for engagement)

**Best times:** Tue–Thu 9–11am and 1–3pm in your audience's timezone.

Want me to write a long-form Facebook post for a specific topic?`;
}

function handleInstagram(message: string, profile: CreatorProfile): string {
  const lc = message.toLowerCase();
  const brandName = profile.brandName;
  const pronoun = detectPronoun(profile);
  const pillars = profile.contentPillars || [];
  const pillar = pillars[0] || "your niche";
  const ownerWord = pronoun === "we" ? "We" : "I";

  if (/bio/i.test(lc)) {
    return `**Instagram Bio Optimization for ${brandName}:**

**Best-practice bio structure (150 chars max):**

Line 1: What you do + who you help (keyword-rich)
Line 2: Your unique method or proof point
Line 3: CTA → Link

**Draft bio for ${brandName}:**
[What ${ownerWord === "We" ? "We" : "I"} do] for [who you help]
[Unique method / result / content pillar: ${pillar}]
[CTA] → link

**Notes:**
- Put your primary keyword in your Name field (not just bio) — it's searchable
- Emojis are fine but each one should replace a word, not decorate
- Link should go to a single landing page (Linktree only if you have 4+ destinations)
- Review and update every 90 days as your focus evolves

Share your current bio and ${ownerWord === "We" ? "we'll" : "I'll"} rewrite it.`;
  }

  if (/stor(y|ies)/i.test(lc)) {
    return `**Instagram Stories Strategy for ${brandName}:**

**What actually drives results in Stories:**

**Poll sticker** — easiest engagement. Ask a binary question about ${pillar}. The audience feels heard; you get data. Example: "Do you [X] or [Y]?" Respond to every vote.

**Question sticker** — slower but more valuable. Ask something open-ended. Reshare the best answers (it builds community and fills your content calendar).

**Swipe-up alternative (no link sticker needed):** Use a CTA in the story: "DM me [keyword] for [thing]." Reply personally. Converts better than link stickers.

**Sequence that works for ${brandName}:**
Story 1: Behind-the-scenes or a day-in-the-life moment
Story 2: Poll or question about ${pillar}
Story 3: Quick tip or insight (text-heavy is fine)
Story 4: CTA (DM, link, save a post)

**Cadence:** 4–7 stories/day keeps you at the front of the feed. Under 3 and you fall out of the habit loop.

Want a full 7-day Stories content plan for ${brandName}?`;
  }

  if (/grid|aesthetic|feed/i.test(lc)) {
    return `**Instagram Grid Strategy for ${brandName}:**

**Grid aesthetic in 2025:**
The "perfectly curated checkerboard" era is over. What works now:
- Consistent color palette (2–3 dominant colors from your brand)
- Consistent framing style (close-up, lifestyle, text-heavy, etc.)
- Visual pattern that reads as a brand when someone lands on the profile

**For ${brandName}:** Lead with [${pillar}] in visual form. If you're a face-forward brand, 60% of posts should show your face. If you're content/product-led, create a consistent frame or template.

**Posting cadence:**
- 4–5x/week for growth
- Reels: Mon, Wed, Fri (peak algorithm push)
- Carousels: Tue, Thu (high save rate = algorithmic reward)
- Single image: use for aesthetic consistency or memes

**What kills grids:**
- Mixing portrait and landscape without a system
- Reposting Stories as posts (blurry, wrong ratio)
- Going dark for 2+ weeks and then mass posting

Want a content calendar template built around this structure?`;
  }

  if (/reel/i.test(lc)) {
    return `**Instagram Reels Optimization for ${brandName}:**

**First frame rules:**
- Must work as a static image (it's your thumbnail)
- Text overlay visible without reading — use contrast, large font
- Face or motion in frame is 40% more likely to stop the scroll

**Audio strategy:**
- Trending audio = distribution boost in discovery
- Original audio = brand building and SEO over time
- Mix: 70% trending, 30% original (or voiceover)

**Text overlay placement:**
- Keep text out of the bottom 25% (UI buttons cover it)
- Don't center everything — off-center text feels more native
- Use text to add context, not just repeat what you're saying

**Reel topics that perform for ${brandName} (${pillar}):**
1. "Things ${ownerWord === "We" ? "we" : "I"} stopped doing in ${pillar}"
2. "Hot take on [common advice in ${pillar}]"
3. "Day in the life" — low production, high relatability
4. "What [X] actually looks like" — debunks expectations
5. "Before I knew [insight about ${pillar}]" — transformation arc

Want a full reel script for any of these?`;
  }

  return `**Instagram Strategy for ${brandName}:**

**Priority formats ranked by current algorithm weight:**
1. Reels (reach + discovery)
2. Carousels (saves + shares)
3. Stories (engagement + retention)
4. Single image (grid aesthetic)

**For ${brandName} right now:**
- 2 Reels/week minimum to stay in distribution
- 1–2 Carousels/week for saves (algorithm rewards saves heavily)
- Daily Stories to stay top-of-mind with existing followers

**The content angle that works for ${pillar}:**
Go specific. "${pillar} tips" is noise. "${pillar} tips for [specific person in a specific situation]" cuts through.

What specific part of Instagram do you want to focus on — Reels, Stories, growth, or ads?`;
}

function handleGeneralMarketing(message: string): string {
  const lc = message.toLowerCase();

  if (/algorithm/i.test(lc)) {
    const platform = /facebook|fb/i.test(lc)
      ? "Facebook"
      : /tiktok/i.test(lc)
        ? "TikTok"
        : "Instagram";
    return `**How the ${platform} Algorithm Works (2025):**

**What it actually optimizes for:** Time spent in app. Every signal it measures is a proxy for this.

**Ranked signals (most to least impactful):**
1. **Shares** — strongest signal. Someone leaving the app to share = high value content.
2. **Saves** — signals "I'll come back to this." Algorithm treats this as evergreen.
3. **Comments** — especially comment replies. Conversation = retention.
4. **Likes** — weakest signal. Easy to give, algorithm knows it.
5. **Watch time / scroll pause** — for video, completion rate matters most.

**What tanks your reach:**
- Buying followers (kills engagement rate)
- Posting then going dark (no early engagement = no push)
- Posting and not responding to comments in first 30–60 min

**What actually moves the needle:**
Post when your audience is online. Engage for 15–30 min immediately after posting. Use formats the algorithm is currently pushing — those are the ones getting native upload options.

Want algorithm strategy applied to a specific format?`;
  }

  if (/funnel|tofu|mofu|bofu|content funnel/i.test(lc)) {
    return `**Content Funnel Framework (TOFU/MOFU/BOFU) for Creators:**

**TOFU — Top of Funnel (Awareness)**
Goal: reach cold audiences who don't know you exist.
Formats: Reels, viral-style carousels, broad educational content.
Tone: Here's something useful. No ask.
Metric: Reach, new followers, saves.

**MOFU — Middle of Funnel (Consideration)**
Goal: deepen relationship with warm audience.
Formats: Stories, email newsletters, longer carousels, Q&As.
Tone: Here's who we are and why we're different.
Metric: Story views, DMs, email opens, link clicks.

**BOFU — Bottom of Funnel (Conversion)**
Goal: get warm audience to take action.
Formats: testimonials, case studies, direct offers, live events.
Tone: Here's the thing, and here's how to get it.
Metric: DMs, sales, sign-ups, bookings.

**Common mistake:** Most creators live in TOFU (chasing reach) and skip MOFU entirely. Result: big audience, no conversions.

**Fix:** At least 30% of your content should be MOFU — showing who you are, your process, your results, your community.`;
  }

  if (/engagement rate|benchmark|metrics|analytics/i.test(lc)) {
    return `**Social Media Benchmarks & Metrics That Actually Matter:**

**Engagement Rate Benchmarks (2025):**
- Instagram: Low <1% | Average 1–3% | Strong 3–6%
- Facebook: Low <0.5% | Average 0.5–1% | Strong 1–3%
- TikTok: Low <3% | Average 3–9% | Strong 9%+

*Engagement rate = (likes + comments + saves + shares) / reach x 100*

**Metrics that actually predict growth:**
- **Save rate** (saves / impressions) — best proxy for content value
- **Share rate** (shares / reach) — best proxy for viral potential
- **Profile visit rate** (profile visits / reach) — best proxy for curiosity conversion
- **Follower conversion rate** (new follows / profile visits) — measures bio effectiveness

**Metrics to stop obsessing over:**
- Likes (too easy to give)
- Total follower count (engagement rate matters more)
- Impressions (vanity metric without context)

**Track weekly:** reach trend, save rate, follower conversion rate, top posts by saves.`;
  }

  if (/a.?b test|testing|experiment/i.test(lc)) {
    return `**A/B Testing for Social Media — What's Actually Worth Testing:**

**Test one variable at a time.** On social, you rarely have enough data to test more.

**Highest-impact variables:**
1. **Hook** — same content, different first line. Run for 3–5 posts each.
2. **Format** — carousel vs Reel vs single image for same topic
3. **Posting time** — same content, 2-hour time difference
4. **CTA** — "save this" vs "share this" vs "comment below"

**How to run it:**
- Post Version A on Monday, Version B on Thursday
- Compare same metric (saves, shares, reach) after 72 hours
- 5+ content cycles before calling a winner

**On paid ads:** Run identical ads with 1 variable change, minimum $10/day each, minimum 1,000 impressions before comparing CTR.

**Don't bother A/B testing:** captions on organic posts (too many confounding variables), hashtags (marginal impact).`;
  }

  if (/paid|ads|organic|when to run/i.test(lc)) {
    return `**Paid vs Organic — When to Run Ads:**

**Don't run ads if:**
- Your organic content doesn't convert yet (ads amplify what's there, they don't fix broken content)
- You don't have a clear CTA destination (landing page, booking link, product page)
- You're growing followers only — ads for follower growth almost never ROI

**Run ads when:**
- A post already performs well organically (boost to extend reach to cold audiences)
- You have a specific, time-bound offer (course launch, event, sale)
- You're building an email list and have a lead magnet with proven conversion
- You want retargeting — showing offers to people who've already engaged

**Starting budget:** $10–$20/day minimum to get meaningful data in 3–5 days. Below $5/day, you don't have enough impressions to learn anything.

**Platform recommendation:** Start with Facebook/Instagram ads (Meta Ads Manager). More targeting options, better remarketing tools, more mature ecosystem than TikTok Ads.`;
  }

  if (/email|newsletter|list building/i.test(lc)) {
    return `**Email List Building for Content Creators:**

**Why email still wins:** You own the list. Algorithm changes don't affect it. Email consistently out-converts social by 3–5x.

**Fastest ways to grow a list from social:**
1. **Lead magnet via DM** — Post: "DM me [keyword] for [specific resource]." Auto-reply sends the link. Converts cold audience into email subscribers.
2. **Link-in-bio tool** — Linktree or Beacons with email opt-in as the first item
3. **Stories CTA** — Weekly Story specifically asking for email sign-up with a reason to care today
4. **Gated carousel** — Last slide: "Get the full version → link in bio"

**Lead magnet ideas that convert:**
- Checklists, templates, swipe files (fast consumption)
- Mini email courses (5-day, one tip/day — builds habit)
- Private resource library

**Email cadence:** 1x/week minimum. Readers who hear from you less than once a week forget who you are.

**Don't start with:** complex automations. Start with a single welcome email and a weekly send. Get consistent first.`;
  }

  if (/batch|workflow|content process|systems/i.test(lc)) {
    return `**Content Batching Workflow — The System That Actually Works:**

**Weekly batch system (2–3 hours/week):**

**Monday — Ideation (30 min)**
- Review last week's top performers (what got saves/shares?)
- List 5–7 content ideas
- Assign each a format (Reel, carousel, story, post)

**Tuesday–Wednesday — Creation (60–90 min)**
- Film all Reels back-to-back (same setup, same light)
- Write all captions in one sitting (same tone of voice)
- Create graphics/carousels in bulk using templates

**Thursday — Scheduling (30 min)**
- Schedule posts in your tool (Later, Buffer, Meta Business Suite)
- Prep Stories content
- Write and schedule newsletter if applicable

**The shift this creates:** You go from reactive to intentional. When something happens mid-week, you add it as a bonus, not a scramble.

**Tools:** Meta Business Suite (free, Instagram+Facebook), Later (visual grid planning), Notion or Google Sheets for content calendar.`;
  }

  if (/monetiz|revenue|income|make money/i.test(lc)) {
    return `**Monetization Paths for Content Creators:**

**Ranked by scalability:**
1. **Digital products** (courses, templates, guides) — sell once, deliver infinitely. Best ROI once built.
2. **Email list** → direct sales — your owned audience, highest conversion.
3. **Brand partnerships** — paid when reach + niche alignment is there. Requires media kit.
4. **Consulting / coaching** — high ticket, time-limited. Best for early monetization before scale.
5. **Affiliate / commission** — passive but low margins. Good supplement, not a foundation.
6. **Platform payouts** (Instagram Reels bonus, YouTube AdSense) — requires massive volume to be meaningful.

**Sequencing:**
- 0–1K followers: Build audience, document expertise, start email list
- 1K–10K: Launch first digital product, take consulting clients
- 10K+: Pursue brand partnerships with a media kit, scale digital products

What's your current audience size and which path are you exploring?`;
  }

  if (/tiktok/i.test(lc)) {
    return `**TikTok Strategy (2025 Overview):**

**How TikTok differs from Instagram/Facebook:**
- Content is served based on interest graph, not follower graph — a 0-follower account can go viral
- Trending sounds are algorithmically boosted — use them
- Native TikTok content (shot vertically, in-app captions) outperforms reposts from other platforms

**What still works:**
- Hook in first 1.5 seconds (TikTok users scroll faster than Instagram)
- Clear loop structure (video ends where it began = rewatches)
- Duets and stitches for commentary content
- Authentic, low-production content performs alongside high-production

**Cross-posting from Instagram:**
Don't use Instagram's cross-post feature — TikTok flags the watermark and reduces reach. Download natively, re-upload manually.

**For creators on Instagram/Facebook primarily:**
TikTok is worth a limited investment — post your best Reels there natively, 2–3x/week, don't over-optimize for it until your core platforms are stable.`;
  }

  if (/youtube|shorts/i.test(lc)) {
    return `**YouTube & YouTube Shorts Strategy:**

**YouTube Shorts vs Long-form:**
- Shorts: discovery and reach (serves like TikTok, interest-based)
- Long-form: trust and monetization (watch time, ad revenue, search)
- They serve different goals — use both, don't choose

**Shorts that work:**
- Clips from existing long-form (repurposing ROI)
- Standalone tips under 60 seconds
- Hook must work with sound OFF (captions required)

**Long-form YouTube fundamentals:**
- Thumbnail + title = 80% of performance. Make them work as a unit.
- First 30 seconds: state the problem, promise the payoff, start delivering immediately
- End screen + subscribe CTA at 80% of video

**Channel growth:**
- SEO matters more on YouTube than any other platform. Use keywords in title, description, chapters.
- Consistency beats quality early. Weekly is better than monthly perfection.`;
  }

  if (/repurpose|cross.?post|cross platform/i.test(lc)) {
    return `**Cross-Platform Repurposing: Instagram to Facebook (and beyond):**

**The repurposing hierarchy:**
Long-form video → Reel/Short → Carousel → Caption → Quote card → Story → Tweet

**Instagram → Facebook specifically:**
- Do NOT use Instagram's "share to Facebook" feature. The algorithm deprioritizes cross-posted content.
- Download from Instagram, re-upload natively to Facebook
- Rewrite the caption with a longer, more personal angle for Facebook's audience
- Add a question at the end — Facebook comments > Instagram comments for organic reach

**One content piece → multiple platforms:**
A single 10-minute YouTube video can become:
- 3–5 YouTube Shorts
- 2 Instagram Reels
- 1 carousel (key points)
- 3–5 Facebook posts (each point expanded)
- 1 newsletter issue

What specific content do you want to repurpose?`;
  }

  if (/ugc|partnership|brand deal|collab|sponsor/i.test(lc)) {
    return `**Brand Partnerships & UGC for Creators:**

**UGC (User-Generated Content) vs Influencer Marketing:**
- UGC: you create content the brand uses in their ads. No audience required. Pay is per deliverable.
- Influencer: you post to your audience. Pay scales with reach + engagement rate.

**UGC rates (2025 baseline):**
- 1 video: $150–$500 depending on usage rights and complexity
- Package (3 videos): $400–$1,200
- Charge more for: exclusivity, usage rights, raw files, paid ad usage

**Influencer partnership rates:**
- Micro (1K–10K): $50–$500/post
- Mid-tier (10K–100K): $500–$5,000/post

**How to pitch:**
1. Build a media kit (audience demographics, engagement rate, past partnerships)
2. Research the brand — pitch a specific campaign idea, not "I'd love to work together"
3. DM the marketing/social team directly, not the general contact email
4. Price with confidence — undercutting hurts the whole ecosystem`;
  }

  return `To give you a specific answer — what are you trying to figure out or fix?

For example:
- "How does the Instagram algorithm work?"
- "When should I run Facebook ads?"
- "How do I build an email list?"
- "What's a content funnel and do I need one?"
- "What are engagement rate benchmarks?"

Or if it's about your brand specifically, ask with your brand context and I'll pull from your profile data.`;
}

function handleStrategy(message: string, profile: CreatorProfile): string {
  const pronoun = detectPronoun(profile);
  const brandName = profile.brandName;
  const pillars = profile.contentPillars || [];
  const pillar = pillars[0] || "your niche";
  const lc = message.toLowerCase();

  if (/grow|follower|reach|audience/i.test(lc)) {
    return `**Growth Strategy for ${brandName} right now:**

**1. Go deeper on ${pillar}, not broader.**
Specialists grow faster. "${pillar} for [specific person in specific situation]" beats generic ${pillar} content every time.

**2. Prioritize saves and shares over likes.**
These are the signals the algorithm uses to decide if content is worth pushing. Carousels and checklists get the most saves. Relatable, opinionated content gets shares.

**3. Comment strategically for 15 min/day.**
Leave substantive (not generic) comments on posts from larger accounts in your niche. You get visibility without creating new content.

**4. Repurpose your best performers.**
Your top 3 posts from the last 90 days — rebuild them in a different format. What worked once will work again.

**5. Use DMs intentionally.**
Every CTA should invite a DM. Reply to everyone. This is the highest-signal engagement on Instagram and Facebook right now.

**Current bottleneck question:**
Are you stuck on reach (not enough new eyes), engagement (people see it but don't interact), or conversion (followers but no revenue/action)? Each has a different fix.`;
  }

  if (/schedule|when to post|frequency|calendar/i.test(lc)) {
    return `**Posting Schedule for ${brandName}:**

**Instagram:**
- Reels: Mon, Wed, Fri (peak algorithm push days)
- Carousels: Tue, Thu (high save rate days)
- Stories: Daily (4–7 per day for top-of-feed positioning)
- Best times: 9–11am and 6–8pm in your audience's timezone

**Facebook:**
- Posts: 4–5x/week
- Reels: 2–3x/week (currently getting outsized reach)
- Best times: Tue–Thu, 9am–1pm

**The rule that matters more than timing:**
Post when you can respond to comments within the first 30 min. Early engagement = algorithm push.

**For ${brandName} specifically:**
Batch ${pillar} content creation on one day. Schedule the rest. Spend the time you save on engagement (comments, DMs, community).`;
  }

  return `**Content Strategy for ${brandName}:**

**Two-track approach:**

Track 1 — Growth content (reach new people)
Formats: Reels, viral-angle carousels, relatable/opinionated posts
Topic: ${pillar} from a fresh angle — not what's been said, what's been missed

Track 2 — Depth content (convert existing audience)
Formats: Long captions, Stories, email
Topic: Behind the process, your take, proof of results

**Ratio:** 60% growth, 40% depth. Most creators get this backwards — they post for their existing audience and wonder why they're not growing.

What's the specific strategic question — growth, conversion, posting cadence, or something else?

${pronoun === "we" ? "We have" : "I have"} your brand data loaded — ask anything specific to ${brandName} and I'll tailor it.`;
}

function handleBrandVoice(profile: CreatorProfile): string {
  const pronoun = detectPronoun(profile);
  const brandName = profile.brandName;
  if (profile.voiceCharacteristics) {
    return `**${brandName}'s voice:** *${profile.voiceCharacteristics}*

In practice:
- Write like ${pronoun === "we" ? "we're" : "I'm"} talking to one specific person, not a crowd
- Lead with the most useful thing first — no throat-clearing
- Cut filler words: "just," "really," "I think," "in my opinion"
- Short sentences for emphasis. Longer ones for nuance and context.
- Avoid: "leverage," "synergy," "content that resonates," "showing up"

Want ${pronoun === "we" ? "us" : "me"} to rewrite something in this voice?`;
  }
  return `${brandName} doesn't have voice characteristics defined yet. Add a description in Edit Profile, or run the Brand Analysis to extract them automatically from your linked content.`;
}

function handlePillars(profile: CreatorProfile): string {
  const pronoun = detectPronoun(profile);
  const brandName = profile.brandName;
  const pillars = profile.contentPillars || [];
  if (pillars.length > 0) {
    return `**${brandName}'s content pillars:**

${pillars.map((p, i) => `${i + 1}. **${p}**`).join("\n")}

These are the themes ${pronoun === "we" ? "we" : "I"} return to consistently. Each pillar should have 2–3 content formats that work well for it.

Want ideas for any specific pillar?`;
  }
  return `${brandName} doesn't have content pillars set yet. Run the **Brand Analysis** above to extract them automatically, or add them manually in Edit Profile.`;
}

function handleRepurpose(profile: CreatorProfile): string {
  const pronoun = detectPronoun(profile);
  const brandName = profile.brandName;
  const pillars = profile.contentPillars || [];
  const pillar = pillars[0] || "a core topic";
  return `**Repurposing system for ${brandName}:**

One long-form piece on ${pillar} becomes:

1. **Reels (2–3)** — pull the most punchy 30–45 second moment. Add text overlay.
2. **Carousel** — break the key points into slides. Hook headline + 5 slides + CTA.
3. **Facebook post** — longer version of the same insight with a personal story framing.
4. **Stories** — behind-the-scenes of making the content + poll or question sticker.
5. **Email** — expand on the "so what" with more context than social allows.

**The rule:** create once, distribute five ways. The content is the same; the format and caption angle change.

What's a recent piece of content ${pronoun === "we" ? "we" : "you"} want to repurpose? ${pronoun === "we" ? "We'll" : "I'll"} map it out.`;
}

function simulateResponse(message: string, profile: CreatorProfile): string {
  const lc = message.toLowerCase();

  if (/carousel/i.test(lc)) return handleCarousel(message, profile);

  if (
    /reel.*script|script.*reel|write.*reel|write.*script|full script|reel copy/i.test(
      lc,
    )
  )
    return handleReelScript(message, profile);

  if (/caption/i.test(lc)) return handleCaptions(message, profile);

  if (/\bfacebook\b|\bfb\b|\bmeta\b|facebook ad|boosted post/i.test(lc))
    return handleFacebook(message, profile);

  if (/\binstagram\b|\big\b|insta|stories|grid|feed aesthetic|bio/i.test(lc))
    return handleInstagram(message, profile);

  if (/reel|short.*video|video idea/i.test(lc))
    return handleInstagram(message, profile);

  if (
    /grow|strategy|audience|follower|reach|engagement|schedule|when to post|frequency|calendar/i.test(
      lc,
    )
  )
    return handleStrategy(message, profile);

  if (/repurpose|reuse|recycle|adapt|cross.?post/i.test(lc)) {
    return isBrandSpecific(message, profile)
      ? handleRepurpose(profile)
      : handleGeneralMarketing(message);
  }

  if (/voice|tone|style|sound like|write like|brand language/i.test(lc))
    return handleBrandVoice(profile);

  if (/pillar|focus|niche|theme|category/i.test(lc))
    return handlePillars(profile);

  if (
    /algorithm|funnel|tofu|mofu|bofu|engagement rate|benchmark|a.?b test|paid.*ad|email list|newsletter|batch|workflow|monetiz|tiktok|youtube|ugc|partnership|brand deal/i.test(
      lc,
    )
  )
    return handleGeneralMarketing(message);

  if (/hook|opening|first line|attention/i.test(lc)) {
    const pronoun = detectPronoun(profile);
    const pillars = profile.contentPillars || [];
    const pillar = pillars[0] || "your niche";
    const brandName = profile.brandName;
    return `**Strong hooks for ${brandName} (${pillar}):**

1. "Stop doing [common thing] if you want [desired result]."
2. "The ${pillar} advice nobody talks about:"
3. "${pronoun === "we" ? "We" : "I"} tried [thing] for [time period]. Here's what happened."
4. "This one shift changed everything about [topic]."
5. "Hot take: [contrarian belief in ${pillar}]."
6. "[Number] things ${pronoun === "we" ? "we" : "I"} wish ${pronoun === "we" ? "we" : "I"} knew before starting [topic]."
7. "Nobody talks about the [downside/truth] of [desirable thing] in ${pillar}."

Pick one and tell me the topic — ${pronoun === "we" ? "we'll" : "I'll"} write the full post around it.`;
  }

  if (/idea|suggest|give me|what (should|can) (i|we) post|topic/i.test(lc)) {
    const pronoun = detectPronoun(profile);
    const pillars = profile.contentPillars || [];
    const pillar = pillars[0] || "your niche";
    const p2 = pillars[1] || pillar;
    const brandName = profile.brandName;
    const ownerWord = pronoun === "we" ? "We" : "I";
    return `**Content ideas for ${brandName}:**

1. **"${ownerWord === "We" ? "Our" : "My"} honest take on [trending topic in ${pillar}]"** — Opinion content builds loyalty faster than tips.
2. **"The thing about ${p2} nobody admits"** — Contrarian truth post. High engagement, high save rate.
3. **"How ${ownerWord === "We" ? "we" : "I"} [achieved result] in [timeframe]"** — Proof-based storytelling. Builds credibility.
4. **Q&A: "Ask me anything about ${pillar}"** — Story poll → best answers become a carousel.
5. **"What ${ownerWord === "We" ? "we're" : "I'm"} working on right now"** — Transparency content. Builds trust without tips.
6. **"[Common advice in ${pillar}] is wrong. Here's why."** — Contrarian format with built-in tension.

Want any of these turned into a full caption, carousel, or reel script?`;
  }

  // Fallback
  const pronoun = detectPronoun(profile);
  const brandName = profile.brandName;
  const hasBrandData =
    (profile.contentPillars?.length ?? 0) > 0 || profile.about;

  if (hasBrandData) {
    return `For **${brandName}** — ${pronoun === "we" ? "our" : "your"} brand data is loaded. Tell me specifically what you need:

- A **carousel** or **reel script** on a specific topic
- **Captions** (2–3 options) for a specific post
- **Facebook** post, ad copy, or Reels strategy
- **Instagram** Reels, Stories, bio, or grid strategy
- **Marketing** questions (algorithm, funnels, metrics, email, monetization)
- **Content ideas** or a **posting schedule**

The more specific the ask, the more specific ${pronoun === "we" ? "our" : "my"} answer.`;
  }

  return `For **${brandName}** — what do you need?

- "Write me a carousel about [topic]"
- "Give me a full reel script for [topic]"
- "3 captions for [topic or post]"
- "Facebook ad copy for [offer]"
- "How does the Instagram algorithm work?"
- "When should I run paid ads?"

Or run the **Brand Analysis** first — it unlocks brand-specific recommendations tailored to ${brandName}.`;
}

export async function generateChatResponse(
  message: string,
  profile: CreatorProfile,
  _history: ChatMessage[],
): Promise<string> {
  const delay = 600 + Math.random() * 600;
  await new Promise((resolve) => setTimeout(resolve, delay));
  return simulateResponse(message, profile);
}
