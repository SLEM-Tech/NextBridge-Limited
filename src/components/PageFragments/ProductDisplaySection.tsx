"use client";

import React, { useEffect, useState, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  FiShare2,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiCheckCircle,
} from "react-icons/fi";
import { useCart } from "react-use-cart";
import Picture from "../picture/Picture";
import SocialMediaShare from "../common/SocialMediaShare";
import { useProduct } from "../lib/woocommerce";
import RelatedProductsSection from "./RelatedProductsSection";
import { Skeleton } from "@heroui/react";
import Drawer from "rc-drawer";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import Image from "next/image";
import ProductTable from "../Tables/ProductTable";

interface ProductDisplaySectionProps {
  FormatedId?: string;
}

const ProductDisplaySection = ({ FormatedId }: ProductDisplaySectionProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const { data: product, isLoading } = useProduct(FormatedId);
  const Product: ProductType = product;

  const pathname = usePathname();
  const { addItem, removeItem, updateItem, getItem } = useCart();

  const [baseUrl, setBaseUrl] = useState("");
  const [isLoadingMainImage, setIsLoadingMainImage] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const onOpenCart = () => setIsCartOpen(true);
  const onCloseCart = () => setIsCartOpen(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(`${window.location.protocol}//${window.location.host}`);
    }
  }, []);

  // Calculate Discount
  const discount = useMemo(() => {
    if (!Product?.regular_price || !Product?.price) return 0;
    const reg = parseInt(Product.regular_price);
    const sale = parseInt(Product.price);
    if (reg <= sale) return 0;
    return Math.round(((reg - sale) / reg) * 100);
  }, [Product]);

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Skeleton className="aspect-square w-full rounded-3xl bg-surface" />
        <div className="space-y-6">
          <Skeleton className="h-10 w-3/4 rounded-lg bg-surface" />
          <Skeleton className="h-6 w-1/4 rounded-lg bg-surface" />
          <Skeleton className="h-20 w-full rounded-lg bg-surface" />
          <Skeleton className="h-12 w-1/3 rounded-full bg-surface" />
        </div>
      </section>
    );
  }

  if (!Product) return null;

  const ID = Product.id.toString();
  const price = parseInt(Product.price);
  const cartItem = getItem(ID);
  const qty = cartItem?.quantity || 0;

  const increase = () =>
    addItem({
      id: ID,
      name: Product.name,
      price,
      quantity: qty + 1,
      image: Product.images[0]?.src,
    });
  const decrease = () =>
    qty <= 1 ? removeItem(ID) : updateItem(ID, { quantity: qty - 1 });

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-3 lg:py-12">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 text-[13px] text-ink-soft mb-8 font-medium">
          <Link href="/" className="hover:text-primary-100 transition-colors">
            Home
          </Link>
          {Product.categories?.map((cat) => (
            <React.Fragment key={cat.id}>
              <span className="text-white/20">/</span>
              <span
                className="hover:text-primary-100 transition-colors cursor-pointer"
                dangerouslySetInnerHTML={{ __html: cat.name }}
              />
            </React.Fragment>
          ))}
          <span className="text-white/20">/</span>
          <span
            className="text-white/80 truncate"
            dangerouslySetInnerHTML={{ __html: Product.name }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* --- LEFT: IMAGE GALLERY --- */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-32">
            <div className="relative aspect-square bg-surface rounded-md lg:rounded-[2rem] overflow-hidden border border-brand-border group">
              {discount > 0 && (
                <div className="absolute top-6 left-6 z-10 bg-primary-100 text-brand-ink px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-lg">
                  SAVE {discount}%
                </div>
              )}

              <Image
                src={Product.images[selectedImage]?.src}
                alt={Product.name}
                className={`w-full h-full object-contain p-2 lg:p-8 transition-all duration-700 ${isLoadingMainImage ? "scale-95 opacity-50" : "scale-100 opacity-100"}`}
                width={1000}
                height={1000}
                priority
                onLoad={() => setIsLoadingMainImage(false)}
              />
            </div>

            {Product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto no-scrollbar p-2">
                {Product.images.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(index)}
                    className={`relative flex-shrink-0 size-20 rounded-2xl border-2 transition-all overflow-hidden bg-surface p-1 ${
                      selectedImage === index ?
                        "border-primary-100 scale-105"
                      : "border-brand-border hover:border-primary-100/60"
                    }`}>
                    <Picture
                      src={img.src}
                      alt=""
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- RIGHT: PRODUCT INFO --- */}
          <div className="flex flex-col">
            <div className="space-y-3 border-b border-brand-border pb-6">
              <span
                dangerouslySetInnerHTML={{
                  __html: Product.categories[0]?.name,
                }}
                className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-100"
              />
              <h1 className="font-serif text-3xl lg:text-5xl font-bold text-white leading-tight">
                {Product.name}
              </h1>

              <div className="flex items-end gap-4 pt-3">
                <div className="flex flex-col">
                  {Product.regular_price &&
                    parseInt(Product.regular_price) > price && (
                      <span className="text-sm text-ink-soft line-through font-medium">
                        <FormatMoney2 value={parseInt(Product.regular_price)} />
                      </span>
                    )}
                  <span className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                    <FormatMoney2 value={price} />
                  </span>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-[10px] h-fit font-semibold uppercase tracking-wide border ${
                    Product.stock_status === "instock" ?
                      "bg-success/10 text-success border-success/30"
                    : "bg-danger/10 text-danger border-danger/30"
                  }`}>
                  {Product.stock_status === "instock" ?
                    "In Stock"
                  : "Out of Stock"}
                </div>
              </div>
            </div>

            {/* Attributes Section */}
            {Product.attributes.length > 0 && (
              <div className="py-6 space-y-4 border-b border-brand-border">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
                  Specifications
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {Product.attributes.map((attr) => (
                    <div
                      key={attr.id}
                      className="flex flex-col p-3 bg-surface rounded-xl border border-brand-border">
                      <span className="text-[10px] font-semibold text-ink-soft uppercase tracking-wide">
                        {attr.name}
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {attr.options.join(", ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Area */}
            <div className="py-8 space-y-6">
              <div className="flex flex-wrap items-end gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
                    Quantity
                  </span>
                  <div className="flex items-center bg-surface rounded-2xl p-1 border border-brand-border">
                    <button
                      onClick={decrease}
                      className="size-10 flex items-center justify-center bg-white/5 text-white rounded-xl hover:text-danger transition-colors active:scale-90">
                      <AiOutlineMinus />
                    </button>
                    <span className="px-6 text-base font-bold text-white min-w-[3rem] text-center">
                      {qty}
                    </span>
                    <button
                      onClick={increase}
                      className="size-10 flex items-center justify-center bg-primary-100 text-brand-ink rounded-xl hover:bg-brand-navy transition-all active:scale-90">
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>

                <div className="flex-1 min-w-[200px]">
                  <button
                    onClick={onOpenCart}
                    disabled={Product.stock_status !== "instock"}
                    className="w-full bg-primary-100 text-brand-ink py-4 rounded-2xl font-semibold uppercase text-xs tracking-[0.22em] hover:bg-brand-navy transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
                    {qty > 0 ? "View in Cart" : "Add to Cart"}
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 py-6 border-t border-brand-border">
                {[
                  { icon: <FiShield />, label: "Secure Payment" },
                  { icon: <FiTruck />, label: "Fast Shipping" },
                  { icon: <FiRefreshCw />, label: "Easy Returns" },
                ].map((b) => (
                  <div
                    key={b.label}
                    className="flex flex-col items-center text-center gap-2">
                    <span className="text-primary-100 text-xl">{b.icon}</span>
                    <span className="text-[9px] font-semibold uppercase tracking-wide text-ink-soft">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description & Specs Tab */}
        <div className="mt-2 lg:mt-20 w-full overflow-x-auto">
          <div className="flex gap-8 border-b border-brand-border mb-8">
            <button className="pb-4 border-b-2 border-primary-100 text-primary-100 text-xs lg:text-sm font-semibold uppercase tracking-[0.22em]">
              Description
            </button>
            <button className="pb-4 text-ink-soft text-xs lg:text-sm font-semibold uppercase tracking-[0.22em] hover:text-white transition-colors">
              Reviews ({Product.rating_count})
            </button>
          </div>
          <div
            className="text-base text-ink-soft leading-relaxed max-w-4xl prose prose-invert"
            dangerouslySetInnerHTML={{ __html: Product.description }}
          />
        </div>

        <RelatedProductsSection
          productCategoryId={Product.categories[0]?.id.toString()}
        />
      </section>

      <Drawer
        open={isCartOpen}
        onClose={onCloseCart}
        placement="right"
        width={
          typeof window !== "undefined" && window.innerWidth > 768 ?
            600
          : "100%"
        }
        maskClosable={true}>
        <ProductTable onClose={onCloseCart} />
      </Drawer>
    </>
  );
};

export default ProductDisplaySection;
