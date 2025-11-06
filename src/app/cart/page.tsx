import { CartItems } from '@/components/cart/cart-items';

export const metadata = {
  title: 'Shopping Cart',
  description: 'Review the items in your shopping cart.',
};

export default function CartPage() {
  return (
    <div className="container py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-headline font-bold text-center mb-12">
        Your Shopping Cart
      </h1>
      <CartItems />
    </div>
  );
}
