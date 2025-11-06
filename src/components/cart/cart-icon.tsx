'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';

export function CartIcon() {
  const { itemCount } = useCart();

  return (
    <Button asChild variant="ghost" size="icon">
      <Link href="/cart" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {itemCount}
          </span>
        )}
        <span className="sr-only">Shopping Cart</span>
      </Link>
    </Button>
  );
}
