"use client";

import { Button } from "@/components/ui/button";
import { ProfileFormSchemaValues, profileSchema } from "@/schemas/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const AccountInfo = () => {
  const [isEditing, setIsEditing] = useState(false);

  const data = useSession({ required: true });

  const { mutate, isPending } = useMutation({
    mutationKey: ["profileEdit"],
    mutationFn: (body: ProfileFormSchemaValues) =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/${data.data?.user.id}`,
        {
          method: "PUT",
          body: JSON.stringify(body),
        }
      ).then((res) => res.json()),
    onSuccess: (res) => {
      console.log(res);
      setIsEditing(false);
      // Optionally, you can show a success message or update the UI
    },
  });

  const form = useForm<ProfileFormSchemaValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "Mehedi",
      lastName: "Hasan",
      email: "email@gmail.com",
      phoneNumber: "0154754545454",
    },
  });

  const onSubmit = (values: ProfileFormSchemaValues) => {
    mutate(values);
  };

  return (
    <section>
      <div className="mb-10">
        <h2 className="text-lg tracking-widest font-normal mb-6">
          Account Info
        </h2>
        <hr className="border border-black" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Full Name</FormLabel>
                    {isEditing ? (
                      <FormControl>
                        <Input
                          {...field}
                          className="border-b border-gray-300 rounded-none px-2 py-1 text-sm"
                        />
                      </FormControl>
                    ) : (
                      <p className="text-base mt-1 mb-6">{field.value}</p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Email</FormLabel>
                    {isEditing ? (
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="border-b border-gray-300 rounded-none px-2 py-1 text-sm"
                        />
                      </FormControl>
                    ) : (
                      <p className="text-base mt-1 mb-6">{field.value}</p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Bio</FormLabel>
                    {isEditing ? (
                      <FormControl>
                        <Textarea
                          {...field}
                          className="border-b border-gray-300 rounded-none px-2 py-1 text-sm"
                        />
                      </FormControl>
                    ) : (
                      <p className="text-base mt-1 mb-6">{field.value}</p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Last Name</FormLabel>
                    {isEditing ? (
                      <FormControl>
                        <Input
                          {...field}
                          className="border-b border-gray-300 rounded-none px-2 py-1 text-sm"
                        />
                      </FormControl>
                    ) : (
                      <p className="text-base mt-1 mb-6">{field.value}</p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Phone</FormLabel>
                    {isEditing ? (
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          className="border-b border-gray-300 rounded-none px-2 py-1 text-sm"
                        />
                      </FormControl>
                    ) : (
                      <p className="text-base mt-1 mb-6">{field.value}</p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Action Button */}
            </div>
          </div>
          <div className="flex justify-end pt-4">
            {isEditing ? (
              <div className="flex gap-x-3">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(false)}
                  className="text-xs rounded-none border border-gray-300 hover:bg-transparent hover:text-black"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="text-xs rounded-none border border-gray-300 hover:bg-transparent hover:text-black"
                >
                  Save Now {isPending && <Loader2 className="animate-spin" />}
                </Button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-base border-b border-black pb-1 hover:text-black"
              >
                Edit Info
              </button>
            )}
          </div>
        </form>
      </Form>
    </section>
  );
};

export default AccountInfo;
