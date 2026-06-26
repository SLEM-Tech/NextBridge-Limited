"use client";
import React from "react";
import Link from "next/link";
import useToken from "../hooks/useToken";
import { signOut } from "@utils/lib";
import { CompanyName, filterCustomersByEmail } from "@constants";
import { useCustomer } from "../lib/woocommerce";
import { LogoImage } from "@utils/function";
import { usePathname } from "next/navigation";
import { logoImage } from "@public/images";
import Picture from "../picture/Picture";
import BrandLogo from "../common/BrandLogo";
import {
  BiLogoFacebook,
  BiLogoLinkedin,
  BiLogoTiktok,
  BiLogoWhatsapp,
} from "@node_modules/react-icons/bi";

interface footerDataProps {
  title: string;
  links: {
    label: string;
    href: string;
    function?: () => void;
  }[];
}

const Footer = () => {
  const { email } = useToken();
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const { data: customer } = useCustomer("");
  const wc_customer2_info: Woo_Customer_Type[] = customer ?? [];
  const wc_customer_info: Woo_Customer_Type | undefined =
    filterCustomersByEmail(wc_customer2_info, email);
  const firstName = wc_customer_info?.first_name;

  const socialLinks = [
    {
      id: 1,
      icon: <BiLogoTiktok className="text-lg" />,
      link: "",
      label: "TikTok",
    },
    {
      id: 2,
      icon: <BiLogoWhatsapp className="text-lg" />,
      link: "",
      label: "WhatsApp",
    },
  ];

  const footerData: footerDataProps[] = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "/contact-us" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Account",
      links: [
        {
          label: firstName ? "Update Account" : "Create Account",
          href: firstName ? "/user/account-details" : "/user/register",
        },
        {
          label: firstName ? "Log Out" : "Login",
          href: firstName ? "" : "/user/login",
          function: firstName ? signOut : () => {},
        },
        {
          label: firstName ? "Change Password" : "Forget Password",
          href: firstName ? "/user/change-password" : "/user/forget-password",
        },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Use", href: "/terms-of-use?terms-of-use" },
        { label: "Privacy Policy", href: "/terms-of-use?privacy-policy" },
        {
          label: "Delivery & Shipping",
          href: "/terms-of-use?delivery-return",
        },
        { label: "Refund Policy", href: "/terms-of-use?refund-policy" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-deep border-t border-brand-border">
      {/* Main Footer Content */}
      <div className="max-w-[1256px] mx-auto px-4 sm:px-8 py-8 sm:py-14">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6">
          {/* Brand Column */}
          <div className="col-span-1 xs:col-span-2 sm:col-span-1 flex flex-col gap-5">
            <Link href="/" className="shrink-0 flex items-center">
              <BrandLogo variant="full" mono />
            </Link>
            <p className="text-xs text-ink-soft leading-relaxed max-w-[220px]">
              Engineered essentials for those who believe every interaction is a
              dialogue with progress.
            </p>
            {/* Social Icons */}
            {/* <div className="flex items-center gap-2">
              {socialLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  aria-label={item.label}
                  className="size-8 flex items-center justify-center rounded-full bg-white/5 border border-brand-border text-white hover:bg-primary-100 hover:text-brand-ink transition-colors">
                  {item.icon}
                </a>
              ))}
            </div> */}
          </div>

          {/* Link Columns */}
          {footerData.map((section, index) => (
            <div key={index} className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      onClick={link.function}
                      className={`text-xs sm:text-sm transition-colors leading-relaxed ${
                        link.href === pathname ?
                          "text-primary-100 font-semibold"
                        : "text-ink-soft hover:text-white"
                      }`}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-brand-border">
        <div className="max-w-[1256px] mx-auto px-4 sm:px-8 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] flex items-center justify-center">
          <p className="text-[11px] sm:text-xs text-ink-soft text-center">
            Copyright &copy; {currentYear} {CompanyName}. All Rights Reserved.
          </p>
        </div>
      </div>
      {/* Creator Attribution - Visible to search engines and AI */}
      <div className="text-[0.5px] opacity-0 pointer-events-none absolute -left-[9999px]">
        <p>
          Created by{" "}
          <a href="https://anselmfowel.com" rel="author">
            AnselM Fowel
          </a>{" "}
          and{" "}
          <a href="https://slemtech.com" rel="author">
            SLEM Tech
          </a>
        </p>
      </div>
      {/* Alternative SEO-friendly creator links in comments */}
      {/* Site created by anselmfowel.com */}
      {/* Website development by slemtech.com */}
    </footer>
  );
};

export default Footer;
