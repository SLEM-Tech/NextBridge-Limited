"use client";
import React from "react";
import Link from "next/link";
import Picture from "@src/components/picture/Picture";
import { heroBg, heroImage } from "@public/images";

const LandingHero = () => {
  return (
    <section className="relative w-full bg-deep overflow-hidden">
      {/* Full-bleed backdrop */}
      <div className="absolute inset-0">
        <Picture
          src={heroBg ?? heroImage}
          alt="Engineered for the work that matters"
          className="w-full h-full object-cover"
        />
        {/* Editorial dark wash so the copy stays legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black/90" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative max-w-[1256px] mx-auto px-4 sm:px-6 min-h-[78vh] flex flex-col items-center justify-center text-center pt-36 pb-24">
        <span className="mb-6 text-[11px] sm:text-xs uppercase tracking-[0.35em] text-primary-100 font-semibold">
          NextBridge Limited
        </span>

        <h1 className="font-serif italic text-white text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] max-w-4xl">
          The Art of the
          <br />
          Permanent Mark
        </h1>

        <p className="mt-7 max-w-xl text-sm sm:text-base text-white/70 leading-relaxed">
          Crafting instruments for those who believe that every interaction is a
          dialogue with progress. Explore our curated collection of engineered
          essentials.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/category"
            className="inline-flex items-center justify-center border border-primary-100 text-primary-100 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] px-10 py-4 rounded-sm hover:bg-primary-100 hover:text-brand-ink transition-colors">
            Order Now
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center text-white/70 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] px-6 py-4 hover:text-white transition-colors">
            Our Story &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
