"use client";
import React from "react";
import Picture from "@src/components/picture/Picture";
import Link from "next/link";
import {
  virtualControllerImg,
  playstationImg,
  gameEngineImg,
  gameLayerBg,
} from "@public/images";

const BestSellingItem = () => {
  return (
    <section className="w-full bg-primary-200 overflow-hidden">
      <div className="max-w-[1256px] mx-auto px-4 py-10 sm:py-14 md:py-16">
        <div className="relative flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-0">
          {/* Left – Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-[40%] shrink-0 z-10">
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold leading-[1.2]">
              <span className="bg-vibrant-multi bg-clip-text text-transparent">
                Everything for
              </span>
              <br />
              <span className="bg-vibrant-multi bg-clip-text text-transparent">
                your gaming setup
              </span>
            </h2>

            <p className="mt-4 text-[13px] sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              Discover premium gaming gear — controllers, consoles,
              <br className="hidden sm:block" />
              and accessories built to level up your play.
            </p>

            <Link
              href="/category"
              className="mt-6 sm:mt-8 inline-flex items-center gap-2 bg-white text-dark text-sm font-semibold px-7 py-3 rounded-md hover:bg-gray-100 transition-colors">
              Shop Now
              <span>&rarr;</span>
            </Link>
          </div>

          {/* Right – Product Images on Layer Background */}
          <div className="relative w-full lg:w-[60%] h-[280px] sm:h-[340px] md:h-[420px] flex items-center justify-center mt-10 lg:mt-0">
            {/* Background Layer Image – gaming symbols */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Picture
                src={gameLayerBg}
                alt="Gaming layer background"
                className="w-[110%] h-[110%] object-contain opacity-50 max-w-none"
              />
            </div>

            {/* Game Engine / GPU – Right */}
            <div className="absolute right-[0%] sm:right-[30%] top-[20%] sm:top-[10%] w-[40%] sm:w-[36%] z-10">
              <Picture
                src={gameEngineImg}
                alt="Gaming GPU"
                className="w-full h-auto object-contain drop-shadow-2xl hover:-translate-y-2 transition-transform duration-500"
              />
            </div>

            {/* Virtual Controller – Bottom Left */}
            <div className="absolute left-[2%] sm:left-[5%] bottom-[45%] sm:bottom-[10%] w-[40%] sm:w-[30%] z-10">
              <Picture
                src={playstationImg}
                alt="PlayStation 5"
                className="w-full h-auto object-contain drop-shadow-2xl hover:-translate-y-2 transition-transform duration-500"
              />
            </div>

            {/* PlayStation – Center */}
            <div className="absolute left-[25%] sm:left-[40%] botom-[10%] sm:bottom-[5%] w-[52%] sm:w-[50%] z-20">
              <Picture
                src={virtualControllerImg}
                alt="Virtual Controller"
                className="w-full h-auto object-contain drop-shadow-2xl hover:-translate-y-2 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellingItem;
