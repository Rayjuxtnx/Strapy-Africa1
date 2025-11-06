import { notFound } from 'next/navigation';
import { categories, products } from '@/lib/data';
import { ProductCard } from '@/components/product/product-card';

export async function generateStaticParams() {
  return categories.map(category => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = categories.find(c => c.slug === params.slug);
  if (!category) {
    return { title: 'Collection Not Found' };
  }
  return {
    title: `${category.name} Collection`,
    description: category.description,
  };
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const category = categories.find(c => c.slug === params.slug);
  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(p => p.category === params.slug);

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">{category.name}</h1>
        <p className="mt-4 text-muted-foreground">{category.description}</p>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categoryProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border rounded-lg">
          <h2 className="text-2xl font-bold">No Products Found</h2>
          <p className="text-muted-foreground mt-2">
            There are currently no products available in this collection.
          </p>
        </div>
      )}
    </div>
  );
}
