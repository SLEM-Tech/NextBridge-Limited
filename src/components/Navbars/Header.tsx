"use client";
import React, { useMemo, useState, useTransition, Fragment, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { useAppDispatch, useAppSelector } from "../hooks";
import Drawer from "rc-drawer";
import { useCustomer } from "../lib/woocommerce";
import {
  currencyOptions,
  filterCustomersByEmail,
  headerNavLinks,
} from "@constants";
import { getFirstCharacter, signOut } from "@utils/lib";
import { LogoImage } from "@utils/function";
import BrandLogo from "../common/BrandLogo";
import Picture from "../picture/Picture";
import { APICall } from "@utils";
import { fetchExchangeRate } from "@utils/endpoints";
import { setBaseCurrency, setExchangeRate } from "../Redux/Currency";
import FormToast from "../Reusables/Toast/SigninToast";
import useToken from "../hooks/useToken";

// Headless UI Components
import { Menu, Transition } from "@headlessui/react";
import {
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiLogOut,
  FiMenu,
  FiSettings,
  FiShoppingCart,
  FiBookmark,
} from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import Flag from "react-world-flags";
import GlobalLoader from "../modal/GlobalLoader";
import MobileNav from "./MobileNav";
import ProductTable from "../Tables/ProductTable";
import CategoryPageBottomHeader from "./CategoryPageBottomHeader";
import ProductPageBottomHeader from "./ProductPageBottomHeader";
import HomePageBottomHeader from "./HomePageBottomHeader";
import CurrencySwitcher from "./CurrencySwitcher";
import { FaCartArrowDown } from "@node_modules/react-icons/fa";
import { BiUser } from "@node_modules/react-icons/bi";
import { ImSpinner2 } from "@node_modules/react-icons/im";
import { logoImage } from "@public/images";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { email, token } = useToken();
  const isLoggedIn = !!token;
  const { totalItems } = useCart();

  const [isPending, startTransition] = useTransition();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { data: customer } = useCustomer("");
  const wc_customer_info = useMemo(
    () => filterCustomersByEmail(customer as Woo_Customer_Type[], email),
    [customer, email],
  );

  // Detect if we're on the home page (for transparent header)
  const isHomePage = pathname === "/";

  // Handle scroll to toggle header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onOpenCart = () => setIsCartOpen(true);
  const onCloseCart = () => setIsCartOpen(false);

  const handleSearch = () => {
    if (!searchValue) return;

    startTransition(() => {
      router.push(`/search?${searchValue}`);
    });
  };

  const userDropDownLinks = [
    {
      id: 1,
      href: "/user/dashboard",
      icon: <BiUser />,
      label: "My Account",
    },
    {
      id: 2,
      href: "/user/my-orders",
      icon: <FaCartArrowDown />,
      label: "Orders",
    },
    { id: 3, onClick: onOpenCart, icon: <FiShoppingCart />, label: "Cart" },
  ];

  // Determine if header should be transparent (only on home page, not scrolled)
  const isTransparent = isHomePage && !isScrolled;

  return (
    <>
      <header
        className={`flex flex-col w-full z-[100] fixed top-0 transition-all duration-300 ${
          isTransparent
            ? "bg-transparent"
            : "bg-deep backdrop-blur-md border-b border-brand-border"
        }`}>
        {/* Desktop Header */}
        <div className="hidden slg:flex items-center w-full py-3 max-w-[1440px] px-8 mx-auto">
          <div className="flex items-center justify-between w-full rounded-full px-6 py-3 transition-all duration-300">
            {/* Left – Logo */}
            <Link href="/" className="shrink-0 flex items-center">
              <BrandLogo variant="full" mono />
            </Link>

            {/* Center – Nav Links */}
            <nav className="flex items-center gap-8">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`text-[14px] font-medium transition relative group ${
                    (
                      pathname === link.href ||
                      (link.href !== "/" &&
                        pathname.startsWith(link.href.split("?")[0]))
                    ) ?
                      "text-primary-100 font-semibold"
                    : "text-white/70 hover:text-primary-100"
                  }`}>
                  {link.text}
                  {/* Active underline */}
                  {(pathname === link.href ||
                    (link.href !== "/" &&
                      pathname.startsWith(link.href.split("?")[0]))) && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary-100 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right – Search / Cart / CTA */}
            <div className="flex items-center gap-4 shrink-0">
              {/* Search Icon */}
              <div className="flex items-center">
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out flex items-center ${
                    isSearchOpen ? "w-48 opacity-100" : "w-0 opacity-0"
                  }`}>
                  <input
                    type="text"
                    placeholder="Search Archives..."
                    className="w-full h-9 text-[13px] bg-white/10 rounded-l-full pl-4 pr-2 border-none outline-none focus:ring-0 text-white placeholder-white/40"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                        setIsSearchOpen(false);
                      }
                    }}
                    autoFocus={isSearchOpen}
                  />
                </div>
                <button
                  onClick={() => {
                    if (isSearchOpen && searchValue.trim()) {
                      handleSearch();
                    } else {
                      setIsSearchOpen(!isSearchOpen);
                    }
                  }}
                  className={`flex items-center justify-center size-10 rounded-full transition cursor-pointer shrink-0 ${
                    isSearchOpen
                      ? "bg-white/10 text-white"
                      : "bg-primary-100 text-brand-ink hover:bg-brand-navy"
                  }`}>
                  {isPending && searchValue ?
                    <ImSpinner2 className="text-lg animate-spin" />
                  : <FiSearch className="text-lg" />}
                </button>
              </div>

              {/* Cart */}
              <button
                className="flex items-center gap-2 cursor-pointer transition group text-white/80 hover:text-primary-100"
                onClick={onOpenCart}>
                <div className="relative">
                  <FiShoppingBag className="text-xl" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 size-4 bg-primary-100 rounded-full text-[9px] flex items-center justify-center text-white font-bold">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="text-[14px] font-medium">Cart</span>
              </button>

              {/* Divider dot */}
              <div className="w-1 h-1 rounded-full bg-white/20" />

              {/* Currency Switcher */}
              <CurrencySwitcher variant="desktop" />

              {/* Divider dot */}
              <div className="w-1 h-1 rounded-full bg-white/20" />

              {/* Get Started / Account Button */}
              {isLoggedIn ? (
                <Menu as="div" className="relative inline-block text-left">
                  {({ open }) => (
                    <>
                      <Menu.Button className="flex items-center gap-1.5 cursor-pointer group outline-none focus:ring-0 bg-primary-100 text-brand-ink px-5 py-2.5 rounded-full text-[13px] font-semibold hover:bg-brand-navy transition">
                        <BiUser className="text-lg" />
                        <span>Account</span>
                      </Menu.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Menu.Items className="absolute right-0 mt-2 w-52 origin-top-right bg-white border border-gray-200 rounded-2xl shadow-xl p-1.5 z-[110] outline-none">
                          <div className="px-3 py-2 mb-1 border-b border-gray-100">
                            <p className="text-xs text-gray-400">Logged in as</p>
                            <p className="text-sm font-bold text-gray-900 truncate">
                              {wc_customer_info?.first_name || email || "User"}
                            </p>
                          </div>

                          <div className="flex flex-col gap-0.5">
                            {userDropDownLinks.map((item) => (
                              <Menu.Item key={item.id}>
                                {({ active }) => (
                                  <button
                                    onClick={(e) => {
                                      if (item.onClick) {
                                        e.preventDefault();
                                        item.onClick();
                                      } else if (item.href) {
                                        router.push(item.href);
                                      }
                                    }}
                                    className={`${
                                      active ?
                                        "bg-gray-50 text-gray-900"
                                      : "text-gray-600"
                                    } flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors`}>
                                    <span className="text-lg">{item.icon}</span>
                                    {item.label}
                                  </button>
                                )}
                              </Menu.Item>
                            ))}
                          </div>

                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => signOut()}
                                className={`${
                                  active ? "bg-red-50" : ""
                                } flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-500 font-bold transition-colors mt-1`}>
                                <FiLogOut /> Log Out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              ) : (
                <Link
                  href="/user/login"
                  className="bg-primary-100 text-brand-ink px-6 py-2.5 rounded-full text-[13px] font-semibold hover:bg-brand-navy transition-colors shadow-lg">
                  Get started
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div
          className={`slg:hidden flex flex-col w-full px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 gap-3 transition-all duration-300 ${
            isTransparent
              ? "bg-transparent"
              : "bg-deep backdrop-blur-md border-b border-brand-border"
          }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <FiMenu
                className="text-2xl cursor-pointer active:scale-90 transition-transform text-white"
                onClick={() => setDrawerVisible(true)}
              />
              <Link href="/" className="shrink-0 flex items-center">
                <BrandLogo variant="mark" mono />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <CurrencySwitcher variant="mobile" />
              <div
                onClick={onOpenCart}
                className="relative cursor-pointer active:scale-90 transition-transform">
                <FiShoppingBag className="text-2xl text-white" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 size-4 bg-primary-100 rounded-full text-[9px] flex items-center justify-center text-white">
                    {totalItems}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="relative h-11">
            <input
              type="text"
              placeholder="Search Archives..."
              className="w-full h-full text-sm rounded-lg px-4 border border-brand-border outline-none focus:ring-2 focus:ring-primary-100 bg-white/10 backdrop-blur-sm text-white placeholder-white/40"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            {isPending ?
              <ImSpinner2 className="absolute right-3 top-1/3 text-primary-100 animate-spin" />
            : <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
            }
          </div>
        </div>

        {/* Conditional Bottom Headers */}
        {pathname.includes("/category") ?
          <CategoryPageBottomHeader />
        : pathname.includes("/home-item") ?
          null
        : <HomePageBottomHeader />}
      </header>

      <Drawer
        open={isCartOpen}
        onClose={onCloseCart}
        placement="right"
        width={
          typeof window !== "undefined" && window.innerWidth > 768 ?
            500
          : "100%"
        }>
        <ProductTable onClose={onCloseCart} />
      </Drawer>

      <GlobalLoader isPending={isPending} />
      <MobileNav
        closeDrawer={() => setDrawerVisible(false)}
        drawerVisible={drawerVisible}
      />
    </>
  );
};

export default Header;
