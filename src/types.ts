export interface Category {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  image: string;
  alt: string;
  count?: number;
  icon?: string;
}

export interface Vendor {
  id: string;
  name: string;
  city: string;
  type: 'local_florist' | 'home_grower'; // گلفروشی محلی یا پرورش‌دهنده خانگی
  rating: number;
  reviewsCount: number;
  avatar: string;
  badge: string;
  bio: string;
  deliveryMethods: ('snap' | 'tipax')[];
}

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  categorySlug: string;
  price: number; // in Tomans
  originalPrice?: number;
  image: string;
  gallery?: string[];
  description: string;
  careInstructions?: string;
  freshnessGuaranteeDays: number;
  vendor: Vendor;
  inStock: boolean;
  isBestseller?: boolean;
  isSeasonal?: boolean;
  tags: string[];
  size?: 'کوچک' | 'متوسط' | 'بزرگ' | 'لوکس';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  text: string;
  image: string;
  productName?: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  giftCardMessage?: string;
  giftCardRecipient?: string;
  giftCardTheme?: 'classic_gold' | 'emerald_luxury' | 'romantic_rose' | 'minimal_white';
  selectedVase?: boolean;
}

export interface SiteBrand {
  name_en: string;
  name_fa: string;
  tagline: string;
  email: string;
  phone: string;
  address?: string;
  social: {
    instagram: string;
    telegram: string;
    whatsapp?: string;
  };
}

export interface SiteHero {
  headline: string;
  subheadline: string;
  cta_primary: string;
  cta_secondary: string;
  image: string;
  alt: string;
}

export interface SiteValue {
  icon: string;
  title: string;
  text: string;
}

export interface SiteAbout {
  story: string;
  mission: string;
  vision: string;
  values: string[];
}

export interface SiteSellers {
  commission: string;
  settlement: string;
  delivery: string;
  steps: string[];
}

export interface SiteContent {
  site: {
    brand: SiteBrand;
    hero: SiteHero;
    values: SiteValue[];
    categories: {
      slug: string;
      name: string;
      image: string;
      alt: string;
    }[];
    testimonials: {
      name: string;
      rating: number;
      text: string;
      image: string;
    }[];
    about: SiteAbout;
    sellers: SiteSellers;
    seo: {
      meta_description: string;
      keywords: string;
    };
  };
}

export type ActiveTab = 'home' | 'marketplace' | 'sellers' | 'about' | 'blog' | 'contact' | 'admin';

export interface VendorApplication {
  fullName: string;
  shopName: string;
  type: 'local_florist' | 'home_grower';
  city: string;
  phone: string;
  email: string;
  experienceYears: number;
  instagramHandle?: string;
  note: string;
}
