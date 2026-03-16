# Creator Intelligence

## Current State
The AI assistant in ProfilePage uses a `profileChatbot.ts` utility with simulated pattern-matching responses. It handles carousels, reels, captions, hooks, schedule, pillars, voice, repurposing, and general content ideas. Facebook is not specifically handled. The carousel output gives ideas but not full slide-by-slide copy. The reel output gives ideas but not full scripts. General marketing questions without brand context are not well-served.

## Requested Changes (Diff)

### Add
- Facebook-specific handlers: ad copy, post formats, page strategy, Reels on Facebook, boosted post advice
- Full slide-by-slide carousel copy when requested (not just ideas)
- Full reel scripts with hook, body, CTA when requested
- General marketing knowledge mode: when the question isn't brand-specific (e.g. "how does the Instagram algorithm work?", "what is a content funnel?"), respond with expert marketing knowledge without requiring brand context
- Smart context detection: if question mentions the brand, profile, or uses possessive pronouns ("my", "our"), pull from brand analysis; otherwise answer as a general marketing expert
- Instagram-specific deep handlers: Stories strategy, Reels optimization, grid aesthetics, bio optimization, link-in-bio
- A broader set of general marketing topics: funnels, email marketing basics, paid ads basics, A/B testing, analytics interpretation, audience building

### Modify
- Carousel handler: produce actual ready-to-use slide copy (numbered slides with headline + body text) not just format ideas
- Reel handler: produce a full script (hook line, visual direction, voiceover/caption text, CTA)
- Caption handler: produce 2-3 full ready-to-post captions with hashtag suggestions
- Fallback: instead of vague response, detect whether question is general marketing and answer substantively

### Remove
- Nothing removed

## Implementation Plan
1. Rewrite `profileChatbot.ts` to expand `simulateResponse` with:
   - Facebook post/ad/reel/story handlers
   - Full carousel slide copy output
   - Full reel script output  
   - Multiple ready-to-post captions with hashtags
   - General marketing knowledge handlers (algorithm, funnel, ads, analytics, A/B test, email, engagement rate, etc.)
   - Smart brand-vs-general context detection
2. Update assistant placeholder text in ProfilePage to reflect expanded capabilities
