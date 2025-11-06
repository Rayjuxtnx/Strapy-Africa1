'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function CartItems() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div className="text-center py-16 border rounded-lg">
        <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
        <p className="text-muted-foreground mt-2">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button asChild className="mt-6">
          <Link href="/collections/fashion">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Cart ({itemCount} items)</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y">
              {cartItems.map(item => {
                const productImage = PlaceHolderImages.find(img => img.id === item.product.images[0]);
                return (
                  <li key={item.id} className="flex gap-4 p-6">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                      {productImage && (
                        <Image
                          src={productImage.imageUrl}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          data-ai-hint={productImage.imageHint}
                        />
                      )}
                    </div>
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <Link href={`/products/${item.product.id}`} className="font-bold hover:text-primary transition-colors">{item.product.name}</Link>
                        <p className="text-sm text-muted-foreground">{formatPrice(item.product.price)}</p>
                        {item.selectedOptions && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {Object.entries(item.selectedOptions).map(([key, value]) => `${key}: ${value}`).join(' / ')}
                          </div>
                        )}
                      </div>
                       <div className="flex items-center border rounded-md w-fit mt-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                       <p className="font-bold">{formatPrice(item.product.price * item.quantity)}</p>
                       <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                          <span className="sr-only">Remove item</span>
                       </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild size="lg" className="w-full">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
