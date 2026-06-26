"use client";
import React, { useState } from "react";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { convertToSlug, headerNavLinks } from "@constants";
import { usePathname, useRouter } from "next/navigation";
import { useGetMainCategoryQuery } from "../config/features/api";
import { useCategories } from "../lib/woocommerce";
import useToken from "../hooks/useToken";
import { BiUser } from "react-icons/bi";
import { FiLogOut, FiShoppingCart } from "react-icons/fi";
import { FaCartArrowDown } from "react-icons/fa";
import { signOut } from "@utils/lib";

interface MobileNavProps {
  closeDrawer: () => void;
  drawerVisible: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({
  closeDrawer,
  drawerVisible,
}) => {
  // State to hold products by category
  const [categoryProductsMap, setCategoryProductsMap] = useState<{
    [key: string]: ProductType[];
  }>({});
  // WooCommerce API Category
  const {
    data: categories,
    isLoading: categoryWpIsLoading,
    isError: categoryIsError,
  } = useCategories("");

  const Categories: CategoryType[] = categories ?? [];
  const [activeTab, setActiveTab] = useState<string>("allCategory");
  const pathname = usePathname();
  const router = useRouter();
  const { token, email } = useToken();
  const isLoggedIn = !!token;

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <AnimatePresence>
      {drawerVisible && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}>
          <Drawer
            width="100%"
            open={drawerVisible}
            onClose={closeDrawer}
            placement={"left"}>
            <div className="flex flex-col gap-2 py-4 px-4 items-center">
              <button onClick={closeDrawer} className="self-end">
                <IoMdClose
                  size={24}
                  className="hover:scale-125 transition text-primary-100"
                />
              </button>
              <div className="flex w-fit gap-2 mt-4 text-base leading-[140%] bg-light p-1 rounded-md transition">
                <motion.button
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`px-4 py-2 rounded-md ${
                    activeTab === "allCategory" ?
                      "bg-white text-primary-200"
                    : "bg-light text-gray-600"
                  }`}
                  onClick={() => handleTabClick("allCategory")}>
                  All Category
                </motion.button>
                <motion.button
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`px-4 py-2 rounded-md ${
                    activeTab === "others" ?
                      "bg-white text-primary-200"
                    : "bg-light text-gray-600"
                  }`}
                  onClick={() => handleTabClick("others")}>
                  Others
                </motion.button>
              </div>
              <div className="flex w-full flex-col gap-4 text-lg px-3 pt-3">
                {activeTab === "allCategory" && (
                  <div className="flex flex-col gap-4 mt-3 text-base font-semibold text-black">
                    {Categories &&
                      Categories.filter(
                        (item) => item.name.toLowerCase() !== "uncategorized",
                      ).map((item) => {
                        return (
                          <span
                            onClick={() =>
                              router.push(
                                `${
                                  "/category/" +
                                  convertToSlug(item?.name) +
                                  "-" +
                                  item?.id
                                }`,
                              )
                            }
                            key={item?.id}
                            className="cursor-pointer hover:text-primary-100 transition"
                            dangerouslySetInnerHTML={{ __html: item?.name }}
                          />
                        );
                      })}
                  </div>
                )}
                {activeTab === "others" && (
                  <div className="flex flex-col gap-4 mt-3 text-base font-semibold text-black">
                    {headerNavLinks.map((link) => (
                      <Link
                        key={link.id}
                        href={link.href}
                        className={`text-base w-fit font-[500] leading-[1.8] transition hover:text-primary-100 relative group ${
                          pathname === link.href ?
                            "text-primary-100"
                          : "text-black/80"
                        }`}>
                        {link.text}
                        <span
                          className={`h-[1px] inline-block bg-effect absolute left-0 -bottom-0 group-hover:w-full transition-width ease duration-300 ${
                            pathname === link.href ? "w-full" : "w-0"
                          }`}>
                          &nbsp;
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Account Section */}
              <div className="w-full mt-auto pt-6 pb-4 border-t border-gray-100">
                {isLoggedIn ? (
                  <div className="flex flex-col gap-4 px-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="size-10 rounded-full bg-primary-100/10 flex items-center justify-center text-primary-100 text-xl font-bold">
                        {email?.[0].toUpperCase() || "U"}
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-xs text-gray-500">Account</span>
                        <span className="text-sm font-bold text-gray-900 truncate">{email}</span>
                      </div>
                    </div>
                    
                    <Link 
                      href="/user/dashboard" 
                      onClick={closeDrawer}
                      className="flex items-center gap-3 text-base font-semibold text-gray-700 hover:text-primary-100 transition"
                    >
                      <BiUser size={20} /> My Account
                    </Link>
                    <Link 
                      href="/user/my-orders" 
                      onClick={closeDrawer}
                      className="flex items-center gap-3 text-base font-semibold text-gray-700 hover:text-primary-100 transition"
                    >
                      <FaCartArrowDown size={20} /> My Orders
                    </Link>
                    <button 
                      onClick={() => {
                        signOut();
                        closeDrawer();
                      }}
                      className="flex items-center gap-3 text-base font-bold text-red-500 hover:text-red-600 transition"
                    >
                      <FiLogOut size={20} /> Log Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 px-3">
                    <p className="text-sm text-gray-500 mb-1">Welcome! Manage your account</p>
                    <div className="flex gap-3">
                      <Link
                        href="/user/login"
                        onClick={closeDrawer}
                        className="flex-1 py-3 bg-primary-100 text-white text-center rounded-xl font-bold text-sm shadow-sm active:scale-95 transition-transform"
                      >
                        Login
                      </Link>
                      <Link
                        href="/user/register"
                        onClick={closeDrawer}
                        className="flex-1 py-3 bg-white border border-gray-200 text-gray-900 text-center rounded-xl font-bold text-sm shadow-sm active:scale-95 transition-transform"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Drawer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
