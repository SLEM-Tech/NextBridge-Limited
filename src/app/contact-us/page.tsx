import AppLayout from "@src/components/AppLayout";
import { FiPhoneCall, FiMail, FiMapPin, FiClock } from "react-icons/fi";

const PHONE = "08118664990";
const PHONE_E164 = "+2348118664990";
const EMAIL = "sales@nextbridgetech-limited.com";
const ADDRESS = "21 Association Close, Ogudu, Lagos";
const COMPANY = "NextBridge Technologies Limited";

const contactCards = [
  {
    icon: FiPhoneCall,
    eyebrow: "Speak with sales",
    title: "Call Us",
    body: PHONE,
    href: `tel:${PHONE_E164}`,
    cta: "Place a call",
  },
  {
    icon: FiMail,
    eyebrow: "Quotes & enquiries",
    title: "Email Us",
    body: EMAIL,
    href: `mailto:${EMAIL}`,
    cta: "Send an email",
  },
  {
    icon: FiMapPin,
    eyebrow: "Walk-in welcome",
    title: "Visit Us",
    body: ADDRESS,
    href: "https://www.google.com/maps/search/?api=1&query=21+Association+Close+Ogudu+Lagos",
    cta: "View on map",
  },
];

const ContactPage = () => {
  return (
    <AppLayout>
      <main className="w-full overflow-hidden pb-16 sm:pb-28">
        {/* Hero */}
        <section className="relative w-full bg-deep border-b border-brand-border px-4 sm:px-8 slg:px-16 pt-36 slg:pt-44 pb-16 slg:pb-20">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
            <span className="text-[11px] uppercase tracking-[0.35em] text-primary-100 font-semibold">
              Get in touch
            </span>
            <h1 className="font-serif italic text-4xl md:text-6xl font-bold text-white leading-[1.1]">
              We&apos;d love to <br className="hidden sm:block" />
              hear from you.
            </h1>
            <p className="text-sm md:text-lg text-ink-soft max-w-2xl leading-relaxed">
              {COMPANY} &mdash; trusted distributor of premium appliances and
              technology. Reach out about a quote, a partnership, or anything in
              between.
            </p>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="max-w-5xl mx-auto -mt-10 sm:-mt-14 px-4 sm:px-8 slg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {contactCards.map((c) => (
              <a
                key={c.title}
                href={c.href}
                target={c.icon === FiMapPin ? "_blank" : undefined}
                rel={c.icon === FiMapPin ? "noopener noreferrer" : undefined}
                className="group flex flex-col gap-5 bg-surface border border-brand-border rounded-2xl p-7 transition-colors hover:border-primary-100">
                <div className="w-12 h-12 rounded-xl bg-deep border border-brand-border flex items-center justify-center text-primary-100">
                  <c.icon size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-ink-soft mb-2">
                    {c.eyebrow}
                  </p>
                  <h3 className="font-serif text-xl text-white">{c.title}</h3>
                </div>
                <p className="text-sm text-ink-soft leading-relaxed break-words">
                  {c.body}
                </p>
                <span className="mt-auto text-xs font-semibold uppercase tracking-[0.22em] text-primary-100 group-hover:text-brand-navy transition-colors">
                  {c.cta} &rarr;
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Hours + Company panel */}
        <section className="max-w-5xl mx-auto mt-16 sm:mt-24 px-4 sm:px-8 slg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 bg-deep border border-brand-border rounded-3xl p-8 sm:p-12">
            <div className="lg:col-span-3 flex flex-col gap-4">
              <span className="text-[11px] uppercase tracking-[0.35em] text-primary-100 font-semibold">
                Office
              </span>
              <h2 className="font-serif italic text-3xl sm:text-4xl font-bold text-white">
                {COMPANY}
              </h2>
              <p className="text-sm sm:text-base text-ink-soft leading-relaxed max-w-xl">
                Come by our office at <span className="text-white">{ADDRESS}</span>.
                Our team is on hand for product demos, after-sales support, and
                consultations on bulk procurement.
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                <a
                  href={`tel:${PHONE_E164}`}
                  className="inline-flex items-center gap-2 bg-primary-100 text-brand-ink px-6 py-3 rounded-sm font-semibold text-xs uppercase tracking-[0.22em] hover:bg-brand-navy transition-colors">
                  <FiPhoneCall /> {PHONE}
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 border border-brand-border text-white px-6 py-3 rounded-sm font-semibold text-xs uppercase tracking-[0.22em] hover:border-primary-100 hover:text-primary-100 transition-colors">
                  <FiMail /> Email sales
                </a>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-5 bg-surface border border-brand-border rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <span className="size-9 rounded-lg bg-deep border border-brand-border flex items-center justify-center text-primary-100">
                  <FiClock size={18} />
                </span>
                <h3 className="font-serif text-lg text-white">Office Hours</h3>
              </div>
              <ul className="flex flex-col gap-3 text-sm">
                {[
                  ["Mon &mdash; Fri", "9:00am &mdash; 6:00pm"],
                  ["Saturday", "10:00am &mdash; 4:00pm"],
                  ["Sunday", "Closed"],
                ].map(([day, hours]) => (
                  <li
                    key={day}
                    className="flex items-center justify-between gap-4 border-b border-brand-border last:border-0 pb-3 last:pb-0">
                    <span
                      className="text-ink-soft"
                      dangerouslySetInnerHTML={{ __html: day }}
                    />
                    <span
                      className="text-white font-medium"
                      dangerouslySetInnerHTML={{ __html: hours }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </AppLayout>
  );
};

export default ContactPage;
