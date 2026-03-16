import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "lucide-react";
import { useActiveProfile } from "../hooks/useActiveProfile";
import { useProfiles } from "../hooks/useQueries";

export default function ProfileSwitcher() {
  const { data: profiles } = useProfiles();
  const { activeProfileIndex, setActiveProfileIndex } = useActiveProfile();

  if (!profiles || profiles.length === 0) {
    return null;
  }

  if (profiles.length === 1) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-secondary/10 rounded-lg">
        <User className="w-4 h-4 text-secondary-dark" />
        <span className="text-sm font-medium text-secondary-dark">
          {profiles[0].brandName}
        </span>
      </div>
    );
  }

  return (
    <Select
      value={activeProfileIndex.toString()}
      onValueChange={(value) =>
        setActiveProfileIndex(Number.parseInt(value, 10))
      }
    >
      <SelectTrigger className="w-[200px] bg-white border-secondary/20">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-secondary-dark" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {profiles.map((profile, index) => (
          <SelectItem key={profile.brandName} value={index.toString()}>
            {profile.brandName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
