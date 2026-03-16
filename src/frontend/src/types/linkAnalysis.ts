// TypeScript interfaces for the 6-step link analysis structure

export enum SourceType {
  SocialMediaPost = "socialMediaPost",
  SocialMediaProfile = "socialMediaProfile",
  WebsitePage = "websitePage",
  Article = "article",
  AnalyticsScreenshot = "analyticsScreenshot",
  PortfolioWork = "portfolioWork",
  VideoOrReel = "videoOrReel",
  CompetitorContent = "competitorContent",
  InspirationContent = "inspirationContent",
  Unknown = "unknown",
}

export interface CoreContentData {
  topic: string;
  message: string;
  audience: string;
  tone: string;
  visualSignals: string;
  valueProposition: string;
  callToAction: string;
  engagementIndicators: string;
}

export interface ProfileAlignment {
  brandVoiceAlignment: string;
  audienceAlignment: string;
  goalsAlignment: string;
  consistencyWithPastContent: string;
  differentiationOpportunities: string;
}

export interface StrategicInterpretation {
  why: string;
  audienceInsight: string;
  trendPattern: string;
  positioningEffect: string;
}

export interface ActionableRecommendation {
  type:
    | "contentIdea"
    | "messagingAdjustment"
    | "positioningOpportunity"
    | "followUpConcept"
    | "strategyImprovement";
  description: string;
}

export interface LinkAnalysisResult {
  sourceType: SourceType;
  coreContentData: CoreContentData;
  profileAlignment: ProfileAlignment;
  strategicInterpretation: StrategicInterpretation;
  actionableRecommendations: ActionableRecommendation[];
  profileInsight: {
    insightText: string;
    category:
      | "audiencePreference"
      | "messagingPattern"
      | "contentPerformance"
      | "brandVoiceSignal"
      | "strategicLearning";
  };
}
