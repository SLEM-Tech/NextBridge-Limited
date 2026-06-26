import React from "react";
import {
  FiRefreshCw,
  FiAlertTriangle,
  FiPackage,
  FiVideo,
} from "react-icons/fi";

const RefundPolicy = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      <div className="text-center mb-10">
        <h4 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
          Refund Policy
        </h4>
        <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
          At NextBridge Limited Limited, we strive for 100% accuracy. Our policy
          is designed to be fair to both you and our international suppliers.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Eligibility Section */}
        <div className="bg-emerald-50/50 p-6 sm:p-8 rounded-[2rem] border border-emerald-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <FiRefreshCw className="text-lg" />
            </div>
            <h5 className="font-bold text-gray-900 text-lg">
              Eligibility for Refunds
            </h5>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            You are entitled to a full refund in the following cases:
          </p>
          <ul className="space-y-4">
            {[
              {
                title: "Out of Stock",
                desc: "If an item you paid for becomes unavailable before procurement.",
              },
              {
                title: "Wrong Item",
                desc: "If we procure a completely different item from what you ordered.",
              },
              {
                title: "Damaged on Arrival",
                desc: "If the item arrives with significant damage making it unusable (minor packaging dents excluded).",
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-1.5 size-1.5 rounded-full bg-emerald-500 shrink-0" />
                <div>
                  <span className="font-bold text-gray-900 block text-sm">
                    {item.title}
                  </span>
                  <span className="text-sm text-gray-600">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Non-Refundable Section */}
        <div className="bg-red-50/50 p-6 sm:p-8 rounded-[2rem] border border-red-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <FiAlertTriangle className="text-lg" />
            </div>
            <h5 className="font-bold text-gray-900 text-lg">
              Non-Refundable Situations
            </h5>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            We cannot offer refunds for:
          </p>
          <ul className="space-y-4">
            {[
              {
                title: "Change of Mind",
                desc: "Once an order is placed with a supplier, it cannot be canceled.",
              },
              {
                title: "Sizing Issues",
                desc: "We buy exactly the size you request. Consult the supplier's size chart.",
              },
              {
                title: "Color Variance",
                desc: "Slight differences in color due to studio lighting or screen resolution.",
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-1.5 size-1.5 rounded-full bg-red-500 shrink-0" />
                <div>
                  <span className="font-bold text-gray-900 block text-sm">
                    {item.title}
                  </span>
                  <span className="text-sm text-gray-600">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Return Process Box */}
      <div className="bg-white border border-gray-200 rounded-[2rem] p-6 sm:p-8 shadow-sm">
        <h5 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-3">
          <FiPackage className="text-primary-100 text-xl" />
          The Return Process
        </h5>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-100">
              01. Window
            </span>
            <p className="text-sm text-gray-600">
              Inspect your goods and report issues within 48 hours of pickup or
              delivery.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-100">
              02. Evidence
            </span>
            <p className="text-sm text-gray-600">
              Provide a clear unboxing video and photos of the defect.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-100">
              03. Shipping
            </span>
            <p className="text-sm text-gray-600">
              We cover return shipping if the error is ours. Otherwise, the
              customer bears the cost.
            </p>
          </div>
        </div>
      </div>

      {/* Missing Items Note */}
      <div className="bg-primary-200 text-white p-8 sm:p-10 rounded-[2.5rem] relative overflow-hidden">
        <FiVideo className="absolute -right-10 -top-10 text-[200px] text-white/5 opacity-20 pointer-events-none" />
        <div className="relative z-10">
          <h5 className="font-black uppercase tracking-widest text-primary-100 text-xs mb-4">
            Missing Items & Discrepancies
          </h5>
          <p className="text-sm sm:text-base leading-relaxed text-gray-300 mb-6 max-w-3xl">
            If a supplier fails to ship an item, our primary resolution is an{" "}
            <strong>automatic Re-order</strong>. Alternatively, we offer{" "}
            <strong>Store Credit</strong>. Cash refunds are only processed if
            the supplier confirms they cannot fulfill the order and refunds us.
          </p>
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 p-4 rounded-xl backdrop-blur-sm">
            <FiVideo className="text-primary-100 shrink-0 text-xl" />
            <p className="text-xs sm:text-sm font-medium">
              <strong className="text-white">Important:</strong> A continuous
              Unboxing Video is mandatory to file a dispute.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
