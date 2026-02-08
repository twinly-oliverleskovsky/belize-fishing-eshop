import { Product } from "@/types";

const placeholder = "/placeholder-product.svg";

export const products: Product[] = [
  {
    id: "1",
    name: "Deep Sea Fishing Rod Pro",
    slug: "deep-sea-fishing-rod-pro",
    category: "Rods",
    price: 189.99,
    image: placeholder,
    images: [placeholder, placeholder, placeholder],
    badge: "Best Seller",
    description:
      "Professional-grade deep sea rod built for the demanding waters of the Caribbean. Features reinforced carbon fiber construction and ergonomic cork grip for all-day comfort during your biggest catches.",
    rating: 4.8,
    reviewCount: 24,
    reviews: [
      { id: "r1", author: "Captain Mike", rating: 5, date: "2025-12-15", comment: "Best rod I've ever used in Belizean waters. Handles big game like a dream." },
      { id: "r2", author: "Sarah T.", rating: 5, date: "2025-11-20", comment: "Worth every penny. The carbon fiber construction is incredibly light yet strong." },
      { id: "r3", author: "David R.", rating: 4, date: "2025-10-08", comment: "Great rod overall. Cork grip is very comfortable for long sessions." },
    ],
  },
  {
    id: "2",
    name: "Belize Reef Spinner Rod",
    slug: "belize-reef-spinner-rod",
    category: "Rods",
    price: 129.99,
    image: placeholder,
    images: [placeholder, placeholder, placeholder],
    badge: null,
    description:
      "Lightweight spinning rod perfect for reef fishing around Belize's barrier reef. Sensitive tip for detecting subtle bites with enough backbone to handle snappers and groupers.",
    rating: 4.5,
    reviewCount: 18,
    reviews: [
      { id: "r4", author: "James L.", rating: 5, date: "2025-11-10", comment: "Perfect for reef fishing. Very sensitive tip — you feel every nibble." },
      { id: "r5", author: "Maria C.", rating: 4, date: "2025-09-25", comment: "Lightweight and easy to handle. Great for beginners too." },
    ],
  },
  {
    id: "3",
    name: "Ocean Master 5000 Reel",
    slug: "ocean-master-5000-reel",
    category: "Reels",
    price: 249.99,
    image: placeholder,
    images: [placeholder, placeholder, placeholder],
    badge: "New",
    description:
      "Saltwater-resistant spinning reel with 5000-series capacity. Sealed drag system and corrosion-proof bearings designed for tropical saltwater conditions.",
    rating: 4.9,
    reviewCount: 31,
    reviews: [
      { id: "r6", author: "Tom H.", rating: 5, date: "2025-12-01", comment: "Incredible reel. Drag system is butter smooth and handles big fish effortlessly." },
      { id: "r7", author: "Lisa M.", rating: 5, date: "2025-11-15", comment: "No corrosion after months of saltwater use. Absolutely worth the price." },
      { id: "r8", author: "Robert K.", rating: 5, date: "2025-10-20", comment: "Best reel in this price range for saltwater fishing." },
    ],
  },
  {
    id: "4",
    name: "Coral Bay Spinning Reel",
    slug: "coral-bay-spinning-reel",
    category: "Reels",
    price: 89.99,
    image: placeholder,
    images: [placeholder, placeholder, placeholder],
    badge: null,
    description:
      "Reliable mid-range reel perfect for beginners and casual anglers. Smooth drag system and lightweight graphite body.",
    rating: 4.2,
    reviewCount: 12,
    reviews: [
      { id: "r9", author: "Karen P.", rating: 4, date: "2025-10-05", comment: "Great starter reel. Smooth operation and affordable price." },
      { id: "r10", author: "Andy S.", rating: 4, date: "2025-09-18", comment: "Good value for money. Light and comfortable to use all day." },
    ],
  },
  {
    id: "5",
    name: "Tropical Minnow Lure Set",
    slug: "tropical-minnow-lure-set",
    category: "Lures",
    price: 34.99,
    image: placeholder,
    images: [placeholder, placeholder, placeholder],
    badge: "Popular",
    description:
      "Set of 6 hand-painted minnow lures in tropical fish patterns. Designed to mimic local baitfish species found in Belizean waters.",
    rating: 4.6,
    reviewCount: 42,
    reviews: [
      { id: "r11", author: "Chris W.", rating: 5, date: "2025-12-10", comment: "Caught more fish with these than any other lures. The colors are amazing." },
      { id: "r12", author: "Diana F.", rating: 4, date: "2025-11-28", comment: "Beautiful hand-painted details. Fish love these in the reef shallows." },
      { id: "r13", author: "Peter G.", rating: 5, date: "2025-10-15", comment: "Outstanding lure set. Each one is a work of art and deadly effective." },
    ],
  },
  {
    id: "6",
    name: "Barracuda Spoon Lure",
    slug: "barracuda-spoon-lure",
    category: "Lures",
    price: 12.99,
    image: placeholder,
    images: [placeholder, placeholder, placeholder],
    badge: null,
    description:
      "High-flash spoon lure designed specifically for barracuda and kingfish. Reflective finish creates irresistible flash in crystal-clear Caribbean waters.",
    rating: 4.3,
    reviewCount: 15,
    reviews: [
      { id: "r14", author: "Steve B.", rating: 4, date: "2025-11-05", comment: "Works great for barracuda. The flash really attracts them." },
      { id: "r15", author: "Jen A.", rating: 5, date: "2025-10-22", comment: "Landed a massive kingfish on my first try with this lure!" },
    ],
  },
  {
    id: "7",
    name: "Professional Tackle Box",
    slug: "professional-tackle-box",
    category: "Accessories",
    price: 59.99,
    image: placeholder,
    images: [placeholder, placeholder, placeholder],
    badge: null,
    description:
      "Waterproof tackle box with adjustable compartments. UV-resistant plastic won't crack in tropical sun. Includes rust-free latches and comfortable carry handle.",
    rating: 4.4,
    reviewCount: 20,
    reviews: [
      { id: "r16", author: "Mark T.", rating: 5, date: "2025-12-02", comment: "Super durable and well-organized. Survived a boat trip in rough seas." },
      { id: "r17", author: "Amy R.", rating: 4, date: "2025-11-10", comment: "Nice size, adjustable compartments are really handy. Waterproof seal works well." },
    ],
  },
  {
    id: "8",
    name: "Fishing Line 300m Monofilament",
    slug: "fishing-line-300m",
    category: "Accessories",
    price: 19.99,
    image: placeholder,
    images: [placeholder, placeholder, placeholder],
    badge: null,
    description:
      "Premium monofilament line with excellent knot strength and low memory. Virtually invisible underwater for more strikes.",
    rating: 4.1,
    reviewCount: 28,
    reviews: [
      { id: "r18", author: "Carlos M.", rating: 4, date: "2025-11-30", comment: "Good quality line. Low memory and great knot strength." },
      { id: "r19", author: "Rachel W.", rating: 4, date: "2025-10-15", comment: "Nearly invisible in clear Caribbean water. Fish don't see it coming." },
    ],
  },
  {
    id: "9",
    name: "Kayak Fishing Package",
    slug: "kayak-fishing-package",
    category: "Boats",
    price: 899.99,
    image: placeholder,
    images: [placeholder, placeholder, placeholder],
    badge: "Premium",
    description:
      "Complete fishing kayak setup including rod holders, anchor system, and storage compartments. Stable sit-on-top design perfect for calm Caribbean waters.",
    rating: 4.7,
    reviewCount: 9,
    reviews: [
      { id: "r20", author: "Kevin L.", rating: 5, date: "2025-12-08", comment: "Incredible kayak for fishing. Very stable and all accessories included." },
      { id: "r21", author: "Nicole D.", rating: 5, date: "2025-11-22", comment: "Best purchase I've made. Explore the reef at your own pace." },
      { id: "r22", author: "Paul J.", rating: 4, date: "2025-10-30", comment: "Great stability and rod holders are perfectly positioned." },
    ],
  },
  {
    id: "10",
    name: "Inflatable Boat 3m",
    slug: "inflatable-boat-3m",
    category: "Boats",
    price: 499.99,
    image: placeholder,
    images: [placeholder, placeholder, placeholder],
    badge: null,
    description:
      "Durable inflatable boat rated for 3 passengers. Heavy-duty PVC construction with aluminum oars and foot pump included.",
    rating: 4.0,
    reviewCount: 7,
    reviews: [
      { id: "r23", author: "Brian H.", rating: 4, date: "2025-11-18", comment: "Solid inflatable boat. Easy to set up and surprisingly sturdy." },
      { id: "r24", author: "Emily S.", rating: 4, date: "2025-10-05", comment: "Great for calm waters. PVC holds up well in the sun." },
    ],
  },
];

export const categories = ["All", "Rods", "Reels", "Lures", "Accessories", "Boats"];
