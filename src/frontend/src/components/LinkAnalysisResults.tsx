import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  BookmarkPlus,
  CheckCircle2,
  FileText,
  Lightbulb,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import type { LinkAnalysisResult } from "../types/linkAnalysis";

interface LinkAnalysisResultsProps {
  result: LinkAnalysisResult;
}

export default function LinkAnalysisResults({
  result,
}: LinkAnalysisResultsProps) {
  const getSourceTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      socialMediaPost: "Social Media Post",
      socialMediaProfile: "Social Media Profile",
      websitePage: "Website Page",
      article: "Article",
      analyticsScreenshot: "Analytics Screenshot",
      portfolioWork: "Portfolio Work",
      videoOrReel: "Video/Reel",
      competitorContent: "Competitor Content",
      inspirationContent: "Inspiration Content",
      unknown: "Unknown",
    };
    return labels[type] || type;
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      audiencePreference: "bg-primary/10 text-primary border-primary/20",
      messagingPattern: "bg-secondary/10 text-secondary border-secondary/20",
      contentPerformance: "bg-primary/10 text-primary border-primary/20",
      brandVoiceSignal: "bg-secondary/10 text-secondary border-secondary/20",
      strategicLearning: "bg-accent text-accent-foreground border-accent",
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case "contentIdea":
        return <Lightbulb className="w-4 h-4" />;
      case "messagingAdjustment":
        return <FileText className="w-4 h-4" />;
      case "positioningOpportunity":
        return <Target className="w-4 h-4" />;
      case "followUpConcept":
        return <Sparkles className="w-4 h-4" />;
      case "strategyImprovement":
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5 text-primary" />
            Step 1: Source Type Classification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="outline" className="text-base px-4 py-1">
            {getSourceTypeLabel(result.sourceType)}
          </Badge>
        </CardContent>
      </Card>

      <Card className="border-secondary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="w-5 h-5 text-secondary" />
            Step 2: Core Content Data
          </CardTitle>
          <CardDescription>
            Objective information extracted from the content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">
              Main Topic
            </h4>
            <p className="text-sm">{result.coreContentData.topic}</p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">
              Message
            </h4>
            <p className="text-sm">{result.coreContentData.message}</p>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                Target Audience
              </h4>
              <p className="text-sm">{result.coreContentData.audience}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                Emotional Tone
              </h4>
              <p className="text-sm">{result.coreContentData.tone}</p>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                Visual Signals
              </h4>
              <p className="text-sm">{result.coreContentData.visualSignals}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                Value Proposition
              </h4>
              <p className="text-sm">
                {result.coreContentData.valueProposition}
              </p>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                Call to Action
              </h4>
              <p className="text-sm">{result.coreContentData.callToAction}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                Engagement Indicators
              </h4>
              <p className="text-sm">
                {result.coreContentData.engagementIndicators}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            Step 3: Profile Alignment Analysis
          </CardTitle>
          <CardDescription>
            How this content aligns with your brand
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">
              Brand Voice Alignment
            </h4>
            <p className="text-sm">
              {result.profileAlignment.brandVoiceAlignment}
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">
              Audience Alignment
            </h4>
            <p className="text-sm">
              {result.profileAlignment.audienceAlignment}
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">
              Goals Alignment
            </h4>
            <p className="text-sm">{result.profileAlignment.goalsAlignment}</p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">
              Consistency with Past Content
            </h4>
            <p className="text-sm">
              {result.profileAlignment.consistencyWithPastContent}
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">
              Differentiation Opportunities
            </h4>
            <p className="text-sm">
              {result.profileAlignment.differentiationOpportunities}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-secondary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5 text-secondary" />
            Step 4: Strategic Interpretation
          </CardTitle>
          <CardDescription>
            What this content means for your strategy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">
              Why It Works (or Doesn't)
            </h4>
            <p className="text-sm">{result.strategicInterpretation.why}</p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">
              Audience Insight
            </h4>
            <p className="text-sm">
              {result.strategicInterpretation.audienceInsight}
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">
              Trend Pattern
            </h4>
            <p className="text-sm">
              {result.strategicInterpretation.trendPattern}
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">
              Positioning Effect
            </h4>
            <p className="text-sm">
              {result.strategicInterpretation.positioningEffect}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="w-5 h-5 text-primary" />
            Step 5: Actionable Recommendations
          </CardTitle>
          <CardDescription>
            Concrete next steps you can implement immediately
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.actionableRecommendations.map((rec) => (
              <div
                key={`${rec.type}-${rec.description.slice(0, 20)}`}
                className="flex gap-3 p-3 bg-card rounded-lg border"
              >
                <div className="flex-shrink-0 mt-0.5 text-primary">
                  {getRecommendationIcon(rec.type)}
                </div>
                <div className="flex-1">
                  <Badge variant="outline" className="mb-2 text-xs">
                    {rec.type.replace(/([A-Z])/g, " $1").trim()}
                  </Badge>
                  <p className="text-sm">{rec.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-secondary/20 bg-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookmarkPlus className="w-5 h-5 text-secondary" />
            Step 6: Profile Insight Stored
          </CardTitle>
          <CardDescription>
            This learning has been saved to your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3 p-4 bg-card rounded-lg border">
            <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <Badge
                variant="outline"
                className={`mb-2 ${getCategoryColor(result.profileInsight.category)}`}
              >
                {result.profileInsight.category
                  .replace(/([A-Z])/g, " $1")
                  .trim()}
              </Badge>
              <p className="text-sm font-medium">
                {result.profileInsight.insightText}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                This insight will inform future content recommendations and
                strategy suggestions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
