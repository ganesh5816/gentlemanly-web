/* eslint-disable @typescript-eslint/no-explicit-any */
// types/gift.ts
export interface Gift {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  category?: string;
  tags?: string[];
  availability?: boolean;
  rating?: number;
}

export interface EventData {
  key: string;
  name: string;
  date?: string;
  image: string;
}

export interface GiftState {
  eventGifts: Record<string, Gift[]>;
  selectedEvent: { key: string; name: string } | null;
  selectedGifts: Gift[];
}

// utils/giftHelpers.js
export const formatPrice = (price: string) => {
  const numericPrice = parseFloat(price.replace(/[$,]/g, ""));
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numericPrice);
};

export const calculateTotal = (gifts: any[]) => {
  return gifts.reduce((total: number, gift: { price: string }) => {
    const price = parseFloat(gift.price.replace(/[$,]/g, ""));
    return total + price;
  }, 0);
};

export const sortGiftsByPrice = (gifts: any, ascending = true) => {
  return [...gifts].sort((a, b) => {
    const priceA = parseFloat(a.price.replace(/[$,]/g, ""));
    const priceB = parseFloat(b.price.replace(/[$,]/g, ""));
    return ascending ? priceA - priceB : priceB - priceA;
  });
};

export const filterGiftsByPriceRange = (
  gifts: any[],
  minPrice: number,
  maxPrice: number
) => {
  return gifts.filter((gift: { price: string }) => {
    const price = parseFloat(gift.price.replace(/[$,]/g, ""));
    return price >= minPrice && price <= maxPrice;
  });
};

export const searchGifts = (gifts: any[], searchTerm: string) => {
  const term = searchTerm.toLowerCase();
  return gifts.filter(
    (gift: {
      name: string;
      description: string;
      category: string;
      tags: any[];
    }) =>
      gift.name.toLowerCase().includes(term) ||
      gift.description.toLowerCase().includes(term) ||
      gift.category?.toLowerCase().includes(term) ||
      gift.tags?.some((tag: string) => tag.toLowerCase().includes(term))
  );
};

// constants/eventGifts.js - Expanded gift data
export const GIFT_CATEGORIES = {
  JEWELRY: "jewelry",
  CLOTHING: "clothing",
  ACCESSORIES: "accessories",
  BEAUTY: "beauty",
  EXPERIENCES: "experiences",
  HOME: "home",
  TECH: "tech",
  BOOKS: "books",
  FLOWERS: "flowers",
  FOOD: "food",
};

