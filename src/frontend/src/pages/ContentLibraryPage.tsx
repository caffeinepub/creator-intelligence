import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Library, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Platform } from "../backend";
import ContentCard from "../components/ContentCard";
import ContentFilter from "../components/ContentFilter";
import LinkAnalysisInput from "../components/LinkAnalysisInput";
import LinkAnalysisResults from "../components/LinkAnalysisResults";
import { useLinkAnalysis } from "../hooks/useLinkAnalysis";
import {
  useAddProfileInsight,
  useAllContent,
  useProfile,
} from "../hooks/useQueries";

export default function ContentLibraryPage() {
  const { data: content, isLoading } = useAllContent();
  const { data: profile } = useProfile();
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | "all">(
    "all",
  );
  const [isResultsDialogOpen, setIsResultsDialogOpen] = useState(false);
  const [analyzedUrl, setAnalyzedUrl] = useState("");

  const { analyzeLink, isAnalyzing, result } = useLinkAnalysis();

  const filteredContent =
    selectedPlatform === "all"
      ? content || []
      : (content || []).filter((c) => c.platform === selectedPlatform);

  const handleAnalyzeLink = async (url: string) => {
    if (!profile) {
      toast.error("Please create a profile first");
      return;
    }
    setAnalyzedUrl(url);
    await analyzeLink(url, profile);
    setIsResultsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2
          className="w-8 h-8 animate-spin text-primary"
          data-ocid="content.loading_state"
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-4xl text-foreground tracking-tight">
          Content Library
        </h1>
        <div className="h-1 w-16 bg-accent rounded-full mt-2" />
        <p className="text-muted-foreground mt-2">
          All your content, analyzed and organized
        </p>
      </div>

      {/* Link Analysis */}
      <Card className="border-l-4 border-l-primary shadow-sm">
        <CardHeader>
          <CardTitle className="font-display font-bold text-lg">
            Analyze a Link
          </CardTitle>
          <CardDescription>
            Drop in any content URL for instant brand-aligned analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LinkAnalysisInput
            onSubmit={handleAnalyzeLink}
            isLoading={isAnalyzing}
          />
        </CardContent>
      </Card>

      {/* Filters */}
      <ContentFilter
        selected={selectedPlatform}
        onSelect={setSelectedPlatform}
      />

      {/* Content Grid */}
      {filteredContent.length === 0 ? (
        <Card>
          <CardContent
            className="py-12 text-center"
            data-ocid="content.empty_state"
          >
            <Library className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground font-medium">
              No content yet — analyze a link above to get started
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContent.map((item, index) => (
            <div key={item.id} data-ocid={`content.item.${index + 1}`}>
              <ContentCard content={item} />
            </div>
          ))}
        </div>
      )}

      {/* Results Dialog */}
      <Dialog open={isResultsDialogOpen} onOpenChange={setIsResultsDialogOpen}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          data-ocid="content.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-xl">
              Link Analysis Results
            </DialogTitle>
            <DialogDescription>AI analysis of {analyzedUrl}</DialogDescription>
          </DialogHeader>
          {result && <LinkAnalysisResults result={result} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
