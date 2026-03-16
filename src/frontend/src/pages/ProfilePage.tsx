import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  Bot,
  Edit,
  Globe,
  Instagram,
  Loader2,
  Mic,
  PlusCircle,
  Send,
  Sparkles,
  Youtube,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiTiktok, SiX } from "react-icons/si";
import { toast } from "sonner";
import { ProfileForm } from "../components/ProfileForm";
import ProfileInsightsList from "../components/ProfileInsightsList";
import { useActiveProfile } from "../hooks/useActiveProfile";
import {
  useCreateProfile,
  useProfile,
  useProfileInsights,
  useProfiles,
} from "../hooks/useQueries";
import {
  type BrandAnalysisResult,
  analyzeBrand,
  loadCachedAnalysis,
} from "../utils/brandAnalyzer";
import {
  type ChatMessage,
  generateChatResponse,
} from "../utils/profileChatbot";

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  instagram: <Instagram className="w-4 h-4" />,
  tiktok: <SiTiktok className="w-4 h-4" />,
  youtube: <Youtube className="w-4 h-4" />,
  twitter: <SiX className="w-4 h-4" />,
  newsletter: <BookOpen className="w-4 h-4" />,
  blog: <Globe className="w-4 h-4" />,
  podcast: <Mic className="w-4 h-4" />,
};

function getPlatformLabel(key: string): string {
  const labels: Record<string, string> = {
    instagram: "Instagram",
    tiktok: "TikTok",
    youtube: "YouTube",
    twitter: "Twitter / X",
    newsletter: "Newsletter",
    blog: "Blog",
    podcast: "Podcast",
  };
  return labels[key] || key;
}

function getProfileLinks(
  profile: NonNullable<ReturnType<typeof useProfile>["data"]>,
) {
  return [
    { key: "instagram", url: profile.instagramUrl },
    { key: "tiktok", url: profile.tiktokUrl },
    { key: "youtube", url: profile.youtubeUrl },
    { key: "twitter", url: profile.twitterUrl },
    { key: "newsletter", url: profile.newsletterUrl },
    { key: "blog", url: profile.blogUrl },
    { key: "podcast", url: profile.podcastUrl },
  ].filter((l) => l.url) as { key: string; url: string }[];
}

function RenderMarkdown({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, lineIdx) => {
        const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
        return (
          // biome-ignore lint/suspicious/noArrayIndexKey: static text split
          <span key={lineIdx}>
            {parts.map((part, i) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                // biome-ignore lint/suspicious/noArrayIndexKey: static split
                return <strong key={i}>{part.slice(2, -2)}</strong>;
              }
              if (part.startsWith("*") && part.endsWith("*")) {
                // biome-ignore lint/suspicious/noArrayIndexKey: static split
                return <em key={i}>{part.slice(1, -1)}</em>;
              }
              // biome-ignore lint/suspicious/noArrayIndexKey: static split
              return <span key={i}>{part}</span>;
            })}
            {lineIdx < lines.length - 1 && <br />}
          </span>
        );
      })}
    </>
  );
}