export const DEFAULT_GIFT_SETS = {
  birthday: [
    {
      id: 1,
      name: "Ankle-cuff Heeled Sandals",
      price: "$5,250.00",
      image: "secondshoes",
      description:
        "Luxurious designer heeled sandals perfect for elegant evening occasions. Crafted with premium materials for ultimate sophistication.",
      category: GIFT_CATEGORIES.CLOTHING,
      tags: ["luxury", "shoes", "elegant", "designer"],
      availability: true,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Diamond Tennis Necklace",
      price: "$3,850.00",
      image: "necklace",
      description:
        "Stunning diamond tennis necklace that sparkles with every movement. Perfect for making her birthday unforgettable.",
      category: GIFT_CATEGORIES.JEWELRY,
      tags: ["diamonds", "jewelry", "luxury", "elegant"],
      availability: true,
      rating: 4.9,
    },
    {
      id: 3,
      name: "Designer Evening Dress",
      price: "$2,200.00",
      image: "dress",
      description:
        "Elegant evening dress crafted from the finest materials. Perfect for celebrating her special day in style.",
      category: GIFT_CATEGORIES.CLOTHING,
      tags: ["dress", "elegant", "designer", "special occasion"],
      availability: true,
      rating: 4.7,
    },
    {
      id: 4,
      name: "Luxury Spa Day Package",
      price: "$890.00",
      image: "spa",
      description:
        "Full day spa experience with massage, facial, and relaxation treatments. The perfect way to pamper her on her birthday.",
      category: GIFT_CATEGORIES.EXPERIENCES,
      tags: ["spa", "relaxation", "pampering", "experience"],
      availability: true,
      rating: 4.6,
    },
  ],
  anniversary: [
    {
      id: 5,
      name: "Luxury Swiss Watch",
      price: "$8,500.00",
      image: "watch",
      description:
        "Timeless Swiss-made watch symbolizing your eternal love. A perfect anniversary gift that will last forever.",
      category: GIFT_CATEGORIES.ACCESSORIES,
      tags: ["watch", "luxury", "swiss", "timeless"],
      availability: true,
      rating: 4.9,
    },
    {
      id: 6,
      name: "Romantic Perfume Set",
      price: "$450.00",
      image: "perfume",
      description:
        "Exquisite fragrance collection with romantic notes. Perfect for commemorating your special anniversary.",
      category: GIFT_CATEGORIES.BEAUTY,
      tags: ["perfume", "romantic", "fragrance", "luxury"],
      availability: true,
      rating: 4.5,
    },
    {
      id: 7,
      name: "Weekend Getaway Package",
      price: "$1,200.00",
      image: "getaway",
      description:
        "Romantic weekend getaway for two at a luxury resort. Create new memories to celebrate your love.",
      category: GIFT_CATEGORIES.EXPERIENCES,
      tags: ["getaway", "romantic", "luxury", "experience"],
      availability: true,
      rating: 4.8,
    },
  ],
  mothersday: [
    {
      id: 8,
      name: "Spa Luxury Gift Set",
      price: "$320.00",
      image: "spa-set",
      description:
        "Complete spa experience at home. Perfect for showing mom how much you care about her wellbeing.",
      category: GIFT_CATEGORIES.BEAUTY,
      tags: ["spa", "relaxation", "mom", "self-care"],
      availability: true,
      rating: 4.7,
    },
    {
      id: 9,
      name: "Cashmere Scarf",
      price: "$680.00",
      image: "scarf",
      description:
        "Ultra-soft cashmere scarf in her favorite color. A warm embrace she can wear anywhere.",
      category: GIFT_CATEGORIES.ACCESSORIES,
      tags: ["cashmere", "scarf", "luxury", "warm"],
      availability: true,
      rating: 4.6,
    },
    {
      id: 10,
      name: "Gourmet Cooking Class",
      price: "$275.00",
      image: "cooking",
      description:
        "Professional cooking class with a renowned chef. Perfect for the mom who loves to cook.",
      category: GIFT_CATEGORIES.EXPERIENCES,
      tags: ["cooking", "class", "experience", "learning"],
      availability: true,
      rating: 4.5,
    },
  ],
  apology: [
    {
      id: 11,
      name: "Sorry Flower Bouquet",
      price: "$150.00",
      image: "flowers",
      description:
        "Beautiful arrangement of her favorite flowers with a heartfelt apology note.",
      category: GIFT_CATEGORIES.FLOWERS,
      tags: ["flowers", "apology", "sorry", "beautiful"],
      availability: true,
      rating: 4.3,
    },
    {
      id: 12,
      name: "Chocolate Gift Box",
      price: "$85.00",
      image: "chocolate",
      description:
        "Premium chocolate collection to sweeten your apology and show you care.",
      category: GIFT_CATEGORIES.FOOD,
      tags: ["chocolate", "sweet", "apology", "premium"],
      availability: true,
      rating: 4.4,
    },
    {
      id: 13,
      name: "Handwritten Love Letter Kit",
      price: "$45.00",
      image: "letter-kit",
      description:
        "Beautiful stationery set to help you express your feelings with a heartfelt handwritten letter.",
      category: GIFT_CATEGORIES.ACCESSORIES,
      tags: ["letter", "stationery", "heartfelt", "romantic"],
      availability: true,
      rating: 4.2,
    },
  ],
  datenight: [
    {
      id: 14,
      name: "Wine & Dinner Package",
      price: "$250.00",
      image: "wine-dinner",
      description:
        "Romantic dinner package with wine pairing for an unforgettable date night experience.",
      category: GIFT_CATEGORIES.EXPERIENCES,
      tags: ["dinner", "wine", "romantic", "date"],
      availability: true,
      rating: 4.7,
    },
    {
      id: 15,
      name: "Theatre Tickets",
      price: "$180.00",
      image: "theatre",
      description:
        "Premium tickets to the hottest show in town for a magical date night together.",
      category: GIFT_CATEGORIES.EXPERIENCES,
      tags: ["theatre", "show", "entertainment", "date"],
      availability: true,
      rating: 4.6,
    },
    {
      id: 16,
      name: "Couples Massage Session",
      price: "$400.00",
      image: "couples-massage",
      description:
        "Relaxing couples massage session at a luxury spa. Perfect for reconnecting and unwinding together.",
      category: GIFT_CATEGORIES.EXPERIENCES,
      tags: ["massage", "couples", "relaxation", "spa"],
      availability: true,
      rating: 4.8,
    },
  ],
  justbecause: [
    {
      id: 17,
      name: "Surprise Gift Box",
      price: "$75.00",
      image: "gift-box",
      description:
        "Curated surprise box filled with little things that remind you of her smile.",
      category: GIFT_CATEGORIES.ACCESSORIES,
      tags: ["surprise", "curated", "thoughtful", "box"],
      availability: true,
      rating: 4.4,
    },
    {
      id: 18,
      name: "Personalized Photo Album",
      price: "$95.00",
      image: "photo-album",
      description:
        "Beautiful photo album filled with your favorite memories together.",
      category: GIFT_CATEGORIES.HOME,
      tags: ["photos", "memories", "personalized", "album"],
      availability: true,
      rating: 4.5,
    },
    {
      id: 19,
      name: "Coffee Subscription Box",
      price: "$120.00",
      image: "coffee-subscription",
      description:
        "Monthly delivery of premium coffee beans from around the world. Perfect for coffee lovers.",
      category: GIFT_CATEGORIES.FOOD,
      tags: ["coffee", "subscription", "premium", "monthly"],
      availability: true,
      rating: 4.3,
    },
  ],
};
