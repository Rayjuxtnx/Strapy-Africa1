'use client';

import { useState } from 'react';
import Image from 'next/image';

import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/cart-context';
import { Minus, Plus } from 'lucide-react';

interface ProductDisplayProps {
  product: Product;
}

export function ProductDisplay({ product }: ProductDisplayProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>(() => {
    const defaultOptions: { [key: string]: string } = {};
    if (product.options) {
      for (const key in product.options) {
        defaultOptions[key] = product.options[key][0];
      }
    }
    return defaultOptions;
  });

  const productImages = product.images
    .map(id => PlaceHolderImages.find(img => img.id === id))
    .filter(Boolean);

  const handleOptionChange = (optionKey: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionKey]: value }));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedOptions);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <Carousel className="w-full">
        <CarouselContent>
          {productImages.map((image, index) => (
            <CarouselItem key={index}>
              <Card className="overflow-hidden">
                <CardContent className="p-0 aspect-square relative">
                  {image && (
                     <Image
                      src={image.imageUrl}
                      alt={`${product.name} - image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index === 0}
                      data-ai-hint={image.imageHint}
                    />
                  )}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-headline font-bold">{product.name}</h1>
          <p className="text-2xl lg:text-3xl font-bold mt-2">{formatPrice(product.price)}</p>
        </div>
        <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        
        {product.options && Object.keys(product.options).map(key => (
          <div key={key} className="space-y-2">
            <h3 className="font-semibold">{key}</h3>
            <RadioGroup
              value={selectedOptions[key]}
              onValueChange={(value) => handleOptionChange(key, value)}
              className="flex items-center gap-2 flex-wrap"
            >
              {product.options![key].map(option => (
                 <Label key={option} htmlFor={`${key}-${option}`} className="cursor-pointer">
                  <RadioGroupItem value={option} id={`${key}-${option}`} className="sr-only" />
                  <div className={`rounded-md border-2 px-4 py-2 hover:border-primary transition-colors ${selectedOptions[key] === option ? 'border-primary bg-primary/10' : 'border-border'}`}>{option}</div>
                </Label>
              ))}
            </RadioGroup>
          </div>
        ))}
        
        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-md">
            <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q-1))}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center">{quantity}</span>
            <Button variant="ghost" size="icon" onClick={() => setQuantity(q => q+1)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button size="lg" className="flex-grow" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
