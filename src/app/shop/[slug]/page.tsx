import type { Metadata } from "next";
import { products } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | Belize Fishing",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Belize Fishing`,
      description: product.description,
      url: `/shop/${product.slug}`,
      type: "website",
      images: product.image.startsWith("http")
        ? [{ url: product.image, width: 800, height: 600, alt: product.name }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
