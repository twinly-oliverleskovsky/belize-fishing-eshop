export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  image: string;
  images: string[];
  badge: string | null;
  description: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  slug: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}
