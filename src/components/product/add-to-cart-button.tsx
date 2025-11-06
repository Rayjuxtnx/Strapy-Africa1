"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/lib/types";

type AddToCartButtonProps = {
  product: Product;
  quantity?: number;
  selectedOptions?: { [key: string]: string };
  className?: string;
  children?: React.ReactNode;
};

export function AddToCartButton({
  product,
  quantity = 1,
  selectedOptions,
  className,
  children,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedOptions);
  };

  return (
    <Button onClick={handleAddToCart} className={className}>
      {children || (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </>
      )}
    </Button>
  );
}
