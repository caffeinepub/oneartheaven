import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MemberEntity {
    id: bigint;
    region: MemberRegion;
    status: MemberStatus;
    country: string;
    name: string;
    languages: Array<string>;
    description: string;
    website: string;
    joinedDate: string;
    memberType: MemberType;
    contactEmail: string;
}
export interface Language {
    nativeName: string;
    code: string;
    name: string;
}
export interface Announcement {
    id: bigint;
    title: string;
    body: string;
    date: string;
    priority: string;
}
export interface PlatformStats {
    members: bigint;
    communities: bigint;
    projects: bigint;
    volunteers: bigint;
    nations: bigint;
    solutions: bigint;
}
export interface UserProfile {
    name: string;
}
export enum MemberRegion {
    europe = "europe",
    northAmerica = "northAmerica",
    latinAmerica = "latinAmerica",
    asiaPacific = "asiaPacific",
    middleEast = "middleEast",
    global = "global",
    africa = "africa"
}
export enum MemberStatus {
    applicant = "applicant",
    active = "active",
    observer = "observer",
    suspended = "suspended"
}
export enum MemberType {
    ngo = "ngo",
    nation = "nation",
    city = "city",
    community = "community",
    individual = "individual",
    cooperative = "cooperative",
    corporate = "corporate"
}
export enum StatType {
    members = "members",
    communities = "communities",
    projects = "projects",
    volunteers = "volunteers",
    nations = "nations",
    solutions = "solutions"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAnnouncement(title: string, body: string, date: string, priority: string): Promise<bigint>;
    addMember(name: string, memberType: MemberType, region: MemberRegion, country: string, description: string, joinedDate: string, status: MemberStatus, languages: Array<string>, website: string, contactEmail: string): Promise<bigint>;
    applyForMembership(name: string, memberType: MemberType, region: MemberRegion, country: string, description: string, languages: Array<string>, website: string, contactEmail: string): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllAnnouncements(): Promise<Array<Announcement>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMember(id: bigint): Promise<MemberEntity | null>;
    getMembers(): Promise<Array<MemberEntity>>;
    getStats(): Promise<PlatformStats>;
    getSupportedLanguages(): Promise<Array<Language>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    removeAnnouncement(id: bigint): Promise<void>;
    removeMember(id: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateMemberStatus(id: bigint, status: MemberStatus): Promise<void>;
    updateStat(statType: StatType, value: bigint): Promise<void>;
}
