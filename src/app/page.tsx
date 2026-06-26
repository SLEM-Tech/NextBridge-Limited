import AppLayout from "@src/components/AppLayout";
import AllCategorySection from "@src/components/PageFragments/AllCategorySection";
import SortedProducts from "./(Home)/_components/SortedProducts";
import { SEODATA } from "@constants/seoContants";
import { Metadata } from "next";
// import AppMenu from "@src/components/Navbars/AppMenu";
import FaqAccordion from "@src/components/Reusables/Accordion/FaqAccordion";
import MachineMaintenance from "./(Home)/_components/MachineMaintenance";
import BestSellingItem from "@src/components/PageFragments/BestSellingItem";
import LandingHero from "./(Home)/_components/LandingHero";
import SynchronizeCTA from "./(Home)/_components/SynchronizeCTA";
import Testimonial from "./(Home)/_components/Testimonial";

const { description, title, ogImage, keywords } = SEODATA.home;
export const metadata: Metadata = {
  title: title,
  description: description,
  keywords: keywords,
  icons: ogImage,
  openGraph: {
    images: [
      {
        url: ogImage ?? "",
      },
    ],
  },
};

const page = () => {
  return (
    <AppLayout>
      <LandingHero />
      <AllCategorySection />
      <div className="mx-auto px-2 sm:px-4 mt-4">
        <SortedProducts />
      </div>
      <SynchronizeCTA />
      {/* <BestSellingItem /> */}
      <Testimonial />
      {/* <MachineMaintenance /> */}
      <div className="pt-4 px-2 sm:px-0 mx-auto max-w-[1256px] mt-6 sm:mt-12">
        <div className="mt-4 sm:mt-3">
          <section className="flex w-full flex-col items-center pt-16 text-center">
            <span className="text-[11px] uppercase tracking-[0.35em] text-primary-100 font-semibold mb-4">
              Answers
            </span>
            <h3 className="font-serif italic text-3xl sm:text-4xl font-bold text-white">
              Frequently Asked Questions
            </h3>
            <FaqAccordion />
          </section>
        </div>
      </div>
      {/* <AppMenu /> */}
    </AppLayout>
  );
};

export default page;
