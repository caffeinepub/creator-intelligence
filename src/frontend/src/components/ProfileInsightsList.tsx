import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookmarkPlus, ExternalLink } from "lucide-react";
import type { ProfileInsight } from "../backend";

interface ProfileInsightsListProps {
  insights: ProfileInsight[];
}

export default function ProfileInsightsList({
  insights,
}: ProfileInsightsListProps) {
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

  const getCategoryLabel = (category: string): string => {
    return category.replace(/([A-Z])/g, " $1").trim();
  };

  const formatDate = (timestamp: bigint): string => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const groupedInsights = insights.reduce(
    (acc, insight) => {
      const category = insight.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(insight);
      return acc;
    },
    {} as Record<string, ProfileInsight[]>,
  );

  if (insights.length === 0) {
    return (
      <Card className="border-secondary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookmarkPlus className="w-5 h-5 text-secondary" />
            Profile Insights & Learnings
          </CardTitle>
          <CardDescription>
            Strategic insights accumulated from content analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <BookmarkPlus className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">
              No insights yet. Analyze content links to build your strategic
              knowledge base.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-secondary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookmarkPlus className="w-5 h-5 text-secondary" />
          Profile Insights & Learnings
        </CardTitle>
        <CardDescription>
          {insights.length} strategic insight{insights.length !== 1 ? "s" : ""}{" "}
          accumulated from content analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            {Object.entries(groupedInsights).map(
              ([category, categoryInsights]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={getCategoryColor(category)}
                    >
                      {getCategoryLabel(category)}
                    </Badge>
                    <span className="text-muted-foreground">
                      ({categoryInsights.length})
                    </span>
                  </h3>
                  <div className="space-y-3">
                    {categoryInsights.map((insight) => (
                      <div
                        key={insight.timestamp.toString()}
                        className="p-4 bg-card rounded-lg border hover:border-secondary/40 transition-colors"
                      >
                        <p className="text-sm mb-2">{insight.insightText}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{formatDate(insight.timestamp)}</span>
                          {insight.sourceLink && (
                            <a
                              href={insight.sourceLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 hover:text-secondary transition-colors"
                            >
                              Source
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
