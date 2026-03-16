import { Clock, TrendingDown, TrendingUp } from "lucide-react";

interface Recommendation {
  type: "amplify" | "stop" | "frequency";
  text: string;
}

interface RecommendationsListProps {
  recommendations: Recommendation[];
}

export default function RecommendationsList({
  recommendations,
}: RecommendationsListProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "amplify":
        return <TrendingUp className="w-5 h-5 text-secondary" />;
      case "stop":
        return <TrendingDown className="w-5 h-5 text-primary" />;
      case "frequency":
        return <Clock className="w-5 h-5 text-foreground/60" />;
      default:
        return null;
    }
  };

  const getLabel = (type: string) => {
    switch (type) {
      case "amplify":
        return "Double Down";
      case "stop":
        return "Reduce";
      case "frequency":
        return "Timing";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      {recommendations.map((rec) => (
        <div key={rec.text} className="flex gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="flex-shrink-0">{getIcon(rec.type)}</div>
          <div className="flex-1">
            <div className="font-medium text-sm text-foreground/60 mb-1">
              {getLabel(rec.type)}
            </div>
            <p className="text-foreground">{rec.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
