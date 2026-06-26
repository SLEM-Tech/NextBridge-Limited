"use client";
import React, { useEffect, useState } from "react";
import AppLayout from "@src/components/AppLayout";
import { useSearchParams } from "next/navigation";
import { CompanyName } from "@constants";
import RefundPolicy from "./_components/RefundPolicy";
import DeliveryReturn from "./_components/DeliveryReturn";
import { FiCheckCircle, FiShield, FiFileText } from "react-icons/fi";

const Page = () => {
  const searchParams = useSearchParams().toString();
  const search = searchParams.replace(/=$/, "");
  const [activeTab, setActiveTab] = useState<string>("termsOfUse");

  useEffect(() => {
    if (search === "terms-of-use") {
      setActiveTab("termsOfUse");
    } else if (search === "privacy-policy") {
      setActiveTab("privacyPolicy");
    } else if (search === "delivery-return") {
      setActiveTab("deliveryReturn");
    } else if (search === "refund-policy") {
      setActiveTab("refundPolicy");
    }
  }, [search]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const tabs = [
    { id: "termsOfUse", label: "Terms of use" },
    { id: "privacyPolicy", label: "Privacy Policy" },
    { id: "deliveryReturn", label: "Delivery & Return" },
    { id: "refundPolicy", label: "Refund Policy" },
  ];

  return (
    <AppLayout>
      <main className="bg-white mx-auto pb-24 font-sans">
        {/* --- PREMIUM DARK HERO SECTION --- */}
        <section className="w-full bg-primary-200 pt-32 pb-16 px-4 md:px-8 relative overflow-hidden flex flex-col items-center text-center">
          {/* Subtle Background Elements */}
          <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] bg-primary-100/30 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[-30%] right-[-10%] w-[400px] h-[400px] bg-primary-100/20 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <h4 className="text-primary-100 font-bold tracking-widest uppercase text-xs sm:text-sm mb-3">
              Our Policies
            </h4>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              {CompanyName} Legal Hub
            </h3>
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Transparency and trust are the foundation of our business. Review
              our operational terms, privacy commitments, and fulfillment
              policies below.
            </p>
          </div>
        </section>

        {/* --- NAVIGATION TABS --- */}
        <section className="max-w-5xl mx-auto px-4 -mt-6 relative z-20">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-white shadow-xl shadow-gray-200/50 p-2 sm:p-3 rounded-2xl border border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex-1 min-w-[120px] px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id ?
                    "bg-primary-100 text-white shadow-md"
                  : "bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => handleTabClick(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* --- CONTENT AREA --- */}
        <section className="max-w-4xl mx-auto w-full mt-12 sm:mt-16 px-4 pb-20">
          {/* TERMS OF USE */}
          {activeTab === "termsOfUse" && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center mb-10">
                <h4 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
                  Terms of Service & Procurement Agreement
                </h4>
                <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
                  By accessing the NextBridge Limited Limited platform and
                  initiating a procurement request, you agree to be bound by the
                  following operational terms.
                </p>
              </div>

              <div className="grid gap-4 sm:gap-6">
                {[
                  {
                    title: "Phased Payment Structure",
                    desc: "We operate on a two-phase payment model. Phase 1 covers the cost of goods. Phase 2 covers international freight and customs clearing, payable upon arrival at our Lagos warehouse.",
                  },
                  {
                    title: "Verification of Manual Transfers",
                    desc: "For bank transfers, upload a valid receipt and Session ID. Procurement commences only after our accounts department successfully reconciles the funds.",
                  },
                  {
                    title: "Logistics & Timelines",
                    desc: "Delivery timelines (Air: 7-14 days; Sea: 45-60 days) are estimates. We are not liable for delays caused by carrier schedules, weather, or Customs inspections.",
                  },
                  {
                    title: "Exchange Rate Fluctuations",
                    desc: "Prices are subject to global market volatility. We reserve the right to adjust invoices if there's a significant exchange rate shift before procurement.",
                  },
                  {
                    title: "Customs & Prohibited Items",
                    desc: "Ensure items are not on the Nigerian Customs prohibition list. We reserve the right to cancel procurement for restricted or illegal items.",
                  },
                  {
                    title: "Storage & Demurrage",
                    desc: "Once cargo arrives and the shipping invoice is issued, you have 7 business days to complete payment and pick up items. Beyond this, a daily storage fee applies.",
                  },
                  {
                    title: "Cancellation & Refunds",
                    desc: "Once procurement is finalized with a vendor, Phase 1 payment is non-refundable unless the vendor fails to fulfill the order or the item is out of stock.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 sm:p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary-100/30 transition-colors">
                    <div className="shrink-0 size-8 sm:size-10 rounded-full bg-primary-100/10 flex items-center justify-center text-primary-100 font-bold text-sm sm:text-base">
                      0{i + 1}
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-2">
                        {item.title}
                      </h5>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Limitation of liability box */}
              <div className="mt-10 p-6 sm:p-8 bg-primary-200 text-white rounded-3xl shadow-lg relative overflow-hidden">
                <FiFileText className="absolute right-[-10%] top-[-20%] text-[200px] text-white/5 opacity-20 pointer-events-none" />
                <h5 className="font-black uppercase tracking-widest text-primary-100 text-xs sm:text-sm mb-3">
                  Limitation of Liability
                </h5>
                <p className="text-sm sm:text-base leading-relaxed text-gray-300">
                  NextBridge Limited Limited acts as a procurement and logistics
                  facilitator, not the manufacturer. Warranty claims must be
                  directed to the original manufacturer, though we will provide
                  reasonable assistance in facilitating such claims.
                </p>
              </div>
            </div>
          )}

          {/* PRIVACY POLICY */}
          {activeTab === "privacyPolicy" && (
            <div className="space-y-12 animate-fade-in">
              <div className="text-center mb-10">
                <h4 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
                  Privacy & Data Intelligence
                </h4>
                <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
                  We act as a data controller under the NDPR. By using our
                  services, you entrust us to protect your data securely.
                </p>
              </div>

              {/* Data Collection */}
              <div>
                <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-primary-100 rounded-full" />
                  Data Collection
                </h5>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h6 className="font-bold text-gray-900 uppercase text-xs tracking-widest mb-2">
                      Logistics Data
                    </h6>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Delivery addresses, geolocation data, and recipient
                      contact details to facilitate international shipping and
                      last-mile delivery.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h6 className="font-bold text-gray-900 uppercase text-xs tracking-widest mb-2">
                      Financial Records
                    </h6>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Transaction references, payment receipts, and bank account
                      details for automated reconciliation and withdrawal
                      processing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Strategic Use */}
              <div>
                <h5 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-primary-100 rounded-full" />
                  Strategic Use of Information
                </h5>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4">
                  {[
                    "Procurement Fulfillment: Sharing necessary data with vendors and clearing agents.",
                    "Fraud Mitigation: Running AML checks and identity cross-referencing to protect our ecosystem.",
                    "Operational Updates: Sending real-time tracking milestones via SMS, Email, or WhatsApp.",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <FiCheckCircle className="text-primary-100 mt-1 shrink-0" />
                      <p className="text-sm text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Box */}
              <div className="bg-primary-200 p-8 sm:p-10 rounded-[2.5rem] relative overflow-hidden shadow-xl">
                <FiShield className="absolute -right-10 -bottom-10 text-[250px] text-white/5 opacity-30 pointer-events-none" />
                <div className="relative z-10">
                  <h5 className="text-primary-100 font-black uppercase tracking-widest text-xs mb-4">
                    Data Security & Encryption
                  </h5>
                  <p className="text-white text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
                    We employ bank-grade AES-256 encryption to protect your
                    sensitive identifiers. Your data is stored in secure, siloed
                    environments and is never sold to third-party advertisers.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {["SSL Secured", "NDPR Compliant", "Encrypted Storage"].map(
                      (badge, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-white/10 text-white border border-white/20 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                          {badge}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* Rights */}
              <div className="text-center bg-gray-50 p-8 rounded-2xl border border-gray-100">
                <h5 className="text-lg font-bold text-gray-900 mb-2">
                  Your Privacy Rights
                </h5>
                <p className="text-sm text-gray-600">
                  You have the right to access, rectify, or request deletion of
                  your data. Contact our Data Protection Officer at{" "}
                  <a
                    href="mailto:privacy@nextBridge.com"
                    className="text-primary-100 font-bold hover:underline">
                    privacy@nextBridge.com
                  </a>
                  .
                </p>
              </div>
            </div>
          )}

          {activeTab === "deliveryReturn" && <DeliveryReturn />}
          {activeTab === "refundPolicy" && <RefundPolicy />}
        </section>
      </main>
    </AppLayout>
  );
};

export default Page;
