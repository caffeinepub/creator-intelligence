import { Button } from "@/components/ui/button";
import { Platform } from "../backend";

interface ContentFilterProps {
  selected: Platform | "all";
  onSelect: (platform: Platform | "all") => void;
}

const platforms: Array<{ value: Platform | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: Platform.instagram, label: "Instagram" },
  { value: Platform.tiktok, label: "TikTok" },
  { value: Platform.youtube, label: "YouTube" },
  { value: Platform.twitter, label: "X/Twitter" },
  { value: Platform.newsletter, label: "Newsletter" },
  { value: Platform.blog, label: "Blog" },
  { value: Platform.podcast, label: "Podcast" },
];

export default function ContentFilter({
  selected,
  onSelect,
}: ContentFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {platforms.map((platform) => (
        <Button
          key={platform.value}
          variant={selected === platform.value ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(platform.value)}
          className={
            selected === platform.value
              ? "bg-secondary hover:bg-secondary-dark"
              : ""
          }
        >
          {platform.label}
        </Button>
      ))}
    </div>
  );
}
