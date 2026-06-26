import AppLayout from "@src/components/AppLayout";
import {
  Target,
  Eye,
  ShieldCheck,
  Zap,
  HeartHandshake,
  Cpu,
  Wrench,
  Monitor,
  Speaker,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const offerings = [
  {
    title: "Kitchen Appliances",
    desc: "Cookers, microwaves, blenders and more.",
    icon: Wrench,
  },
  {
    title: "Laundry Appliances",
    desc: "Washing machines, dryers and irons.",
    icon: Cpu,
  },
  {
    title: "Office Equipment",
    desc: "Computers, printers and accessories.",
    icon: Monitor,
  },
  {
    title: "Home Entertainment",
    desc: "Smart TVs, audio systems and gaming.",
    icon: Speaker,
  },
];

const values = [
  {
    title: "Uncompromising Quality",
    desc: "We distribute only the best, ensuring durability and performance in every product.",
    icon: ShieldCheck,
  },
  {
    title: "Customer First",
    desc: "Your satisfaction is our priority. We are dedicated to providing exceptional support.",
    icon: HeartHandshake,
  },
  {
    title: "Innovation & Adaptability",
    desc: "We constantly evolve our portfolio to bring you the latest technological advancements.",
    icon: Zap,
  },
];

const AboutPage = () => {
  return (
    <AppLayout>
      <main className="w-full overflow-hidden pb-10 slg:pb-28">
        {/* Hero */}
        <section className="relative w-full bg-deep border-b border-brand-border px-4 sm:px-8 slg:px-16 pt-36 slg:pt-44 pb-20 slg:pb-28">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
            <span className="text-[11px] uppercase tracking-[0.35em] text-primary-100 font-semibold">
              About NextBridge Limited
            </span>
            <h1 className="font-serif italic text-4xl md:text-6xl font-bold text-white leading-[1.1]">
              Distributing excellence,
              <br />
              powering your everyday.
            </h1>
            <p className="text-sm md:text-lg text-ink-soft max-w-2xl leading-relaxed">
              Your trusted partner for high-quality appliances and technology
              solutions in Nigeria — engineered for the work that matters.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="max-w-5xl mx-auto mt-16 sm:mt-24 px-4 sm:px-8 slg:px-16">
          <div className="grid grid-cols-1 slg:grid-cols-12 gap-10 slg:gap-16 items-start">
            <div className="slg:col-span-4">
              <div className="inline-block px-3 py-1 border border-brand-border text-primary-100 font-semibold text-xs uppercase tracking-[0.2em] rounded-full">
                Who We Are
              </div>
              <h2 className="mt-6 font-serif text-2xl sm:text-3xl slg:text-4xl font-bold text-white leading-tight">
                A premier distributor built on trust.
              </h2>
            </div>
            <div className="slg:col-span-8 flex flex-col gap-6">
              <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                NextBridge Limited is a premier distributor based in Nigeria. We
                offer a comprehensive and wide range of high-quality appliances
                meticulously designed to meet the diverse and evolving needs of
                our customers.
              </p>
              <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                Whether you are outfitting a new home, upgrading your office, or
                seeking the ultimate entertainment setup, our portfolio of
                top-tier products ensures you have access to the best technology
                available on the market today.
              </p>
              <Link
                href="/category"
                className="mt-2 inline-flex items-center gap-2 w-fit bg-primary-100 text-brand-ink px-6 py-3 rounded-sm font-semibold text-xs uppercase tracking-[0.22em] transition-colors hover:bg-brand-navy">
                Explore Our Products <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="max-w-5xl mx-auto mt-20 sm:mt-28 px-4 sm:px-8 slg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                icon: Target,
                title: "Our Mission",
                desc: "To seamlessly connect consumers and businesses in Nigeria with premium, reliable appliances and technology solutions, enhancing their daily lives and operational efficiency through unparalleled service and support.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                desc: "To be the undisputed leader and most trusted distributor of consumer electronics and appliances in West Africa, recognized for our commitment to quality, innovation, and absolute customer satisfaction.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-surface p-8 sm:p-10 rounded-2xl border border-brand-border flex flex-col gap-5 transition-colors hover:border-primary-100/40">
                <div className="w-14 h-14 bg-deep rounded-xl flex items-center justify-center text-primary-100 border border-brand-border">
                  <card.icon size={26} />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {card.title}
                </h3>
                <p className="text-ink-soft leading-relaxed text-sm sm:text-base">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Offerings */}
        <section className="max-w-5xl mx-auto mt-20 sm:mt-28 px-4 sm:px-8 slg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-[11px] uppercase tracking-[0.35em] text-primary-100 font-semibold">
              What We Offer
            </span>
            <h2 className="mt-4 font-serif italic text-3xl sm:text-4xl font-bold text-white">
              Our Premium Offerings
            </h2>
            <p className="mt-4 text-ink-soft text-sm sm:text-base">
              We curate the best brands across multiple categories to ensure you
              get nothing but excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerings.map((item) => (
              <div
                key={item.title}
                className="group bg-surface border border-brand-border rounded-2xl p-6 flex flex-col gap-4 transition-colors hover:border-primary-100/40">
                <div className="w-12 h-12 rounded-xl bg-deep border border-brand-border flex items-center justify-center text-primary-100 transition-transform group-hover:scale-110">
                  <item.icon size={22} />
                </div>
                <h4 className="font-serif text-lg text-white">{item.title}</h4>
                <p className="text-sm text-ink-soft leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section className="max-w-5xl mx-auto mt-20 sm:mt-28 px-4 sm:px-8 slg:px-16">
          <div className="bg-deep rounded-3xl p-8 sm:p-12 lg:p-16 border border-brand-border">
            <h2 className="font-serif italic text-3xl sm:text-4xl font-bold mb-12 text-center text-white">
              Our Core Values
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface border border-brand-border flex items-center justify-center text-primary-100">
                    <v.icon size={22} />
                  </div>
                  <h4 className="font-serif text-lg text-white">{v.title}</h4>
                  <p className="text-ink-soft text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </AppLayout>
  );
};

export default AboutPage;
