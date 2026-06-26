"use client";

import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RiShoppingBagFill } from "react-icons/ri";
import { useCart } from "react-use-cart";
import Link from "next/link";
import Picture from "../picture/Picture";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { convertToSlug } from "@constants";

interface ProductCard2Props {
  id: string | number;
  image: string;
  oldAmount?: string;
  newAmount: string;
  description: string;
  boxShadow?: boolean;
}

const ProductCard2 = ({
  id,
  image,
  oldAmount,
  newAmount,
  description,
  boxShadow = true,
}: ProductCard2Props) => {
  const { addItem, removeItem, updateItem, getItem } = useCart();

  const ID = id.toString();
  const cartItem = getItem(ID);
  const quantity = cartItem?.quantity || 0;
  const price = parseInt(newAmount);
  const slugDesc = convertToSlug(description);

  // Calculate Discount Percentage
  const discount =
    oldAmount ?
      Math.round(((parseInt(oldAmount) - price) / parseInt(oldAmount)) * 100)
    : 0;

  const addToCart = () => {
    addItem({ id: ID, name: description, price, quantity: 1, image });
  };

  const increase = () => updateItem(ID, { quantity: quantity + 1 });
  const decrease = () => {
    if (quantity <= 1) removeItem(ID);
    else updateItem(ID, { quantity: quantity - 1 });
  };

  return (
    <div className="group relative flex flex-col w-full rounded-xl border border-brand-border bg-surface overflow-hidden p-3 transition-colors duration-300 hover:border-primary-100">
      {/* Image Container */}
      <Link
        href={`/home-item/product/${slugDesc}-${id}`}
        className="relative aspect-square w-full bg-deep overflow-hidden flex items-center justify-center rounded-lg">
        <Picture
          src={image}
          alt={description}
          className="object-contain w-[82%] h-[82%] transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-primary-100 text-brand-ink text-xs font-bold px-2.5 py-1 rounded-md z-10">
            -{discount}%
          </div>
        )}
      </Link>

      {/* Content Area */}
      <div className="flex flex-col flex-grow px-1 pt-4">
        {/* Title / Description */}
        <Link
          href={`/home-item/product/${slugDesc}-${id}`}
          className="font-serif text-base text-white line-clamp-2 mb-4 h-12 hover:text-primary-100 transition-colors leading-snug"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {/* Bottom Row - Pushed to bottom */}
        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="flex flex-col">
            {oldAmount && (
              <span className="text-[11px] line-through text-ink-soft font-medium mb-0.5">
                <FormatMoney2 value={parseInt(oldAmount)} />
              </span>
            )}
            <span className="text-white font-bold text-base sm:text-xl tracking-tight">
              {price ?
                <FormatMoney2 value={price} />
              : "N/A"}
            </span>
          </div>

          {price > 0 && (
            <div className="flex items-center">
              {quantity === 0 ?
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart();
                  }}
                  className="flex items-center justify-center rounded-lg bg-primary-100 size-10 text-brand-ink hover:bg-brand-navy transition-all duration-300 active:scale-90"
                  aria-label="Add to cart">
                  <RiShoppingBagFill className="text-xl" />
                </button>
              : <div className="flex items-center gap-2 sm:gap-3 rounded-lg bg-deep p-1 border border-brand-border">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      decrease();
                    }}
                    className="size-7 sm:size-8 flex items-center justify-center rounded-md bg-white/5 text-white hover:text-danger transition-all active:scale-90">
                    <AiOutlineMinus size={14} />
                  </button>
                  <span className="text-xs sm:text-sm font-bold text-white min-w-[14px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      increase();
                    }}
                    className="size-7 sm:size-8 flex items-center justify-center rounded-md bg-primary-100 text-brand-ink transition-all hover:bg-brand-navy active:scale-90">
                    <AiOutlinePlus size={14} />
                  </button>
                </div>
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;
