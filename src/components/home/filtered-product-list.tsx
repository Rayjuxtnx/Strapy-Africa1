'use client';

import { useState } from 'react';
import { products } from '@/lib/data';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function FilteredProductList() {
  const [selectedTag, setSelectedTag] = useState<'popular' | 'new' | 'all'>('all');

  const allProducts = products;
  
  const filteredProducts = selectedTag === 'all'
    ? allProducts.slice(0, 4)
    : allProducts.filter(p => p.tags?.includes(selectedTag)).slice(0, 4);

  const availableTags: { slug: 'all' | 'popular' | 'new', name: string }[] = [
    { slug: 'all', name: 'All' },
    { slug: 'popular', name: 'Popular' },
    { slug: 'new', name: 'New Arrivals' }
  ];

  return (
    <>
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-6">
        Featured Products
      </h2>
      <div className="flex justify-center gap-2 mb-12 flex-wrap">
        {availableTags.map(tag => (
          <Button
            key={tag.slug}
            variant={selectedTag === tag.slug ? 'default' : 'outline'}
            onClick={() => setSelectedTag(tag.slug)}
            className={cn('rounded-full')}
          >
            {tag.name}
          </Button>
        ))}
      </div>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
         <div className="text-center py-16 border rounded-lg">
            <h2 className="text-2xl font-bold">No Products Found</h2>
            <p className="text-muted-foreground mt-2">
                There are currently no products matching your selection.
            </p>
        </div>
      )}
      <div className="text-center mt-12">
        <Button asChild variant="outline" size="lg">
          <Link href="/collections/fashion">View All Products</Link>
        </Button>
      </div>
    </>
  );
}
