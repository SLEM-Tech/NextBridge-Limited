"use client";
import React from "react";
import { FiTruck, FiBox, FiClock, FiAlertCircle } from "react-icons/fi";

const DeliveryReturn = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h4 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
          Logistics & Fulfillment Policy
        </h4>
        <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
          From international arrival to last-mile delivery, we utilize a
          strictly monitored courier network to ensure your procurement reaches
          you in pristine condition.
        </p>
      </div>

      {/* Pricing Tiers */}
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        {/* Tier 1: Standard */}
        <div className="bg-gray-50 border border-gray-200 p-8 rounded-[2rem] hover:border-primary-100/30 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600">
              <FiBox className="text-lg" />
            </div>
            <h4 className="font-black text-lg text-gray-900">
              Standard Orders
            </h4>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
            Orders Below ₦2,000,000
          </p>

          <ul className="space-y-4">
            <li className="flex justify-between items-center border-b border-gray-200/60 pb-3">
              <span className="text-sm font-medium text-gray-600">
                Lagos Standard
              </span>
              <span className="font-bold text-gray-900">₦7,000.00*</span>
            </li>
            <li className="flex justify-between items-center border-b border-gray-200/60 pb-3">
              <span className="text-sm font-medium text-gray-600">
                Lagos Onforwarding
              </span>
              <span className="font-bold text-gray-900">₦10,000.00</span>
            </li>
            <li className="flex justify-between items-center border-b border-gray-200/60 pb-3">
              <span className="text-sm font-medium text-gray-600">
                Outside Lagos
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-100 bg-primary-100/10 px-2 py-1 rounded">
                Negotiable
              </span>
            </li>
          </ul>
          <p className="mt-4 text-xs italic text-gray-500">
            *Rates may vary based on item dimensions.
          </p>
        </div>

        {/* Tier 2: Premium */}
        <div className="bg-primary-200 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-[-20%] right-[-10%] w-[200px] h-[200px] bg-primary-100/20 rounded-full blur-[40px] pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-10 rounded-full bg-primary-100 flex items-center justify-center text-white">
                <FiTruck className="text-lg" />
              </div>
              <h4 className="font-black text-lg text-white">
                Premium Fulfillment
              </h4>
            </div>
            <p className="text-xs font-bold text-primary-100 uppercase tracking-widest mb-6">
              Orders Above ₦2,000,000
            </p>

            <ul className="space-y-4">
              <li className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-sm font-medium text-gray-300">
                  Lagos Standard
                </span>
                <span className="font-bold text-primary-100 uppercase tracking-wider bg-white px-2 py-1 rounded text-xs">
                  Free
                </span>
              </li>
              <li className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-sm font-medium text-gray-300">
                  Lagos Onforwarding
                </span>
                <span className="font-bold text-primary-100 uppercase tracking-wider bg-white px-2 py-1 rounded text-xs">
                  Free
                </span>
              </li>
              <li className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-sm font-medium text-gray-300">
                  Outside Lagos
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Negotiable
                </span>
              </li>
            </ul>
            <p className="mt-4 text-xs text-primary-100">
              Priority dispatch from Lagos Warehouse.
            </p>
          </div>
        </div>
      </div>

      {/* Delivery Timelines */}
      <div>
        <h5 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <FiClock className="text-primary-100" /> Timelines
        </h5>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-100 mb-1 block">
              Processing
            </span>
            <p className="text-sm font-medium text-gray-800">
              Orders placed after 12:00 PM are logged for the next business day.
            </p>
          </div>
          <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-100 mb-1 block">
              Lagos Arrival
            </span>
            <p className="text-sm font-medium text-gray-800">
              2 — 4 Business Days post-clearing.
            </p>
          </div>
          <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-100 mb-1 block">
              Interstate Arrival
            </span>
            <p className="text-sm font-medium text-gray-800">
              5 — 7 Business Days post-clearing.
            </p>
          </div>
        </div>
      </div>

      {/* Critical Terms */}
      <div className="bg-gray-50 border border-gray-200 rounded-[2rem] p-8">
        <h5 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">
          <FiAlertCircle className="text-primary-100" /> Critical Terms
        </h5>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 text-sm">
          <div className="flex gap-3">
            <div className="w-1.5 rounded-full bg-primary-100 shrink-0" />
            <p className="text-gray-600">
              <strong className="text-gray-900 block mb-1">
                Identity Verification:
              </strong>
              Goods must be signed for by the account holder. Alternative
              recipients must be pre-authorized.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 rounded-full bg-primary-100 shrink-0" />
            <p className="text-gray-600">
              <strong className="text-gray-900 block mb-1">
                Transfer of Risk:
              </strong>
              nextBridge bears no responsibility for items signed for by
              unauthorized third parties.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 rounded-full bg-primary-100 shrink-0" />
            <p className="text-gray-600">
              <strong className="text-gray-900 block mb-1">
                Reporting Window:
              </strong>
              Shortages or external damages must be reported to support on the{" "}
              <span className="underline">day of delivery</span>.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 rounded-full bg-primary-100 shrink-0" />
            <p className="text-gray-600">
              <strong className="text-gray-900 block mb-1">
                No Redirection:
              </strong>
              For security, we cannot redirect cargo once it has departed our
              Lagos hub.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 text-sm font-medium text-gray-600">
          Queries:{" "}
          <a
            href="mailto:IgweBlessing@nextBridge.com.ng"
            className="text-primary-100 hover:underline font-bold">
            IgweBlessing@nextBridge.com.ng
          </a>
        </div>
      </div>

      {/* Return & Replacement Policy */}
      <div className="bg-red-50 border border-red-100 rounded-[2rem] p-8">
        <h5 className="font-black uppercase tracking-widest text-red-700 text-sm mb-3">
          Return & Replacement Policy
        </h5>
        <p className="text-sm text-red-800/80 mb-6 max-w-2xl">
          Our commitment to quality includes the direct replacement of
          factory-defective products. We enforce the following boundaries:
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white/60 p-4 rounded-xl text-xs sm:text-sm text-red-900 font-medium">
            We do not assume responsibility for physical damages caused by
            improper use or handling after delivery.
          </div>
          <div className="bg-white/60 p-4 rounded-xl text-xs sm:text-sm text-red-900 font-medium">
            Return claims are void once delivery confirmation is signed and the
            inspection window has closed.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryReturn;
