
import type { Category, Product, Brand } from '@/lib/types';

export const categories: Category[] = [
  {
    slug: 'fashion',
    name: 'Fashion',
    image: 'category-fashion',
    description: 'Discover the latest trends and timeless pieces. Our fashion collection offers a wide range of clothing and accessories to elevate your style.',
  },
  {
    slug: 'home-goods',
    name: 'Home Goods',
    image: 'category-home',
    description: 'Transform your living space with our curated selection of home goods. From elegant decor to practical essentials, find everything you need to create a home you love.',
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    image: 'category-accessories',
    description: 'Complete your look with our stylish accessories. Explore a variety of items including jewelry, bags, and more to add the perfect finishing touch.',
  },
];

export const products: Product[] = [
  {
    id: 'prod_001',
    name: 'Artisan Leather Tote',
    shortDescription: 'Handcrafted genuine leather tote bag.',
    description: 'A beautifully handcrafted tote bag made from 100% genuine leather. Its spacious interior and classic design make it the perfect accessory for any occasion, combining elegance with practicality. Each bag is unique, showcasing the natural variations in the leather.',
    images: ['product-tote-1', 'product-tote-2', 'product-tote-3'],
    price: 189.99,
    category: 'fashion',
    tags: ['popular', 'new', 'popular-this-week'],
    options: {
      Color: ['Brown', 'Black', 'Tan'],
    },
  },
  {
    id: 'prod_002',
    name: 'Minimalist Wall Clock',
    shortDescription: 'Silent, non-ticking modern wall clock.',
    description: 'Enhance your home decor with this minimalist wall clock. Featuring a sleek, modern design and a silent, non-ticking quartz movement, it provides a peaceful environment. Made with a brushed metal frame and a clean, numberless face.',
    images: ['product-clock-1', 'product-clock-2'],
    price: 79.50,
    category: 'home-goods',
    tags: ['popular', 'on-offer'],
  },
  {
    id: 'prod_003',
    name: 'Silk Blend Scarf',
    shortDescription: 'A soft and luxurious printed silk scarf.',
    description: 'Wrap yourself in luxury with our elegant silk blend scarf. The lightweight fabric is incredibly soft to the touch, and the vibrant, artistic print adds a pop of color to any outfit. Perfect for year-round wear.',
    images: ['product-scarf-1', 'product-scarf-2'],
    price: 49.99,
    category: 'accessories',
    tags: ['new', 'on-offer'],
    options: {
      Pattern: ['Floral', 'Geometric', 'Abstract'],
    },
  },
  {
    id: 'prod_004',
    name: 'Ceramic Planter Set',
    shortDescription: 'Set of three modern ceramic plant pots.',
    description: 'Bring a touch of nature indoors with this set of three modern ceramic planters. With their clean lines and matte finish, they complement any decor style. Each set includes three different sizes, perfect for a variety of small to medium-sized plants. Includes drainage holes and optional plugs.',
    images: ['product-planter-1', 'product-planter-2'],
    price: 55.00,
    category: 'home-goods',
    tags: ['popular', 'popular-this-week'],
  },
  {
    id: 'prod_005',
    name: 'Sterling Silver Necklace',
    shortDescription: 'Delicate sterling silver chain with a pearl pendant.',
    description: 'A timeless piece of jewelry, this necklace features a delicate sterling silver chain and a single, luminous freshwater pearl pendant. It\'s the epitome of elegance and simplicity, perfect for both everyday wear and special occasions.',
    images: ['product-necklace-1', 'product-necklace-2'],
    price: 125.00,
    category: 'accessories',
    tags: ['on-offer'],
  },
  {
    id: 'prod_006',
    name: 'Linen Button-Down Shirt',
    shortDescription: 'A breathable and stylish linen shirt.',
    description: 'Stay cool and look sharp in our classic linen button-down shirt. Made from a high-quality linen blend, it\'s lightweight, breathable, and incredibly comfortable. A versatile wardrobe staple that can be dressed up or down.',
    images: ['product-shirt-1', 'product-shirt-2'],
    price: 85.00,
    category: 'fashion',
    tags: ['popular', 'new'],
    options: {
      Size: ['S', 'M', 'L', 'XL'],
      Color: ['White', 'Sky Blue', 'Khaki'],
    },
  },
];

export const brands: Brand[] = [
  { id: 'brand_001', name: 'Aura', logoImageId: 'brand-aura' },
  { id: 'brand_002', name: 'Stellar', logoImageId: 'brand-stellar' },
  { id: 'brand_003', name: 'Momentum', logoImageId: 'brand-momentum' },
  { id: 'brand_004', name: 'Vertex', logoImageId: 'brand-vertex' },
  { id: 'brand_005', name: 'Evolve', logoImageId: 'brand-evolve' },
  { id: 'brand_006', name: 'Legacy', logoImageId: 'brand-legacy' },
  { id: 'brand_007', name: 'Apex', logoImageId: 'brand-apex' },
  { id: 'brand_008', name: 'Nova', logoImageId: 'brand-nova' },
];
