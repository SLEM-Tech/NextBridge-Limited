"use client";
import React, { useState } from "react";
import { Formik, Form, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { ForgetPasswordFormModel } from "../config/models";
import AuthModal from "../modal/AuthModal";
import { forgotPassword } from "@utils/endpoints";
import { useMutation } from "react-query";
import { APICall } from "@utils";
import { ImSpinner2 } from "react-icons/im";
import Link from "next/link";
import TextInput from "../Reusables/TextInput";
import { FiMail, FiSend } from "react-icons/fi";
import { AuthBrandPanel } from "./LoginForm";

const inputBase =
  "w-full px-4 py-3.5 text-sm rounded-lg border bg-deep outline-none transition-all duration-300 text-white placeholder-white/30 focus:border-primary-100";

interface FormValues {
  email: string;
}

const ForgotPasswordForm = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const initialValues: FormValues = {
    email: "",
  };

  const forgotPasswordMutation = useMutation(
    async (value: FormValues) => {
      const response = await APICall(forgotPassword, value, true, true);
      return response;
    },
    {
      onSuccess: async (data, variable: FormValues) => {
        if (data?.data?.message === "Password reset email sent successfully.") {
          handleOpenModal();
          formik.resetForm();
        }
      },
      onError: (error: any) => {},
    },
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ForgetPasswordFormModel,
    onSubmit: async (values) => {
      await forgotPasswordMutation.mutateAsync(values);
    },
  });

  const AuthModalContent = () => (
    <div className="py-8 space-y-6 flex flex-col items-center animate-fade-in">
      <div className="size-20 rounded-full bg-primary-100/15 flex items-center justify-center text-primary-100 mb-2">
        <FiSend className="text-3xl" />
      </div>
      <h3 className="font-serif text-xl md:text-2xl font-bold text-white text-center px-4">
        Reset link sent successfully!
      </h3>
      <p className="text-sm text-ink-soft text-center px-6 leading-relaxed">
        We&apos;ve sent an email with instructions to reset your password.
        Please check your inbox.
      </p>
      <button
        className="mt-4 bg-primary-100 text-brand-ink px-8 py-3 rounded-lg text-xs font-semibold uppercase tracking-[0.18em] transition-all hover:bg-brand-navy"
        onClick={() => router.push("/user/login")}>
        Return to Login
      </button>
    </div>
  );

  return (
    <>
      <div className="w-full max-w-5xl animate-fade-in grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-brand-border bg-surface">
        <AuthBrandPanel
          eyebrow="Account Recovery"
          heading="We'll help you back into your account."
        />

        {/* Form Body */}
        <div className="p-8 sm:p-12">
          <div className="mb-8">
            <h4 className="font-serif text-3xl font-bold text-white">
              Forgot password
            </h4>
            <p className="text-sm text-ink-soft mt-2">
              Enter your email and we&apos;ll send you a reset link.
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
                  placeholder="Enter your email address"
                  type="email"
                  className={`${inputBase} ${
                    formik.touched.email && formik.errors.email
                      ? "border-danger"
                      : "border-brand-border hover:border-white/20"
                  }`}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-danger text-xs mt-1 font-medium">
                    {formik.errors.email as string}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!formik.isValid || forgotPasswordMutation.isLoading}
                className={`mt-3 flex items-center justify-center text-sm font-semibold uppercase tracking-[0.18em] py-4 w-full rounded-lg gap-2 transition-all duration-300 ${
                  formik.isValid && !forgotPasswordMutation.isLoading
                    ? "bg-primary-100 text-brand-ink hover:bg-brand-navy cursor-pointer"
                    : "bg-white/5 text-ink-soft cursor-not-allowed"
                }`}>
                {forgotPasswordMutation.isLoading ? (
                  <ImSpinner2 className="text-xl animate-spin" />
                ) : (
                  <>
                    <FiSend className="text-lg" />
                    Send Reset Link
                  </>
                )}
              </button>

              {/* Login Link */}
              <div className="flex justify-center text-xs sm:text-sm mt-4 text-ink-soft">
                <span>Remember your password?&nbsp;</span>
                <Link
                  href="/user/login"
                  className="text-primary-100 font-semibold hover:text-brand-navy transition-colors">
                  Log in here
                </Link>
              </div>
            </Form>
          </FormikProvider>
        </div>
        <AuthModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          content={<AuthModalContent />}
        />
      </div>
    </>
  );
};

export default ForgotPasswordForm;
