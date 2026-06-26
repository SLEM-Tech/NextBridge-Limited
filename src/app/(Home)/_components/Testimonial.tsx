"use client";
import React from "react";
import Picture from "@src/components/picture/Picture";
import { FiCheckCircle } from "react-icons/fi";
import { a_man_writing_with_smile } from "@public/images";

const Testimonial = () => {
  return (
    <section className="w-full bg-background">
      <div className="max-w-[1256px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left – Image with floating stat card */}
          <div className="relative">
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-panel shadow-xl">
              <Picture
                src={a_man_writing_with_smile}
                alt="Professional working comfortably"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-6 right-6 bg-surface border border-brand-border rounded-2xl shadow-xl px-5 py-4">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-white uppercase">
                <FiCheckCircle className="text-success" />
                Output Lifted
              </div>
              <p className="mt-1 text-2xl font-extrabold text-primary-100">
                +31%
              </p>
              <p className="text-[11px] text-ink-soft">Quarterly average</p>
            </div>
          </div>

          {/* Right – Quote */}
          <div className="flex flex-col">
            <span className="text-6xl font-serif leading-none text-primary-100">
              &ldquo;
            </span>
            <blockquote className="mt-2 text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug text-dark">
              Their hardware has fundamentally changed how I interact with my
              workstation. It&apos;s no longer just electronics; it&apos;s a
              wellness ritual that supports my biological health throughout the
              day.
            </blockquote>
            <div className="mt-8">
              <p className="text-sm font-bold text-dark">Dr. Elena Sterling</p>
              <p className="text-xs uppercase tracking-[0.18em] text-ink-soft mt-1">
                Cognitive Researcher, Neural Labs
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
