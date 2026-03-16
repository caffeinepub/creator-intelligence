import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import { useContent } from "../hooks/useQueries";

export default function ContentDetailPage() {
  const { id } = useParams({ from: "/content/$id" });
  const navigate = useNavigate();
  const { data: content, isLoading } = useContent(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border-primary/20">
          <CardContent className="py-12 text-center">
            <p className="text-foreground/60">Content not found</p>
            <Button
              onClick={() => navigate({ to: "/content" })}
              variant="outline"
              className="mt-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Library
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const metadata = content.metadata ? JSON.parse(content.metadata) : {};
  const themes = metadata.themes || [];
  const keywords = metadata.keywords || [];
  const tone = metadata.tone || "";
  const hook = metadata.hook || "";
  const cta = metadata.cta || "";

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        onClick={() => navigate({ to: "/content" })}
        variant="ghost"
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Library
      </Button>

      <Card className="border-primary/20 shadow-sm">
        <CardHeader>
          <div className="flex items-start justify-between gap-4 mb-2">
            <Badge className="bg-secondary/20 text-secondary-dark">
              {content.platform}
            </Badge>
            <a
              href={content.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors"
            >
              View Original
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <CardTitle className="text-2xl">{content.title}</CardTitle>
          <CardDescription>{content.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Content</h3>
            <p className="text-foreground/70 whitespace-pre-wrap">
              {content.contentText}
            </p>
          </div>

          {themes.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-2">Themes</h3>
              <div className="flex gap-2 flex-wrap">
                {themes.map((theme: string) => (
                  <Badge
                    key={theme}
                    variant="secondary"
                    className="bg-secondary/10 text-secondary-dark"
                  >
                    {theme}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {keywords.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-2">Keywords</h3>
              <div className="flex gap-2 flex-wrap">
                {keywords.map((keyword: string) => (
                  <span
                    key={keyword}
                    className="text-sm px-2 py-1 bg-primary/10 text-primary-dark rounded"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {tone && (
            <div>
              <h3 className="font-semibold text-foreground mb-2">Tone</h3>
              <p className="text-foreground/70">{tone}</p>
            </div>
          )}

          {hook && (
            <div>
              <h3 className="font-semibold text-foreground mb-2">Hook</h3>
              <p className="text-foreground/70 italic">"{hook}"</p>
            </div>
          )}

          {cta && (
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Call to Action
              </h3>
              <p className="text-foreground/70 italic">"{cta}"</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
