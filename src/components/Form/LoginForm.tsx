"use client";
import React, { useState, useTransition } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { LoginFormModel } from "../config/models";
import { useRouter } from "next/navigation";
import { AUTH_EMAIL, AUTH_TOKEN_KEY } from "@constants";
import Cookies from "js-cookie";
import { GoUnlock } from "react-icons/go";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-toastify";
import { useAppDispatch } from "../hooks";
import { authLogin } from "../Redux/Auth";
import Link from "next/link";
import TextInput from "../Reusables/TextInput";
import GlobalLoader from "../modal/GlobalLoader";
import FormToast from "../Reusables/Toast/SigninToast";
import { FiMail, FiLock, FiCheck } from "react-icons/fi";
import BrandLogo from "../common/BrandLogo";

const authBenefits = [
  "Track every order from procurement to your door",
  "Flexible pay-later plans on premium items",
  "Priority support from a dedicated account officer",
];

export const AuthBrandPanel = ({
  eyebrow,
  heading,
}: {
  eyebrow: string;
  heading: string;
}) => (
  <div className="hidden lg:flex flex-col justify-between bg-deep p-12 border-r border-brand-border">
    <Link href="/" className="flex items-center">
      <BrandLogo variant="full" mono />
    </Link>
    <div className="py-12">
      <span className="text-[11px] uppercase tracking-[0.35em] text-primary-100 font-semibold">
        {eyebrow}
      </span>
      <h2 className="mt-5 font-serif italic text-4xl font-bold text-white leading-[1.15]">
        {heading}
      </h2>
      <ul className="mt-9 flex flex-col gap-4">
        {authBenefits.map((b) => (
          <li key={b} className="flex items-start gap-3 text-sm text-ink-soft">
            <span className="mt-0.5 shrink-0 size-5 rounded-full bg-primary-100/15 text-primary-100 flex items-center justify-center">
              <FiCheck className="text-xs" />
            </span>
            {b}
          </li>
        ))}
      </ul>
    </div>
    <p className="text-xs text-ink-soft">
      &copy; {new Date().getFullYear()} NextBridge Limited
    </p>
  </div>
);

const inputBase =
  "w-full px-4 py-3.5 text-sm rounded-lg border bg-deep outline-none transition-all duration-300 text-white placeholder-white/30 focus:border-primary-100";

interface FormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: FormValues = { email: "", password: "" };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginFormModel,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/customer/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const json = await res.json();

        if (!res.ok) {
          toast.error(json.message ?? "Login failed");
          return;
        }

        const { token, user } = json.data;

        Cookies.set(AUTH_TOKEN_KEY, token);
        Cookies.set(AUTH_EMAIL, user.email);
        dispatch(authLogin({ token, user }));
        FormToast({ message: "Login Successful", success: true });
        startTransition(() => router.push("/"));
      } catch {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <div className="w-full max-w-5xl animate-fade-in grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-brand-border bg-surface">
        <AuthBrandPanel
          eyebrow="Welcome Back"
          heading="Pick up right where you left off."
        />

        {/* Form Body */}
        <div className="p-8 sm:p-12">
          <div className="mb-8">
            <h4 className="font-serif text-3xl font-bold text-white">
              Sign in
            </h4>
            <p className="text-sm text-ink-soft mt-2">
              Log in to your NextBridge Limited account.
            </p>
          </div>

          <FormikProvider value={formik}>
            <Form className="flex flex-col gap-5">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft mb-2">
                  <FiMail className="text-primary-100" /> Email address
                </label>
                <TextInput
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  className={`${inputBase} ${
                    formik.touched.email && formik.errors.email ?
                      "border-danger"
                    : "border-brand-border hover:border-white/20"
                  }`}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-danger text-xs mt-1 font-medium">
                    {formik.errors.email as string}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft mb-2">
                  <FiLock className="text-primary-100" /> Password
                </label>
                <TextInput
                  id="password"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  showPasswordIcon
                  showPassword={showPassword}
                  togglePasswordVisibility={() => setShowPassword((p) => !p)}
                  passwordIconClassname="text-ink-soft hover:text-primary-100 text-lg transition-colors"
                  className={`${inputBase} ${
                    formik.touched.password && formik.errors.password ?
                      "border-danger"
                    : "border-brand-border hover:border-white/20"
                  }`}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-danger text-xs mt-1 font-medium">
                    {formik.errors.password as string}
                  </p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="flex w-full justify-end mt-1">
                <Link
                  href="/user/forget-password"
                  className="text-primary-100 font-semibold text-xs hover:text-brand-navy transition-colors">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!formik.isValid || isLoading}
                className={`mt-2 flex items-center justify-center text-sm font-semibold uppercase tracking-[0.18em] py-4 w-full rounded-lg gap-2 transition-all duration-300 ${
                  formik.isValid && !isLoading ?
                    "bg-primary-100 text-brand-ink hover:bg-brand-navy cursor-pointer"
                  : "bg-white/5 text-ink-soft cursor-not-allowed"
                }`}>
                {isLoading ?
                  <ImSpinner2 className="text-xl animate-spin" />
                : <>
                    <GoUnlock className="text-lg" />
                    Secure Login
                  </>
                }
              </button>

              {/* Sign Up Link */}
              <div className="flex justify-center text-xs sm:text-sm mt-4 text-ink-soft">
                <span>Don&rsquo;t have an account?&nbsp;</span>
                <span
                  onClick={() =>
                    startTransition(() => router.push("/user/register"))
                  }
                  className="text-primary-100 font-semibold hover:text-brand-navy cursor-pointer transition-colors">
                  Create one now
                </span>
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>

      <GlobalLoader isPending={isPending} />
    </>
  );
};

export default LoginForm;
