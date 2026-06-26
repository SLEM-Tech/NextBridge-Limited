"use client";
import React, { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { RegisterFormModel } from "../config/models";
import { useRouter } from "next/navigation";
import { AUTH_TOKEN_KEY, AUTH_EMAIL } from "@constants";
import Cookies from "js-cookie";
import FormToast from "../Reusables/Toast/SigninToast";
import { ImSpinner2 } from "react-icons/im";
import TextInput from "../Reusables/TextInput";
import axios from "axios";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { AuthBrandPanel } from "./LoginForm";

const inputBase =
  "w-full px-4 py-3.5 text-sm rounded-lg border bg-deep outline-none transition-all duration-300 text-white placeholder-white/30 focus:border-primary-100";

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordVisibility = () => setShowPassword((p) => !p);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    } as FormValues,
    validationSchema: RegisterFormModel,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        // Step 1: create pending user → get verification token
        const step1 = await axios.post("/api/customer/verify-email", {
          name: `${values.first_name.trim()} ${values.last_name.trim()}`,
          email: values.email,
          password: values.password,
        });

        const verificationToken = step1.data?.token;
        if (!verificationToken) {
          FormToast({
            message: "Registration failed. Please try again.",
            success: false,
          });
          return;
        }

        // Step 2: activate account with the verification token
        const step2 = await axios.post(
          `/api/customer/register/${verificationToken}`,
        );

        const jwtToken = step2.data?.token;
        if (jwtToken) {
          Cookies.set(AUTH_TOKEN_KEY, jwtToken);
          Cookies.set(AUTH_EMAIL, values.email);
          FormToast({
            message: "Account created successfully!",
            success: true,
          });
          resetForm();
          router.push("/");
        } else {
          FormToast({
            message: "Account activation failed. Please try again.",
            success: false,
          });
        }
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Something went wrong. Please try again.";
        FormToast({ message, success: false });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="w-full max-w-5xl animate-fade-in grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-brand-border bg-surface">
      <AuthBrandPanel
        eyebrow="Join NextBridge"
        heading="Create an account to start your procurement."
      />

      {/* Form Body */}
      <div className="p-8 sm:p-12">
        <div className="mb-8">
          <h4 className="font-serif text-3xl font-bold text-white">
            Create account
          </h4>
          <p className="text-sm text-ink-soft mt-2">
            It only takes a minute to get started.
          </p>
        </div>

        <FormikProvider value={formik}>
          <Form className="flex flex-col gap-5">
            {/* Name Fields Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="first_name"
                  className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft mb-2">
                  <FiUser className="text-primary-100" /> First Name
                </label>
                <TextInput
                  id="first_name"
                  placeholder="John"
                  type="text"
                  className={`${inputBase} ${
                    formik.touched.first_name && formik.errors.first_name ?
                      "border-danger"
                    : "border-brand-border hover:border-white/20"
                  }`}
                />
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft mb-2">
                  <FiUser className="text-primary-100" /> Last Name
                </label>
                <TextInput
                  id="last_name"
                  placeholder="Doe"
                  type="text"
                  className={`${inputBase} ${
                    formik.touched.last_name && formik.errors.last_name ?
                      "border-danger"
                    : "border-brand-border hover:border-white/20"
                  }`}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft mb-2">
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
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft mb-2">
                <FiLock className="text-primary-100" /> Password
              </label>
              <TextInput
                id="password"
                placeholder="Create a strong password"
                type={showPassword ? "text" : "password"}
                showPasswordIcon
                showPassword={showPassword}
                togglePasswordVisibility={handlePasswordVisibility}
                passwordIconClassname="text-ink-soft hover:text-primary-100 text-lg transition-colors"
                className={`${inputBase} ${
                  formik.touched.password && formik.errors.password ?
                    "border-danger"
                  : "border-brand-border hover:border-white/20"
                }`}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!formik.isValid || isLoading}
              className={`mt-3 flex items-center justify-center text-sm font-semibold uppercase tracking-[0.18em] py-4 w-full rounded-lg gap-2 transition-all duration-300 ${
                formik.isValid && !isLoading ?
                  "bg-primary-100 text-brand-ink hover:bg-brand-navy cursor-pointer"
                : "bg-white/5 text-ink-soft cursor-not-allowed"
              }`}>
              {isLoading ?
                <ImSpinner2 className="text-xl animate-spin" />
              : "Create Account"}
            </button>

            {/* Login Link */}
            <div className="flex justify-center text-xs sm:text-sm mt-2 text-ink-soft">
              <span>Already have an account?&nbsp;</span>
              <span
                onClick={() => router.push("/user/login")}
                className="text-primary-100 font-semibold hover:text-brand-navy cursor-pointer transition-colors">
                Log in
              </span>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default RegisterForm;