function ChatBubble({ msg }: { msg: ChatMessage }) {
  return (
    <div
      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
          msg.role === "user"
            ? "bg-primary text-primary-foreground font-medium"
            : "bg-muted text-foreground"
        }`}
      >
        <RenderMarkdown text={msg.content} />
      </div>
    </div>
  );
}

export function ProfilePage() {
  const { setActiveProfileIndex } = useActiveProfile();
  const { data: profiles, isLoading: profilesLoading } = useProfiles();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: insights } = useProfileInsights();
  const createProfile = useCreateProfile();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [brandAnalysis, setBrandAnalysis] =
    useState<BrandAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (profile) {
      const cached = loadCachedAnalysis(0);
      if (cached) setBrandAnalysis(cached);
    }
  }, [profile]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: chatEndRef is stable
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleCreateProfile = async (
    data: Parameters<typeof createProfile.mutateAsync>[0],
  ) => {
    try {
      await createProfile.mutateAsync(data);
      setActiveProfileIndex(0);
      setIsCreateDialogOpen(false);
      toast.success("Profile created!");
    } catch {
      toast.error("Failed to create profile");
    }
  };

  const handleAnalyzeBrand = async () => {
    if (!profile) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeBrand(profile, 0);
      setBrandAnalysis(result);
      toast.success("Brand analysis complete!");
    } catch {
      toast.error("Analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendChat = async () => {
    if (!chatInput.trim() || !profile) return;
    const userMessage: ChatMessage = { role: "user", content: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);
    const currentInput = chatInput;
    setChatInput("");
    setIsChatLoading(true);
    try {
      const response = await generateChatResponse(currentInput, profile, [
        ...chatMessages,
        userMessage,
      ]);
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    } catch {
      toast.error("Chat failed");
    } finally {
      setIsChatLoading(false);
    }
  };

  if (profilesLoading || profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile && (!profiles || profiles.length === 0)) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-16">
          <h1 className="font-display font-extrabold text-5xl text-foreground mb-4">
            Your Creator Hub
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Set up your first profile to get started
          </p>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="font-display font-bold"
                data-ocid="profile.open_modal_button"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Create Your Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-display font-extrabold text-2xl">
                  Create Profile
                </DialogTitle>
                <DialogDescription>
                  Set up your creator profile
                </DialogDescription>
              </DialogHeader>
              <ProfileForm
                onSubmit={handleCreateProfile}
                isLoading={createProfile.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }

  const profileLinks = profile ? getProfileLinks(profile) : [];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-extrabold text-4xl text-foreground tracking-tight">
            {profile?.brandName || "Your Profile"}
          </h1>
          <div className="h-1 w-16 bg-primary rounded-full mt-2" />
        </div>
        <div className="flex gap-2">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                data-ocid="profile.edit_button"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-display font-extrabold text-2xl">
                  Edit Profile
                </DialogTitle>
                <DialogDescription>
                  Update your creator profile
                </DialogDescription>
              </DialogHeader>
              {profile && (
                <ProfileForm
                  initialData={{
                    brandName: profile.brandName,
                    instagramUrl: profile.instagramUrl,
                    tiktokUrl: profile.tiktokUrl,
                    youtubeUrl: profile.youtubeUrl,
                    twitterUrl: profile.twitterUrl,
                    newsletterUrl: profile.newsletterUrl,
                    blogUrl: profile.blogUrl,
                    podcastUrl: profile.podcastUrl,
                    brandColors: profile.brandColors,
                    voiceCharacteristics: profile.voiceCharacteristics,
                    contentPillars: profile.contentPillars,
                    about: profile.about,
                  }}
                  onSubmit={async (_data) => {
                    setIsEditDialogOpen(false);
                  }}
                  isLoading={false}
                />
              )}
            </DialogContent>
          </Dialog>

          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                data-ocid="profile.open_modal_button"
              >
                <PlusCircle className="w-4 h-4 mr-1" />
                New Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-display font-extrabold text-2xl">
                  Create Profile
                </DialogTitle>
                <DialogDescription>
                  Set up a new creator profile
                </DialogDescription>
              </DialogHeader>
              <ProfileForm
                onSubmit={handleCreateProfile}
                isLoading={createProfile.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Profile Card */}
      <Card className="border-l-4 border-l-primary shadow-sm">
        <CardHeader>
          <CardTitle className="font-display font-bold text-xl">
            Profile Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {profileLinks.length > 0 && (
            <div>
              <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
                Connected Platforms
              </h3>
              <div className="flex flex-wrap gap-2">
                {profileLinks.map((link) => (
                  <a
                    key={link.key}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1.5 px-3 py-1.5 cursor-pointer hover:bg-secondary/80 transition-colors"
                    >
                      {PLATFORM_ICONS[link.key]}
                      {getPlatformLabel(link.key)}
                    </Badge>
                  </a>
                ))}
              </div>
            </div>
          )}

          {(profile?.contentPillars || []).length > 0 && (
            <div>
              <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
                Content Pillars
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile?.contentPillars.map((pillar) => (
                  <Badge
                    key={pillar}
                    className="bg-accent text-accent-foreground font-medium"
                  >
                    {pillar}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {profile?.about && (
            <div>
              <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">
                About
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {profile.about}
              </p>
            </div>
          )}

          <Separator />
          <Button
            onClick={handleAnalyzeBrand}
            disabled={isAnalyzing}
            className="w-full font-display font-bold"
            data-ocid="profile.primary_button"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Brand...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze Brand
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Brand Analysis Results */}
      {brandAnalysis && (
        <Card className="border-l-4 border-l-secondary shadow-sm">
          <CardHeader>
            <CardTitle className="font-display font-bold text-xl flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-secondary" />
              Brand Analysis
            </CardTitle>
            <CardDescription>AI-powered brand intelligence</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <h3 className="font-display font-bold text-base mb-2 text-primary">
                Brand Identity
              </h3>
              <p className="text-sm leading-relaxed">
                {brandAnalysis.brandIdentity}
              </p>
            </div>

            <div>
              <h3 className="font-display font-bold text-base mb-3">
                Content Pillars
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {brandAnalysis.contentPillars.map((pillar, i) => (
                  <div
                    key={pillar}
                    className="flex items-start gap-2 p-3 rounded-lg bg-secondary/10 border border-secondary/20"
                  >
                    <span className="font-display font-extrabold text-secondary text-sm mt-0.5">
                      {i + 1}.
                    </span>
                    <span className="text-sm">{pillar}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display font-bold text-base mb-3">
                Voice & Tone
              </h3>
              <p className="text-sm leading-relaxed text-foreground/80 p-3 bg-muted rounded-lg">
                {brandAnalysis.voiceCharacteristics}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Insights */}
      {insights && insights.length > 0 && (
        <Card className="border-l-4 border-l-accent shadow-sm">
          <CardHeader>
            <CardTitle className="font-display font-bold text-xl">
              Profile Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileInsightsList insights={insights} />
          </CardContent>
        </Card>
      )}

      {/* AI Chatbot */}
      <Card className="border-l-4 border-l-primary shadow-sm">
        <CardHeader>
          <CardTitle className="font-display font-bold text-xl flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            Brand AI Assistant
          </CardTitle>
          <CardDescription>
            Ask for content ideas, strategy advice, or brand analysis. Press
            Enter to send, Shift+Enter for a new line.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64 mb-4 pr-2">
            {chatMessages.length === 0 ? (
              <div
                className="flex items-center justify-center h-full text-muted-foreground text-sm"
                data-ocid="profile.empty_state"
              >
                <p>Start a conversation about your brand strategy...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {chatMessages.map((msg, idx) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: sequential chat list
                  <ChatBubble key={idx} msg={msg} />
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-xl px-4 py-2.5">
                      <Loader2
                        className="w-4 h-4 animate-spin text-muted-foreground"
                        data-ocid="profile.loading_state"
                      />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            )}
          </ScrollArea>
          <div className="flex gap-2 items-end">
            <Textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendChat();
                }
              }}
              placeholder="Ask about content ideas, strategy..."
              disabled={isChatLoading}
              rows={2}
              className="resize-none flex-1 min-h-[44px] max-h-32"
              data-ocid="profile.textarea"
            />
            <Button
              onClick={handleSendChat}
              disabled={isChatLoading || !chatInput.trim()}
              size="icon"
              className="shrink-0"
              data-ocid="profile.submit_button"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
