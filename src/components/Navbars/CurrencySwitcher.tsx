"use client";
import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import Flag from "react-world-flags";
import { SlArrowDown } from "react-icons/sl";
import { FiCheck } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { useAppDispatch, useAppSelector } from "../hooks";
import { APICall } from "@utils";
import { fetchExchangeRate } from "@utils/endpoints";
import { setBaseCurrency, setExchangeRate } from "../Redux/Currency";
import { currencyOptions } from "@constants";
import FormToast from "../Reusables/Toast/SigninToast";

interface CurrencySwitcherProps {
  variant?: "desktop" | "mobile";
}

const CurrencySwitcher = ({ variant = "desktop" }: CurrencySwitcherProps) => {
  const dispatch = useAppDispatch();
  const { baseCurrency } = useAppSelector((s) => s.currency);
  const [loadingCode, setLoadingCode] = useState<string | null>(null);

  const handleSelect = async (code: string) => {
    if (code === baseCurrency.code) return;
    const selected = currencyOptions.find((c) => c.code === code);
    if (!selected) return;

    setLoadingCode(code);
    try {
      const rate = await APICall(fetchExchangeRate, ["NGN", code], true, true);
      if (rate) {
        dispatch(setExchangeRate(rate));
        dispatch(
          setBaseCurrency({
            code: selected.code,
            symbol: selected.symbol,
            countryCode: selected.countryCode,
          }),
        );
        FormToast({ message: `Switched to ${code}`, success: true });
      }
    } catch {
      FormToast({ message: "Currency switch failed", success: false });
    } finally {
      setLoadingCode(null);
    }
  };

  const triggerClass =
    variant === "desktop"
      ? "flex items-center gap-2 cursor-pointer text-white/80 hover:text-primary-100 transition px-1"
      : "flex items-center gap-1.5 cursor-pointer text-white";

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className={triggerClass} aria-label="Change currency">
        <span className="size-5 overflow-hidden rounded-full ring-1 ring-white/15 flex items-center justify-center bg-deep">
          <Flag
            code={baseCurrency.countryCode}
            className="w-full h-full object-cover"
          />
        </span>
        <span className="text-[13px] font-semibold tracking-wide">
          {baseCurrency.code}
        </span>
        <SlArrowDown className="text-[9px] opacity-70" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right bg-surface border border-brand-border rounded-2xl shadow-xl p-1.5 z-[110] outline-none">
          <div className="px-3 py-2 mb-1 border-b border-brand-border">
            <p className="text-[10px] uppercase tracking-[0.22em] text-ink-soft">
              Currency
            </p>
            <p className="text-sm font-semibold text-white truncate">
              Display prices in
            </p>
          </div>

          <div className="flex flex-col gap-0.5">
            {currencyOptions.map((c) => {
              const isActive = c.code === baseCurrency.code;
              const isLoading = loadingCode === c.code;
              return (
                <Menu.Item key={c.code}>
                  {({ active: hovered }) => (
                    <button
                      onClick={() => handleSelect(c.code)}
                      disabled={!!loadingCode}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                        hovered ? "bg-white/5" : ""
                      } ${isActive ? "text-primary-100" : "text-white/85"}`}>
                      <span className="size-7 overflow-hidden rounded-full ring-1 ring-white/15 shrink-0 bg-deep flex items-center justify-center">
                        <Flag
                          code={c.countryCode}
                          className="w-full h-full object-cover"
                        />
                      </span>
                      <span className="flex-1 text-left">
                        <span className="block font-semibold">
                          {c.code}
                          <span className="text-ink-soft font-normal">
                            {" "}
                            · {c.symbol}
                          </span>
                        </span>
                        <span className="block text-[11px] text-ink-soft">
                          {c.country}
                        </span>
                      </span>
                      {isLoading ? (
                        <ImSpinner2 className="animate-spin text-primary-100" />
                      ) : isActive ? (
                        <FiCheck className="text-primary-100" />
                      ) : null}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default CurrencySwitcher;
