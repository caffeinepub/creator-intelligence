import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type {
  Content,
  CreatorProfile,
  InsightCategory,
  ProfileInsight,
} from "../backend";
import { useActiveProfile } from "./useActiveProfile";
import { useActor } from "./useActor";

export function useProfiles() {
  const { actor, isFetching } = useActor();

  return useQuery<CreatorProfile[]>({
    queryKey: ["profiles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProfiles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProfile() {
  const { data: profiles } = useProfiles();
  const { activeProfileIndex, setActiveProfile } = useActiveProfile();

  const profile =
    profiles && profiles.length > 0
      ? profiles[activeProfileIndex] || profiles[0]
      : undefined;

  useEffect(() => {
    setActiveProfile(profile || null);
  }, [profile, setActiveProfile]);

  return {
    data: profile,
    isLoading: false,
    error: null,
  };
}

export function useCreateProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      brandName: string;
      instagramUrl: string | null;
      tiktokUrl: string | null;
      youtubeUrl: string | null;
      twitterUrl: string | null;
      newsletterUrl: string | null;
      blogUrl: string | null;
      podcastUrl: string | null;
      facebookUrl: string | null;
      facebookContentType: string | null;
      brandColors: string[];
      voiceCharacteristics: string;
      contentPillars: string[];
      about: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.createProfile(
        data.brandName,
        data.instagramUrl,
        data.tiktokUrl,
        data.youtubeUrl,
        data.twitterUrl,
        data.newsletterUrl,
        data.blogUrl,
        data.podcastUrl,
        data.facebookUrl,
        data.facebookContentType,
        data.brandColors,
        data.voiceCharacteristics,
        data.contentPillars,
        data.about,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
}

export function useAllContent() {
  const { actor, isFetching } = useActor();

  return useQuery<Content[]>({
    queryKey: ["content"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useContent(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Content>({
    queryKey: ["content", id],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.getContent(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useProfileInsights() {
  const { actor, isFetching } = useActor();

  return useQuery<ProfileInsight[]>({
    queryKey: ["profileInsights"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProfileInsights();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddProfileInsight() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (insight: {
      insightText: string;
      category: InsightCategory;
      sourceLink: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");

      const profileInsight: ProfileInsight = {
        insightText: insight.insightText,
        category: insight.category,
        timestamp: BigInt(Date.now() * 1000000), // Convert to nanoseconds
        sourceLink: insight.sourceLink,
      };

      return actor.addProfileInsight(profileInsight);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileInsights"] });
    },
  });
}
