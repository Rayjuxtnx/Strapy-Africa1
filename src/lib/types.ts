
export type Product = {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  images: string[];
  price: number;
  category: string;
  tags?: ('popular' | 'new' | 'popular-this-week' | 'on-offer')[];
  options?: {
    [key: string]: string[];
  };
};

export type Category = {
  slug: string;
  name: string;
  image: string;
  description: string;
};

export type CartItem = {
  id: string; // A unique ID for the cart item, e.g., `${productId}-${size}-${color}`
  product: Product;
  quantity: number;
  selectedOptions?: {
    [key: string]: string;
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  billingAddress?: string;
  avatarUrl?: string;
};

export type Brand = {
  id: string;
  name: string;
  logoImageId: string;
}
