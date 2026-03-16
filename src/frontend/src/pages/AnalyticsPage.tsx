import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, Loader2 } from "lucide-react";
import InsightCard from "../components/InsightCard";
import RecommendationsList from "../components/RecommendationsList";
import { useAllContent, useProfile } from "../hooks/useQueries";
import { analyzeContent } from "../utils/analyticsEngine";

export default function AnalyticsPage() {
  const { data: content, isLoading: contentLoading } = useAllContent();
  const { data: profile, isLoading: profileLoading } = useProfile();

  const isLoading = contentLoading || profileLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2
          className="w-8 h-8 animate-spin text-primary"
          data-ocid="analytics.loading_state"
        />
      </div>
    );
  }

  const insights = analyzeContent(content || [], profile?.contentPillars || []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-4xl text-foreground tracking-tight">
          Analytics & Insights
        </h1>
        <div className="h-1 w-16 bg-secondary rounded-full mt-2" />
        <p className="text-muted-foreground mt-2">
          Patterns and recommendations for{" "}
          <span className="font-semibold text-foreground">
            {profile?.brandName || "your brand"}
          </span>
        </p>
      </div>

      {(content || []).length === 0 ? (
        <Card>
          <CardContent
            className="py-12 text-center"
            data-ocid="analytics.empty_state"
          >
            <BarChart3 className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground">
              Add content to your library to see analytics and insights
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InsightCard title="Top Themes" data={insights.topThemes} />
            <InsightCard
              title="Tone Distribution"
              data={insights.toneDistribution}
            />
            <InsightCard
              title="Platform Activity"
              data={insights.platformDistribution}
            />
          </div>

          <Card className="border-l-4 border-l-primary shadow-sm">
            <CardHeader>
              <CardTitle className="font-display font-bold text-lg">
                Actionable Recommendations
              </CardTitle>
              <CardDescription>
                Strategic next steps based on your content patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecommendationsList recommendations={insights.recommendations} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
