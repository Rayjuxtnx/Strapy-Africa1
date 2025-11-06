import Image from 'next/image';
import Link from 'next/link';

import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AddToCartButton } from './add-to-cart-button';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const productImage = PlaceHolderImages.find(img => img.id === product.images[0]);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="group">
          <div className="relative h-64 w-full">
            {productImage && (
              <Image
                src={productImage.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                data-ai-hint={productImage.imageHint}
              />
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`} className="group">
          <CardTitle className="text-lg font-body font-bold leading-snug group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground mt-1">{product.shortDescription}</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-lg font-bold">{formatPrice(product.price)}</p>
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  );
}
