'use client'
import React from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

type FormValues = {
  name: string
  email: string
  message: string
}

const ContactForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const onSubmit = (data: FormValues) => {
    console.log('Contact Form Data:', data)
  }

  return (
    <div className="mt-16">
      <div className="">
        {/* form part */}
        <div className="md:col-span-2 md:pr-[50px] lg:pr-[100px]">
          <h2 className="text-2xl md:text-[27px] uppercase lg:text-3xl font-light tracking-[.1em] text-gray-700 leading-[36px] pb-[25px] md:pb-[35px] lg:pb-[45px] text-right">
            Contact Us
          </h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 md:space-y-7"
            >
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] font-inter font-normal text-black leading-[20px] uppercase">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-t-0 border-l-0 border-r-0 border-b border-black rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 shadow-none"
                      />
                    </FormControl>
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
                    <FormLabel className="text-sm font-normal text-black leading-[20px] uppercase">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        className="border-t-0 border-l-0 border-r-0 border-b border-black rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 shadow-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal text-black leading-[20px] uppercase">
                      How can we help
                    </FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        rows={4}
                        className="w-full border-t-0 border-l-0 border-r-0 border-b border-black rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 shadow-none resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit button */}
              <div className="w-full flex justify-center items-center pt-5">
                <button
                  className={cn(
                    'text-sm font-normal disabled:text-black/60 text-black leading-[20px] border-b border-black py-[10px] uppercase flex items-center gap-x-3 bg-transparent',
                    'opacity-50'
                  )}
                  type="submit"
                >
                  {false ? (
                    <>
                      Please wait <Loader2 className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
