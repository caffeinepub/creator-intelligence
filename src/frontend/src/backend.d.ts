import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProfileInsight {
    insightText: string;
    sourceLink: string;
    timestamp: bigint;
    category: InsightCategory;
}
export interface CreatorProfile {
    contentPillars: Array<string>;
    about: string;
    blogUrl?: string;
    voiceCharacteristics: string;
    podcastUrl?: string;
    twitterUrl?: string;
    instagramUrl?: string;
    newsletterUrl?: string;
    facebookContentType?: string;
    brandColors: Array<string>;
    brandName: string;
    youtubeUrl?: string;
    facebookUrl?: string;
    tiktokUrl?: string;
}
export interface Content {
    id: string;
    url: string;
    title: string;
    contentText: string;
    metadata: string;
    description: string;
    platform: Platform;
}
export enum InsightCategory {
    contentPerformance = "contentPerformance",
    strategicLearning = "strategicLearning",
    audiencePreference = "audiencePreference",
    messagingPattern = "messagingPattern",
    brandVoiceSignal = "brandVoiceSignal"
}
export enum Platform {
    tiktok = "tiktok",
    twitter = "twitter",
    blog = "blog",
    instagram = "instagram",
    podcast = "podcast",
    facebook = "facebook",
    youtube = "youtube",
    newsletter = "newsletter"
}
export interface backendInterface {
    addContent(url: string, platform: Platform, title: string, description: string, contentText: string, metadata: string): Promise<string>;
    addProfileInsight(insight: ProfileInsight): Promise<void>;
    createProfile(brandName: string, instagramUrl: string | null, tiktokUrl: string | null, youtubeUrl: string | null, twitterUrl: string | null, newsletterUrl: string | null, blogUrl: string | null, podcastUrl: string | null, facebookUrl: string | null, facebookContentType: string | null, brandColors: Array<string>, voiceCharacteristics: string, contentPillars: Array<string>, about: string): Promise<void>;
    getAllContent(): Promise<Array<Content>>;
    getContent(id: string): Promise<Content>;
    getProfileInsights(): Promise<Array<ProfileInsight>>;
    getProfiles(): Promise<Array<CreatorProfile>>;
}
