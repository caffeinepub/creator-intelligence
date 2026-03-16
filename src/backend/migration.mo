import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";

module {
  type OldCreatorProfile = {
    brandName : Text;
    instagramUrl : ?Text;
    tiktokUrl : ?Text;
    youtubeUrl : ?Text;
    twitterUrl : ?Text;
    newsletterUrl : ?Text;
    blogUrl : ?Text;
    podcastUrl : ?Text;
    brandColors : [Text];
    voiceCharacteristics : Text;
    contentPillars : [Text];
    about : Text;
  };

  type NewCreatorProfile = {
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

  type OldContent = {
    id : Text;
    url : Text;
    platform : OldPlatform;
    title : Text;
    description : Text;
    contentText : Text;
    metadata : Text;
  };

  type OldPlatform = {
    #instagram;
    #tiktok;
    #youtube;
    #twitter;
    #newsletter;
    #blog;
    #podcast;
  };

  type NewContent = {
    id : Text;
    url : Text;
    platform : NewPlatform;
    title : Text;
    description : Text;
    contentText : Text;
    metadata : Text;
  };

  type NewPlatform = {
    #instagram;
    #tiktok;
    #youtube;
    #twitter;
    #newsletter;
    #blog;
    #podcast;
    #facebook;
  };

  type OldActor = {
    profiles : Map.Map<Principal, List.List<OldCreatorProfile>>;
    contentLibrary : Map.Map<Text, OldContent>;
    profileInsights : Map.Map<Principal, List.List<{ insightText : Text; category : { #audiencePreference; #messagingPattern; #contentPerformance; #brandVoiceSignal; #strategicLearning }; timestamp : Int; sourceLink : Text }>>;
  };

  type NewActor = {
    profiles : Map.Map<Principal, List.List<NewCreatorProfile>>;
    contentLibrary : Map.Map<Text, NewContent>;
    profileInsights : Map.Map<Principal, List.List<{ insightText : Text; category : { #audiencePreference; #messagingPattern; #contentPerformance; #brandVoiceSignal; #strategicLearning }; timestamp : Int; sourceLink : Text }>>;
  };

  func convertOldPlatformToNew(oldPlatform : OldPlatform) : NewPlatform {
    switch (oldPlatform) {
      case (#instagram) { #instagram };
      case (#tiktok) { #tiktok };
      case (#youtube) { #youtube };
      case (#twitter) { #twitter };
      case (#newsletter) { #newsletter };
      case (#blog) { #blog };
      case (#podcast) { #podcast };
    };
  };

  func convertOldContentToNew(oldContent : OldContent) : NewContent {
    {
      oldContent with
      platform = convertOldPlatformToNew(oldContent.platform)
    };
  };

  public func run(old : OldActor) : NewActor {
    let newProfiles = old.profiles.map<Principal, List.List<OldCreatorProfile>, List.List<NewCreatorProfile>>(
      func(_principal, oldProfileList) {
        oldProfileList.map(
          func(oldProfile) {
            {
              brandName = oldProfile.brandName;
              instagramUrl = oldProfile.instagramUrl;
              tiktokUrl = oldProfile.tiktokUrl;
              youtubeUrl = oldProfile.youtubeUrl;
              twitterUrl = oldProfile.twitterUrl;
              newsletterUrl = oldProfile.newsletterUrl;
              blogUrl = oldProfile.blogUrl;
              podcastUrl = oldProfile.podcastUrl;
              facebookUrl = null;
              facebookContentType = null;
              brandColors = oldProfile.brandColors;
              voiceCharacteristics = oldProfile.voiceCharacteristics;
              contentPillars = oldProfile.contentPillars;
              about = oldProfile.about;
            };
          }
        );
      }
    );

    let newContentLibrary = old.contentLibrary.map<Text, OldContent, NewContent>(
      func(_id, oldContent) {
        convertOldContentToNew(oldContent);
      }
    );

    {
      old with
      profiles = newProfiles;
      contentLibrary = newContentLibrary;
    };
  };
};
