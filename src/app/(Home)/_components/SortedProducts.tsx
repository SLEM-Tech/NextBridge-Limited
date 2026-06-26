"use client";
import { convertToSlug } from "@constants";
import Picture from "@src/components/picture/Picture";
import { FormatMoney2 } from "@src/components/Reusables/FormatMoney";
import { useCategories, WooCommerce } from "@src/components/lib/woocommerce";
import GlobalLoader from "@src/components/modal/GlobalLoader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useCart } from "react-use-cart";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

export const Loader = () => (
  <>
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="animate-pulse rounded-xl border border-brand-border bg-surface p-3">
        <div className="aspect-square bg-white/5 rounded-lg mb-4" />
        <div className="h-3 bg-white/5 rounded w-1/3 mb-3" />
        <div className="flex justify-between items-center">
          <div className="h-5 bg-white/5 rounded w-1/3" />
          <div className="h-9 bg-white/5 rounded w-1/4" />
        </div>
      </div>
    ))}
  </>
);

const SortedProducts = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [saleProducts, setSaleProducts] = useState<ProductType[]>([]);
  const [popularProducts, setPopularProducts] = useState<ProductType[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { addItem, getItem } = useCart();

  // Fetch sale products (on_sale) and popular products (by popularity)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const [saleRes, popularRes] = await Promise.all([
          WooCommerce.get(
            "products?on_sale=true&per_page=20&orderby=date&order=desc",
          ),
          WooCommerce.get("products?orderby=popularity&per_page=20&order=desc"),
        ]);
        if (saleRes?.data) setSaleProducts([...saleRes.data].sort(() => 0.5 - Math.random()));
        if (popularRes?.data) setPopularProducts([...popularRes.data].sort(() => 0.5 - Math.random()));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Shared product card renderer — dark editorial card
  const renderProductCard = (product: ProductType) => {
    const price = parseInt(product?.price || "0");
    const slugDesc = convertToSlug(product?.name);
    const ID = product?.id?.toString();
    const cartItem = getItem(ID);
    const category =
      (product as any)?.categories?.[0]?.name ?? "NextBridge Limited";

    return (
      <div
        key={product.id}
        className="group flex flex-col rounded-xl border border-brand-border bg-surface p-3 transition-colors duration-300 hover:border-primary-100">
        {/* Image Container */}
        <Link
          href={`/home-item/product/${slugDesc}-${product.id}`}
          className="relative aspect-square rounded-lg bg-deep overflow-hidden flex items-center justify-center">
          <button
            onClick={(e) => e.preventDefault()}
            className="absolute top-3 right-3 z-10 bg-white/10 backdrop-blur-sm text-white rounded-full size-9 flex items-center justify-center hover:bg-primary-100 hover:text-brand-ink transition cursor-pointer">
            <FiHeart className="text-base" />
          </button>
          <Picture
            src={product?.images?.[0]?.src}
            alt={product?.name}
            className="object-contain w-[82%] h-[82%] group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Product Info */}
        <div className="px-1 pt-5 pb-1">
          <p className="text-[10px] uppercase tracking-[0.22em] text-ink-soft mb-2 line-clamp-1">
            {category}
          </p>
          <Link
            href={`/home-item/product/${slugDesc}-${product.id}`}
            className="block font-serif text-lg text-white line-clamp-1 hover:text-primary-100 transition-colors"
            dangerouslySetInnerHTML={{ __html: product?.name }}
          />

          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-xl font-bold text-white whitespace-nowrap">
              {price ?
                <FormatMoney2 value={price} />
              : "N/A"}
            </span>

            {price > 0 && (
              <button
                onClick={() =>
                  addItem({
                    id: ID,
                    name: product?.name,
                    price,
                    quantity: 1,
                    image: product?.images?.[0]?.src,
                  })
                }
                className="inline-flex items-center gap-2 bg-primary-100 text-brand-ink text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-brand-navy transition-colors cursor-pointer">
                <FiShoppingCart className="text-sm" />
                {cartItem ? "Added ✓" : "Add To Cart"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const SectionHeader = ({
    title,
    blurb,
  }: {
    title: string;
    blurb: string;
  }) => (
    <div className="flex items-end justify-between gap-6 border-b border-brand-border pb-6 mb-10">
      <div className="max-w-xl">
        <h2 className="font-serif italic text-3xl sm:text-4xl font-bold text-primary-100">
          {title}
        </h2>
        <p className="mt-3 text-sm text-ink-soft leading-relaxed">{blurb}</p>
      </div>
      <Link
        href="/category"
        className="shrink-0 text-xs font-semibold uppercase tracking-[0.22em] text-primary-100 hover:text-brand-navy transition-colors">
        View All
      </Link>
    </div>
  );

  return (
    <>
      {/* ─── Popular Products ─── */}
      <div className="max-w-[1256px] mx-auto px-4 py-10 sm:py-16">
        <SectionHeader
          title="Popular Products"
          blurb="A curated selection of instruments that bridge the gap between the utilitarian and the transcendental."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {isLoading ?
            <Loader />
          : popularProducts.slice(0, 6).map(renderProductCard)}
        </div>
      </div>

      {/* ─── Sale Products ─── */}
      <div className="max-w-[1256px] mx-auto px-4 py-10 sm:py-16">
        <SectionHeader
          title="Limited Time Deals"
          blurb="Engineered essentials, offered for a season — selected for those who appreciate considered design."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {isLoading ?
            <Loader />
          : saleProducts.slice(0, 6).map(renderProductCard)}
        </div>
      </div>

      <GlobalLoader isPending={isPending} />
    </>
  );
};

export default SortedProducts;
