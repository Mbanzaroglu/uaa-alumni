// Type definitions for content.json

export interface Site {
  name: string;
  description: string;
  ustoreUrl: string;
}

export interface Navigation {
  home: string;
  news: string;
  membership: string;
  about: string;
}

export interface HomeContent {
  title: string;
  subtitle: string;
  description: string;
  cta: {
    primary: string;
    secondary: string;
  };
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

export interface NewsContent {
  title: string;
  subtitle: string;
  items: NewsItem[];
}

export interface MembershipContent {
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  cta: string;
}

export interface WhyMembershipSection {
  title: string;
  description: string;
  icon: string;
}

export interface WhyMembershipContent {
  title: string;
  subtitle: string;
  sections: WhyMembershipSection[];
}

export interface AboutContent {
  title: string;
  subtitle: string;
  description: string;
}

export interface AboutUsContent {
  title: string;
  content: string;
}

export interface MissionVision {
  mission: {
    title: string;
    content: string;
  };
  vision: {
    title: string;
    content: string;
  };
}

export interface AlumniHouseContent {
  title: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  features: string[];
}

export interface PrivacySection {
  title: string;
  content: string;
}

export interface PrivacyContent {
  title: string;
  lastUpdated: string;
  sections: PrivacySection[];
}

export interface ManagementMember {
  id: number;
  name: string;
  position: string;
  department: string;
  year: string;
  image: string;
}

export interface ManagementContent {
  title: string;
  subtitle: string;
  members: ManagementMember[];
}

export interface PastManagementPeriod {
  period: string;
  president: string;
  members: string[];
}

export interface PastManagementContent {
  title: string;
  subtitle: string;
  periods: PastManagementPeriod[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  items: FooterLink[];
}

export interface FooterSocial {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

export interface FooterContent {
  links: FooterLinkGroup[];
  social: FooterSocial;
  copyright: string;
}

export interface Content {
  site: Site;
  navigation: Navigation;
  home: HomeContent;
  news: NewsContent;
  membership: MembershipContent;
  whyMembership: WhyMembershipContent;
  about: AboutContent;
  aboutUs: AboutUsContent;
  missionVision: MissionVision;
  alumniHouse: AlumniHouseContent;
  privacy: PrivacyContent;
  management: ManagementContent;
  pastManagement: PastManagementContent;
  footer: FooterContent;
}

