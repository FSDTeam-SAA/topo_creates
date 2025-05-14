"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgotPasswordForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="mt-20">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-[20px] md:gap-[40px] lg:gap-[60px] px-5 md:px-0">
        {/* left side image part */}
        <div className="md:col-span-3">
          <Image
            src="/images/auth.jpg"
            alt="forgot-password"
            width={500}
            height={500}
            className="w-full h-[400px] md:h-[496px] object-cover"
          />
        </div>
        {/* form part */}
        <div className="md:col-span-2 md:pr-[50px] lg:pr-[100px]">
          <h2 className="text-2xl md:text-[27px] lg:text-3xl font-normal text-black leading-[36px] pb-[25px] md:pb-[35px] lg:pb-[45px] text-right">
            Forgot your password?
          </h2>
          <p className="text-base font-normal text-black mb-6 text-right">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-normal text-black leading-[20px] uppercase">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          className="border-t-0 border-l-0 border-r-0 border-b border-black rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 shadow-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full flex justify-center items-center pt-[20px]">
                <button
                  className="text-base font-normal text-black leading-[20px] border-b border-black py-[10px] uppercase"
                  type="submit"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </Form>
          <div className="w-full flex justify-end items-center pt-[25px] md:pt-[45px] lg:pt-[60px]">
            <Link href="/login">
              <button
                className="text-base font-normal text-black leading-[20px] border-b border-black py-[10px] uppercase"
                type="button"
              >
                Back to Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
