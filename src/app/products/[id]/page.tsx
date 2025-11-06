import { notFound } from 'next/navigation';
import { products, products as allProducts } from '@/lib/data';
import { ProductDisplay } from '@/components/product/product-display';
import { ProductCard } from '@/components/product/product-card';

export async function generateStaticParams() {
  return products.map(product => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);
  if (!product) {
    return { title: 'Product Not Found' };
  }
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <>
      <div className="container py-12 md:py-20">
        <ProductDisplay product={product} />
      </div>

      {relatedProducts.length > 0 && (
         <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
