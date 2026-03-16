import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface ContentPillarsInputProps {
  pillars: string[];
  onChange: (pillars: string[]) => void;
}

export default function ContentPillarsInput({
  pillars,
  onChange,
}: ContentPillarsInputProps) {
  const [newPillar, setNewPillar] = useState("");

  const addPillar = () => {
    if (newPillar.trim() && !pillars.includes(newPillar.trim())) {
      onChange([...pillars, newPillar.trim()]);
      setNewPillar("");
    }
  };

  const removePillar = (index: number) => {
    onChange(pillars.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addPillar();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">
        {pillars.map((pillar, idx) => (
          <Badge
            key={pillar}
            variant="secondary"
            className="bg-secondary/10 text-secondary-dark hover:bg-secondary/20"
          >
            {pillar}
            <button
              type="button"
              onClick={() => removePillar(idx)}
              className="ml-2 hover:text-destructive"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={newPillar}
          onChange={(e) => setNewPillar(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., Productivity, Wellness, Tech Reviews"
        />
        <Button type="button" onClick={addPillar} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
      </div>
    </div>
  );
}
