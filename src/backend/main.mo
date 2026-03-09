import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Existing UserProfile System
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // PlatformStats
  public type StatType = {
    #members;
    #nations;
    #solutions;
    #volunteers;
    #projects;
    #communities;
  };

  public type PlatformStats = {
    members : Nat;
    nations : Nat;
    solutions : Nat;
    volunteers : Nat;
    projects : Nat;
    communities : Nat;
  };

  var globalStats : PlatformStats = {
    members = 0;
    nations = 0;
    solutions = 0;
    volunteers = 0;
    projects = 0;
    communities = 0;
  };

  public shared ({ caller }) func updateStat(statType : StatType, value : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update stats");
    };

    globalStats := switch (statType) {
      case (#members) { { globalStats with members = value } };
      case (#nations) { { globalStats with nations = value } };
      case (#solutions) { { globalStats with solutions = value } };
      case (#volunteers) { { globalStats with volunteers = value } };
      case (#projects) { { globalStats with projects = value } };
      case (#communities) { { globalStats with communities = value } };
    };
  };

  public query ({ caller }) func getStats() : async PlatformStats {
    let memberCount = memberEntities.size();
    let nationCount = memberEntities.values().toArray().filter(func(member) { member.memberType == #nation }).size();
    let communityCount = memberEntities.values().toArray().filter(func(member) { member.memberType == #community }).size();

    {
      globalStats with
      members = memberCount;
      nations = nationCount;
      communities = communityCount;
    };
  };

  // Announcements
  public type Announcement = {
    id : Nat;
    title : Text;
    body : Text;
    date : Text;
    priority : Text;
  };

  let announcements = Map.empty<Nat, Announcement>();
  var nextAnnouncementId = 1;

  public shared ({ caller }) func addAnnouncement(title : Text, body : Text, date : Text, priority : Text) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add announcements");
    };

    let id = nextAnnouncementId;
    announcements.add(id, { id; title; body; date; priority });
    nextAnnouncementId += 1;
    id;
  };

  public shared ({ caller }) func removeAnnouncement(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can remove announcements");
    };

    switch (announcements.get(id)) {
      case (null) { Runtime.trap("Announcement not found") };
      case (?_) {
        announcements.remove(id);
      };
    };
  };

  public query ({ caller }) func getAllAnnouncements() : async [Announcement] {
    announcements.values().toArray();
  };

  // SupportedLanguages
  public type Language = {
    code : Text;
    name : Text;
    nativeName : Text;
  };

  let supportedLanguages = List.fromArray<Language>([
    { code = "en"; name = "English"; nativeName = "English" },
    { code = "es"; name = "Spanish"; nativeName = "Español" },
    { code = "fr"; name = "French"; nativeName = "Français" },
    { code = "ar"; name = "Arabic"; nativeName = "العربية" },
    { code = "zh"; name = "Chinese"; nativeName = "中文" },
    { code = "hi"; name = "Hindi"; nativeName = "हिन्दी" },
    { code = "pt"; name = "Portuguese"; nativeName = "Português" },
    { code = "ru"; name = "Russian"; nativeName = "русский" },
    { code = "sw"; name = "Swahili"; nativeName = "Kiswahili" },
    { code = "de"; name = "German"; nativeName = "Deutsch" },
  ]);

  public query ({ caller }) func getSupportedLanguages() : async [Language] {
    supportedLanguages.toArray();
  };

  // Member Registry
  public type MemberType = {
    #nation;
    #city;
    #ngo;
    #community;
    #individual;
    #corporate;
    #cooperative;
  };

  public type MemberStatus = {
    #active;
    #observer;
    #applicant;
    #suspended;
  };

  public type MemberRegion = {
    #africa;
    #asiaPacific;
    #europe;
    #latinAmerica;
    #middleEast;
    #northAmerica;
    #global;
  };

  public type MemberEntity = {
    id : Nat;
    name : Text;
    memberType : MemberType;
    region : MemberRegion;
    country : Text;
    description : Text;
    joinedDate : Text;
    status : MemberStatus;
    languages : [Text];
    website : Text;
    contactEmail : Text;
  };

  let memberEntities = Map.fromIter<Nat, MemberEntity>([
    (
      1,
      {
        id = 1;
        name = "Kenya National Council";
        memberType = #nation;
        region = #africa;
        country = "Kenya";
        description = "Leading national initiative for sustainable development in Kenya, focusing on water, agriculture, and healthcare.";
        joinedDate = "2022-06-15";
        status = #active;
        languages = ["English", "Swahili"];
        website = "https://kenya-council.org";
        contactEmail = "info@kenya-council.org";
      },
    ),
    (
      2,
      {
        id = 2;
        name = "Brazil Eco Society";
        memberType = #nation;
        region = #latinAmerica;
        country = "Brazil";
        description = "Non-profit organization dedicated to environmental conservation and social equity in Brazil.";
        joinedDate = "2021-09-20";
        status = #active;
        languages = ["Portuguese", "Spanish"];
        website = "https://brazil-eco.org";
        contactEmail = "contact@brazil-eco.org";
      },
    ),
    (
      3,
      {
        id = 3;
        name = "Norwegian Green Alliance";
        memberType = #nation;
        region = #europe;
        country = "Norway";
        description = "National alliance promoting green technology and sustainable practices in Norway.";
        joinedDate = "2022-03-10";
        status = #observer;
        languages = ["Norwegian", "English"];
        website = "https://norwegian-green.no";
        contactEmail = "hello@norwegian-green.no";
      },
    ),
    (
      4,
      {
        id = 4;
        name = "Indian Sustainable Cities Network";
        memberType = #nation;
        region = #asiaPacific;
        country = "India";
        description = "Network of Indian cities working together to implement sustainable urban solutions.";
        joinedDate = "2022-08-05";
        status = #active;
        languages = ["Hindi", "English"];
        website = "https://indiancities.org";
        contactEmail = "support@indiancities.org";
      },
    ),
    (
      5,
      {
        id = 5;
        name = "Japan Urban Innovation Hub";
        memberType = #city;
        region = #asiaPacific;
        country = "Japan";
        description = "Urban innovation hub focusing on smart city solutions and sustainable infrastructure in Japan.";
        joinedDate = "2023-11-01";
        status = #active;
        languages = ["Japanese", "English"];
        website = "https://japanurbanhub.jp";
        contactEmail = "contact@japanurbanhub.jp";
      },
    ),
    (
      6,
      {
        id = 6;
        name = "Global Health Alliance";
        memberType = #ngo;
        region = #global;
        country = "Multiple";
        description = "International NGO dedicated to improving healthcare access and outcomes worldwide.";
        joinedDate = "2020-05-15";
        status = #active;
        languages = ["English", "French"];
        website = "https://globalhealthalliance.org";
        contactEmail = "info@globalhealthalliance.org";
      },
    ),
    (
      7,
      {
        id = 7;
        name = "OpenEdu Foundation";
        memberType = #ngo;
        region = #global;
        country = "Multiple";
        description = "Educational foundation promoting open access to quality education globally.";
        joinedDate = "2019-12-10";
        status = #observer;
        languages = ["English", "Spanish"];
        website = "https://openedufoundation.org";
        contactEmail = "support@openedufoundation.org";
      },
    ),
    (
      8,
      {
        id = 8;
        name = "Pacific Island Climate Network";
        memberType = #community;
        region = #asiaPacific;
        country = "Multiple";
        description = "Community network focused on climate resilience and adaptation in Pacific Island nations.";
        joinedDate = "2021-04-02";
        status = #active;
        languages = ["English", "Local Pacific Languages"];
        website = "https://piclimate.org";
        contactEmail = "info@piclimate.org";
      },
    ),
    (
      9,
      {
        id = 9;
        name = "Amazon Indigenous Council";
        memberType = #community;
        region = #latinAmerica;
        country = "Brazil";
        description = "Council representing the interests of indigenous communities in the Amazon rainforest.";
        joinedDate = "2020-08-18";
        status = #active;
        languages = ["Portuguese", "Spanish", "Indigenous Languages"];
        website = "https://amazoncouncil.org";
        contactEmail = "contact@amazoncouncil.org";
      },
    ),
    (
      10,
      {
        id = 10;
        name = "GreenTech Global";
        memberType = #corporate;
        region = #northAmerica;
        country = "USA";
        description = "Leading tech company specializing in green technology solutions for global markets.";
        joinedDate = "2023-01-07";
        status = #active;
        languages = ["English", "Spanish", "German"];
        website = "https://greentechglobal.com";
        contactEmail = "info@greentechglobal.com";
      },
    ),
    (
      11,
      {
        id = 11;
        name = "FairTrade Farmers Union";
        memberType = #cooperative;
        region = #africa;
        country = "Multiple";
        description = "Multinational cooperative supporting sustainable farming and fair trade practices.";
        joinedDate = "2021-10-23";
        status = #active;
        languages = ["English", "Swahili", "French"];
        website = "https://fairtradefarmers.org";
        contactEmail = "support@fairtradefarmers.org";
      },
    ),
    (
      12,
      {
        id = 12;
        name = "Singapore Smart City Node";
        memberType = #city;
        region = #asiaPacific;
        country = "Singapore";
        description = "Smart city project in Singapore focusing on digital infrastructure and sustainability.";
        joinedDate = "2022-11-30";
        status = #active;
        languages = ["English", "Chinese", "Malay"];
        website = "https://sgsmartcity.sg";
        contactEmail = "contact@sgsmartcity.sg";
      },
    ),
  ].values());

  var nextMemberId = 13;

  public query ({ caller }) func getMembers() : async [MemberEntity] {
    memberEntities.values().toArray();
  };

  public query ({ caller }) func getMember(id : Nat) : async ?MemberEntity {
    memberEntities.get(id);
  };

  public shared ({ caller }) func addMember(
    name : Text,
    memberType : MemberType,
    region : MemberRegion,
    country : Text,
    description : Text,
    joinedDate : Text,
    status : MemberStatus,
    languages : [Text],
    website : Text,
    contactEmail : Text,
  ) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add members");
    };

    let id = nextMemberId;
    let newMember : MemberEntity = {
      id;
      name;
      memberType;
      region;
      country;
      description;
      joinedDate;
      status;
      languages;
      website;
      contactEmail;
    };

    memberEntities.add(id, newMember);
    nextMemberId += 1;
    id;
  };

  public shared ({ caller }) func updateMemberStatus(id : Nat, status : MemberStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update member status");
    };

    switch (memberEntities.get(id)) {
      case (null) { Runtime.trap("Member not found") };
      case (?member) {
        let updatedMember = { member with status };
        memberEntities.add(id, updatedMember);
      };
    };
  };

  public shared ({ caller }) func removeMember(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can remove members");
    };

    switch (memberEntities.get(id)) {
      case (null) { Runtime.trap("Member not found") };
      case (?_) {
        memberEntities.remove(id);
      };
    };
  };

  public shared ({ caller }) func applyForMembership(
    name : Text,
    memberType : MemberType,
    region : MemberRegion,
    country : Text,
    description : Text,
    languages : [Text],
    website : Text,
    contactEmail : Text,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can apply for membership");
    };

    let id = nextMemberId;
    let newMember : MemberEntity = {
      id;
      name;
      memberType;
      region;
      country;
      description;
      joinedDate = "2023-11-15";
      status = #applicant;
      languages;
      website;
      contactEmail;
    };

    memberEntities.add(id, newMember);
    nextMemberId += 1;
    id;
  };
};
