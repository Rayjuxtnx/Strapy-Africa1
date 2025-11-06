import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { categories, products } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ProductCard } from '@/components/product/product-card';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bg');
  const popularProducts = products.filter(p => p.tags?.includes('popular')).slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-2xl px-4 flex flex-col items-center">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight">
            Curated Finds
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            Discover unique collections, hand-picked for the discerning eye.
          </p>
          <Button asChild size="lg" className="mt-8 bg-white text-black hover:bg-white/90">
            <Link href="/collections/fashion">
              Shop Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
            Explore Our Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map(category => {
              const categoryImage = PlaceHolderImages.find(img => img.id === category.image);
              return (
                <Link href={`/collections/${category.slug}`} key={category.slug} className="group">
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <CardHeader className="p-0">
                      <div className="relative h-64 w-full">
                        {categoryImage && (
                          <Image
                            src={categoryImage.imageUrl}
                            alt={category.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            data-ai-hint={categoryImage.imageHint}
                          />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">
                        {category.name}
                      </CardTitle>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
            Popular Right Now
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/collections/fashion">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
