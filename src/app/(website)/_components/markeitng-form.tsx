"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

// 1. Define Zod schema
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

// 2. Type for form data
type EmailFormData = z.infer<typeof emailSchema>;

export default function EmailForm() {
  // 3. Initialize React Hook Form
  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: EmailFormData) => {
    console.log("Email submitted:", data.email);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="  max-w-[500px]">
        <div className="flex items-center border-b-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full border-0 inset-0 focus-visible:ring-0  outline-none shadow-none"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="ghost" size="icon">
            <ArrowRight />
          </Button>
        </div>
      </form>
    </Form>
  );
}
