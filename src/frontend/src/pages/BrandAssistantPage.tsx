import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, Loader2 } from "lucide-react";
import { useState } from "react";
import { DraftGenerator } from "../components/DraftGenerator";
import ProductIdeasSection from "../components/ProductIdeasSection";
import { useAllContent, useProfile } from "../hooks/useQueries";
import { generateProductIdeas } from "../utils/brandSuggestionEngine";

export default function BrandAssistantPage() {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: content, isLoading: contentLoading } = useAllContent();
  const [_selectedDraftType, _setSelectedDraftType] = useState<
    "bio" | "pitch" | "mediakit" | null
  >(null);

  const isLoading = profileLoading || contentLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2
          className="w-8 h-8 animate-spin text-primary"
          data-ocid="brand.loading_state"
        />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-display font-bold">
              No Profile Found
            </CardTitle>
            <CardDescription>
              Please create a profile first to use the brand assistant
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const productIdeas = generateProductIdeas(
    content || [],
    profile?.contentPillars || [],
    profile?.voiceCharacteristics || "",
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-4xl text-foreground tracking-tight">
          Brand & Monetization
        </h1>
        <div className="h-1 w-16 bg-secondary rounded-full mt-2" />
        <p className="text-muted-foreground mt-2">
          Strategic opportunities and positioning for{" "}
          <span className="font-semibold text-foreground">
            {profile?.brandName || "your brand"}
          </span>
        </p>
      </div>

      <ProductIdeasSection ideas={productIdeas} />

      <DraftGenerator profile={profile} />
    </div>
  );
}
