import { CheckoutForm } from '@/components/checkout/checkout-form';

export const metadata = {
  title: 'Checkout',
  description: 'Complete your purchase.',
};

export default function CheckoutPage() {
  return (
    <div className="container py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-headline font-bold text-center mb-12">
        Checkout
      </h1>
      <CheckoutForm />
    </div>
  );
}
