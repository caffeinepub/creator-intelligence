import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import type { Content } from "../backend";

interface ContentCardProps {
  content: Content;
}

const platformColors: Record<string, string> = {
  instagram: "bg-pink-100 text-pink-700",
  tiktok: "bg-purple-100 text-purple-700",
  youtube: "bg-red-100 text-red-700",
  twitter: "bg-blue-100 text-blue-700",
  newsletter: "bg-green-100 text-green-700",
  blog: "bg-orange-100 text-orange-700",
  podcast: "bg-indigo-100 text-indigo-700",
};

export default function ContentCard({ content }: ContentCardProps) {
  const metadata = content.metadata ? JSON.parse(content.metadata) : {};
  const themes = metadata.themes || [];
  const tone = metadata.tone || "";

  return (
    <Link to="/content/$id" params={{ id: content.id }}>
      <Card className="border-primary/20 hover:shadow-md transition-shadow cursor-pointer h-full">
        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge
              className={
                platformColors[content.platform] || "bg-gray-100 text-gray-700"
              }
            >
              {content.platform}
            </Badge>
            <a
              href={content.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-foreground/40 hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <CardTitle className="text-base line-clamp-2">
            {content.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {content.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {themes.length > 0 && (
            <div className="flex gap-1 flex-wrap mb-2">
              {themes.slice(0, 3).map((theme: string) => (
                <span
                  key={theme}
                  className="text-xs px-2 py-1 bg-secondary/10 text-secondary-dark rounded-full"
                >
                  {theme}
                </span>
              ))}
            </div>
          )}
          {tone && (
            <p className="text-xs text-foreground/60">
              <span className="font-medium">Tone:</span> {tone}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
