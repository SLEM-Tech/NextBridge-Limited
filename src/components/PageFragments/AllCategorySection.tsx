"use client";
import React, { useEffect, useRef, useState } from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import Picture from "../picture/Picture";
import { useCategories, WooCommerce } from "../lib/woocommerce";
import ProductCard from "../Cards/ProductCard";
import HomeCard from "../Cards/HomeCard";
import Carousel from "../Reusables/Carousel";
import Link from "next/link";
import { convertToSlug, convertToSlug2 } from "@constants";
import { useEncryptionHelper } from "../EncryptedData";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "../config/features/subCategoryId";
import { useRouter } from "next/navigation";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { useCart } from "react-use-cart";
import OurServices from "./OurServices";
import BuyAccessories from "./BuyAccessories";

const AllCategorySection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [maxScrollTotal, setMaxScrollTotal] = useState(0);
  const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [latestProducts, setLatestProducts] = useState<ProductType[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { addItem, getItem } = useCart();

  // State to hold products by category
  const [categoryProductsMap, setCategoryProductsMap] = useState<{
    [key: string]: ProductType[];
  }>({});
  // WooCommerce API Category
  const {
    data: categories,
    isLoading: categoryWpIsLoading,
    isError: categoryIsError,
  } = useCategories("");

  const Categories: CategoryType[] = categories ?? [];
  const TotalCatgory = Categories?.length - 1;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setIsLoading(true);

        const filteredCategories = categories
          ?.filter((category: CategoryType) => category?.count > 0)
          ?.slice(0, 5);

        if (filteredCategories) {
          const productsPromises = filteredCategories.map(
            async (category: CategoryType) => {
              const response = await WooCommerce.get(
                `products?category=${category?.id}`,
              );

              // Check if there is at least one product in the category
              const firstProductImage =
                response?.data.length > 0 ?
                  response?.data[0]?.images[0]?.src
                : null;

              return {
                categoryId: category?.id,
                firstProductImage: firstProductImage, // Store the first product's image
              };
            },
          );

          const productsResults = await Promise.all(productsPromises);

          // Update the state with the first product images mapped by category
          const productsMap = productsResults.reduce(
            (acc: any, result: any) => ({
              ...acc,
              [result.categoryId]: result.firstProductImage,
            }),
            {},
          );

          setCategoryProductsMap(productsMap);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (categories?.length) {
      fetchCategoryProducts();
    }
  }, [categories]);

  // Fetch latest products for New Arrivals
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await WooCommerce.get(
          "products?orderby=date&order=desc&per_page=20",
        );
        if (response?.data) {
          setLatestProducts([...response.data].sort(() => 0.5 - Math.random()));
        }
      } catch (error) {
        console.error("Error fetching latest products:", error);
      }
    };
    fetchLatestProducts();
  }, []);

  const handleNext = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);

      sliderRef.current.scrollLeft += 600; // Adjust the scroll distance as needed
      setCurrentIndex((prevIndex) =>
        prevIndex < TotalCatgory - 1 ? prevIndex + 1 : prevIndex,
      );
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);
      // console.log(scrollLeft);
      if (scrollLeft > 0) {
        sliderRef.current.scrollLeft -= 600; // Adjust the scroll distance as needed
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex,
        );
      }
    }
  };

  return (
    <>
      {/* <OurServices /> */}

      {/* All Products Section */}
      <div className="max-w-[1256px] mx-auto px-4 py-10 sm:py-16">
        {/* Editorial Section Header */}
        <div className="flex items-end justify-between gap-6 border-b border-brand-border pb-6 mb-10">
          <div className="max-w-xl">
            <h2 className="font-serif italic text-3xl sm:text-4xl font-bold text-primary-100">
              All Products
            </h2>
            <p className="mt-3 text-sm text-ink-soft leading-relaxed">
              A curated selection of instruments that bridge the gap between the
              utilitarian and the transcendental.
            </p>
          </div>
          <Link
            href="/category"
            className="shrink-0 text-xs font-semibold uppercase tracking-[0.22em] text-primary-100 hover:text-brand-navy transition-colors">
            View All
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {latestProducts.length > 0 ?
            latestProducts.slice(0, 6).map((product: ProductType) => {
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
            })
          : /* Loading Skeleton */
            Array.from({ length: 6 }).map((_, i) => (
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
            ))
          }
        </div>
      </div>
    </>
  );
};

export default AllCategorySection;
