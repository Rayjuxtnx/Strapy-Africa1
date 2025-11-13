
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import Autoplay from "embla-carousel-autoplay";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { categories, brands } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';
import { FilteredProductList } from '@/components/home/filtered-product-list';

export default function Home() {

  const heroSlides = [
    {
      id: 'hero-bg',
      title: 'Strapy Africa',
      subtitle: 'Discover unique collections, hand-picked for the discerning eye.',
      buttonText: 'Shop Now',
      buttonLink: '/collections/fashion',
    },
    {
      id: 'category-home',
      title: 'New Home Collection',
      subtitle: 'Elevate your space with our latest arrivals.',
      buttonText: 'Explore Home Goods',
      buttonLink: '/collections/home-goods',
    },
    {
      id: 'category-accessories',
      title: 'Accessorize Your Style',
      subtitle: 'Find the perfect finishing touch.',
      buttonText: 'View Accessories',
      buttonLink: '/collections/accessories',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section Carousel */}
      <section className="relative w-full">
        <Carousel
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
          className="w-full"
          opts={{ loop: true }}
        >
          <CarouselContent>
            {heroSlides.map((slide) => {
              const slideImage = PlaceHolderImages.find(img => img.id === slide.id);
              return (
                <CarouselItem key={slide.id}>
                  <div className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white">
                    {slideImage && (
                      <Image
                        src={slideImage.imageUrl}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        priority={slide.id === 'hero-bg'}
                        data-ai-hint={slideImage.imageHint}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="relative z-10 max-w-2xl px-4 flex flex-col items-center">
                      <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight">
                        {slide.title}
                      </h1>
                      <p className="mt-4 text-lg md:text-xl text-white/90">
                        {slide.subtitle}
                      </p>
                      <Button asChild size="lg" className="mt-8 bg-white text-black hover:bg-white/90">
                        <Link href={slide.buttonLink}>
                          {slide.buttonText} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
        </Carousel>
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
      
      {/* Featured Brands */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
           <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
            Featured Brands
          </h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
                Autoplay({
                  delay: 3000,
                  stopOnInteraction: false,
                })
              ]}
            className="w-full"
          >
            <CarouselContent>
              {brands.map((brand) => {
                const brandImage = PlaceHolderImages.find(img => img.id === brand.logoImageId);
                return (
                  <CarouselItem key={brand.id} className="basis-1/3 md:basis-1/4 lg:basis-1/6">
                    <div className="p-1">
                      {brandImage && (
                        <div className="relative h-20 flex items-center justify-center">
                          <Image
                            src={brandImage.imageUrl}
                            alt={brand.name}
                            width={120}
                            height={40}
                            className="object-contain"
                            data-ai-hint={brandImage.imageHint}
                          />
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container">
          <FilteredProductList />
        </div>
      </section>
    </div>
  );
}
