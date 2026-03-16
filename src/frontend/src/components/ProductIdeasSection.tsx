import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface ProductIdea {
  title: string;
  description: string;
  rationale: string;
}

interface ProductIdeasSectionProps {
  ideas: ProductIdea[];
}

export default function ProductIdeasSection({
  ideas,
}: ProductIdeasSectionProps) {
  return (
    <Card className="border-primary/20 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="w-5 h-5 text-primary" />
          Product & Collaboration Ideas
        </CardTitle>
      </CardHeader>
      <CardContent>
        {ideas.length === 0 ? (
          <p className="text-foreground/60 text-sm">
            Add more content to generate personalized product and collaboration
            ideas
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ideas.map((idea) => (
              <div
                key={idea.title}
                className="p-4 bg-muted/30 rounded-lg space-y-2"
              >
                <h3 className="font-semibold text-foreground">{idea.title}</h3>
                <p className="text-sm text-foreground/70">{idea.description}</p>
                <p className="text-xs text-foreground/50 italic">
                  <span className="font-medium">Why:</span> {idea.rationale}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
