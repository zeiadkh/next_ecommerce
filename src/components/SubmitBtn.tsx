"use client";

import React, { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type SubmitBtnType = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function SubmitBtn({
  children,
  className,
  ...props
}: SubmitBtnType) {
  const { pending } = useFormStatus();
  return (
    <button
      {...props}
      className={`btn btn-primary ${className}`}
      disabled={pending}
      type="submit"
    >
      {!pending && children}
      {pending && <span className="loading loading-spinner"></span>}
    </button>
  );
}
