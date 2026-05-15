export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in cents (USD)
  category: string;
  inStock: boolean;
  image?: string; // path relative to /public
  stripePriceId?: string; // populated after running: npm run seed-stripe
}

export const products: Product[] = [
  { id: "1", name: "Half Dome", description: "Yosemite's iconic sheer granite face captured in stunning topographic detail, from the valley floor to the 8,839 ft summit.", price: 4900, category: "Yosemite", inStock: true, image: "/images/half-dome.png" },
  { id: "2", name: "Angels Landing", description: "Zion's dramatic fin of rock with its knife-edge ridge and sheer 1,500 ft drops rendered in precise 3D relief.", price: 4900, category: "Zion", inStock: true, image: "/images/angels-landing.png" },
  { id: "3", name: "Matterhorn", description: "The iconic pyramid peak of the Alps with dramatic ridgelines and glacial detail across all four faces.", price: 5900, category: "Alps", inStock: true, image: "/images/matterhorn.png" },
  { id: "4", name: "Kilimanjaro", description: "Africa's highest peak in fine detail, including the Uhuru summit crater and the sweeping volcanic plateau.", price: 5400, category: "Africa", inStock: true, image: "/images/kilimanjaro.png" },
  { id: "5", name: "Mt. Whitney", description: "The highest summit in the contiguous US at 14,505 ft, with its granite pinnacles and the classic trail route.", price: 4900, category: "Sierra Nevada", inStock: true, image: "/images/mt-whitney.png" },
  { id: "6", name: "Mt. Rinjani", description: "Indonesia's second-highest volcano on Lombok, with its dramatic caldera lake and towering inner cone rendered in striking detail.", price: 5400, category: "Indonesia", inStock: true, image: "/images/mt-rinjani.png" },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
