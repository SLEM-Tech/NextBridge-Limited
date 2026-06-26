"use client";
import React from "react";
import Link from "next/link";

const SynchronizeCTA = () => {
  return (
    <section className="w-full bg-deep overflow-hidden border-y border-brand-border">
      <div className="max-w-[1256px] mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
        <span className="text-[11px] uppercase tracking-[0.35em] text-primary-100 font-semibold">
          The NextBridge Standard
        </span>

        <h2 className="mt-6 font-serif italic text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
          Bridge ambition <br className="hidden sm:block" />
          and execution.
        </h2>

        <p className="mt-6 mx-auto max-w-xl text-sm sm:text-base text-white/70 leading-relaxed">
          Join the professionals who rely on engineered essentials to do their
          most considered work.
        </p>

        <Link
          href="/category"
          className="mt-10 inline-flex items-center justify-center bg-primary-100 text-brand-ink text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] px-10 py-4 rounded-sm hover:bg-brand-navy transition-colors">
          Build Your System
        </Link>
      </div>
    </section>
  );
};

export default SynchronizeCTA;
