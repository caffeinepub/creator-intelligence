import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Library, Lightbulb, TrendingUp } from "lucide-react";
import type { ContentIdea } from "../utils/contentIdeaGenerator";

interface ContentIdeasSectionProps {
  ideas: ContentIdea[];
  onSelectIdea?: (idea: ContentIdea) => void;
}

export default function ContentIdeasSection({
  ideas,
  onSelectIdea,
}: ContentIdeasSectionProps) {
  if (ideas.length === 0) {
    return null;
  }

  const libraryIdeas = ideas.filter((idea) => idea.type === "library");
  const trendingIdeas = ideas.filter((idea) => idea.type === "trending");

  return (
    <Card className="border-primary/20 shadow-sm mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Lightbulb className="w-5 h-5 text-primary" />
          Content Ideas
        </CardTitle>
        <CardDescription>
          Personalized suggestions based on your content library and trending
          topics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {libraryIdeas.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Library className="w-4 h-4 text-secondary-dark" />
                <h3 className="font-semibold text-foreground">
                  From Your Content
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {libraryIdeas.map((idea) => (
                  <IdeaCard
                    key={idea.title}
                    idea={idea}
                    onSelect={onSelectIdea}
                  />
                ))}
              </div>
            </div>
          )}

          {trendingIdeas.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-foreground">
                  Trending & Timely
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {trendingIdeas.map((idea) => (
                  <IdeaCard
                    key={idea.title}
                    idea={idea}
                    onSelect={onSelectIdea}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function IdeaCard({
  idea,
  onSelect,
}: { idea: ContentIdea; onSelect?: (idea: ContentIdea) => void }) {
  return (
    <div className="p-4 border border-border rounded-lg hover:border-secondary/40 transition-colors bg-white">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-semibold text-foreground text-sm">{idea.title}</h4>
        <Badge
          variant={idea.type === "library" ? "secondary" : "default"}
          className="text-xs"
        >
          {idea.type === "library" ? "Library" : "Trending"}
        </Badge>
      </div>
      <p className="text-sm text-foreground/70 mb-2">{idea.description}</p>
      <p className="text-xs text-foreground/50 italic mb-3">{idea.reasoning}</p>
      {onSelect && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => onSelect(idea)}
          className="w-full text-xs"
        >
          Use This Idea
        </Button>
      )}
    </div>
  );
}
