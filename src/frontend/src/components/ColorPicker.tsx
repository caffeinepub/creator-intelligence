import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface ColorPickerProps {
  colors: string[];
  onChange: (colors: string[]) => void;
}

export default function ColorPicker({ colors, onChange }: ColorPickerProps) {
  const [newColor, setNewColor] = useState("#D4745E");

  const addColor = () => {
    if (newColor && !colors.includes(newColor)) {
      onChange([...colors, newColor]);
    }
  };

  const removeColor = (index: number) => {
    onChange(colors.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">
        {colors.map((color, idx) => (
          <div
            key={color}
            className="relative group w-16 h-16 rounded-lg border border-border shadow-sm"
            style={{ backgroundColor: color }}
          >
            <button
              type="button"
              onClick={() => removeColor(idx)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          type="color"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          className="w-20 h-10 cursor-pointer"
        />
        <Button type="button" onClick={addColor} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Add Color
        </Button>
      </div>
    </div>
  );
}
