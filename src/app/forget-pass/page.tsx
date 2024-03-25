import ForgetPassForm from "./ForgetPassForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "forget paswword",
  description: "enter your email to send your the reset code",
};

export default function ForgetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center p-4 lg:justify-center">
      <div className="max flex flex-col overflow-hidden rounded-md bg-white shadow-lg md:flex-1 md:flex-row lg:max-w-screen-md">
        <div className="bg-base-300 p-5 md:flex-1">
          <h3 className="my-4 text-center text-2xl font-semibold text-accent">
            Enter your Email to Reset Yout Password
          </h3>
         <ForgetPassForm />
        </div>
      </div>
    </div>
  );
}
