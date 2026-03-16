import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Migration "migration";

(with migration = Migration.run)
actor {
  type CreatorProfile = {
    brandName : Text;
    instagramUrl : ?Text;
    tiktokUrl : ?Text;
    youtubeUrl : ?Text;
    twitterUrl : ?Text;
    newsletterUrl : ?Text;
    blogUrl : ?Text;
    podcastUrl : ?Text;
    facebookUrl : ?Text;
    facebookContentType : ?Text;
    brandColors : [Text];
    voiceCharacteristics : Text;
    contentPillars : [Text];
    about : Text;
  };

  let profiles = Map.empty<Principal, List.List<CreatorProfile>>();

  type Content = {
    id : Text;
    url : Text;
    platform : Platform;
    title : Text;
    description : Text;
    contentText : Text;
    metadata : Text;
  };

  type Platform = {
    #instagram;
    #tiktok;
    #youtube;
    #twitter;
    #newsletter;
    #blog;
    #podcast;
    #facebook;
  };

  let contentLibrary = Map.empty<Text, Content>();

  public shared ({ caller }) func createProfile(
    brandName : Text,
    instagramUrl : ?Text,
    tiktokUrl : ?Text,
    youtubeUrl : ?Text,
    twitterUrl : ?Text,
    newsletterUrl : ?Text,
    blogUrl : ?Text,
    podcastUrl : ?Text,
    facebookUrl : ?Text,
    facebookContentType : ?Text,
    brandColors : [Text],
    voiceCharacteristics : Text,
    contentPillars : [Text],
    about : Text,
  ) : async () {
    let profile : CreatorProfile = {
      brandName;
      instagramUrl;
      tiktokUrl;
      youtubeUrl;
      twitterUrl;
      newsletterUrl;
      blogUrl;
      podcastUrl;
      facebookUrl;
      facebookContentType;
      brandColors;
      voiceCharacteristics;
      contentPillars;
      about;
    };
    let existingProfiles = switch (profiles.get(caller)) {
      case (null) { List.empty<CreatorProfile>() };
      case (?list) { list };
    };
    existingProfiles.add(profile);
    profiles.add(caller, existingProfiles);
  };

  public query ({ caller }) func getProfiles() : async [CreatorProfile] {
    switch (profiles.get(caller)) {
      case (null) { [] };
      case (?list) { list.toArray() };
    };
  };

  public shared ({ caller }) func addContent(
    url : Text,
    platform : Platform,
    title : Text,
    description : Text,
    contentText : Text,
    metadata : Text,
  ) : async Text {
    let id = caller.toText();
    let content : Content = {
      id;
      url;
      platform;
      title;
      description;
      contentText;
      metadata;
    };
    contentLibrary.add(id, content);
    id;
  };

  public query ({ caller }) func getContent(id : Text) : async Content {
    switch (contentLibrary.get(id)) {
      case (null) { Runtime.trap("Content not found") };
      case (?content) { content };
    };
  };

  public query ({ caller }) func getAllContent() : async [Content] {
    contentLibrary.values().toArray();
  };

  // New types for link analysis and profile insights
  type LinkAnalysis = {
    sourceType : SourceType;
    coreContentData : CoreContentData;
    profileAlignment : ProfileAlignment;
    strategicInterpretation : StrategicInterpretation;
    actionableRecommendations : [ActionableRecommendation];
    profileInsight : ?ProfileInsight;
  };

  type SourceType = {
    #socialMediaPost;
    #socialMediaProfile;
    #websitePage;
    #article;
    #analyticsScreenshot;
    #portfolioWork;
    #videoReel;
    #competitorContent;
    #inspirationContent;
    #unknown;
  };

  type CoreContentData = {
    mainTopic : Text;
    message : Text;
    audience : Text;
    emotionalTone : Text;
    visualSignals : Text;
    valueProposition : Text;
    callToAction : Text;
    engagementIndicators : Text;
  };

  type ProfileAlignment = {
    brandVoiceAlignment : Bool;
    audienceAlignment : Bool;
    goalAlignment : Bool;
    consistencyWithPastContent : Bool;
    differentiationOpportunities : Text;
  };

  type StrategicInterpretation = {
    contentEffectiveness : Text;
    audienceInsight : Text;
    trendPattern : Text;
    positioningImpact : Text;
  };

  type ActionableRecommendation = {
    recommendationText : Text;
    recommendationType : RecommendationType;
  };

  type RecommendationType = {
    #contentIdea;
    #messagingAdjustment;
    #positioningOpportunity;
    #followUpConcept;
    #strategyImprovement;
  };

  public type ProfileInsight = {
    insightText : Text;
    category : InsightCategory;
    timestamp : Int;
    sourceLink : Text;
  };

  type InsightCategory = {
    #audiencePreference;
    #messagingPattern;
    #contentPerformance;
    #brandVoiceSignal;
    #strategicLearning;
  };

  let profileInsights = Map.empty<Principal, List.List<ProfileInsight>>();

  public shared ({ caller }) func addProfileInsight(insight : ProfileInsight) : async () {
    let existingInsights = switch (profileInsights.get(caller)) {
      case (null) { List.empty<ProfileInsight>() };
      case (?list) { list };
    };
    existingInsights.add(insight);
    profileInsights.add(caller, existingInsights);
  };

  public query ({ caller }) func getProfileInsights() : async [ProfileInsight] {
    switch (profileInsights.get(caller)) {
      case (null) { [] };
      case (?list) { list.toArray() };
    };
  };
};
