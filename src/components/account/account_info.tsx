'use client'

import { Button } from '@/components/ui/button'
import { ProfileFormSchemaValues, profileSchema } from '@/schemas/account'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

// ✅ তোমার User টাইপ
interface User {
  id: string
  firstName?: string
  lastName?: string
  role?: string
  email?: string
  profileImage?: string
  accessToken?: string
}

// ✅ props টাইপ নির্ধারণ
interface AccountInfoProps {
  user: User | null
}

const AccountInfo = ({ user }: AccountInfoProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationKey: ['profileEdit'],
    mutationFn: (body: ProfileFormSchemaValues) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/${user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify(body),
      }).then((res) => res.json()),
    onSuccess: (res) => {
      console.log(res)
      setIsEditing(false)
    },
  })

  const form = useForm<ProfileFormSchemaValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phoneNumber: '',
      bio: '',
    },
  })

  const onSubmit = (values: ProfileFormSchemaValues) => {
    mutate(values)
  }

  return (
    <section>
      <div>
        <h2 className="text-lg tracking-widest font-light mb-6 border-black border-b-[1px] pb-5">
          Account Info
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-light tracking-wide">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-light tracking-wider">
                      Full Name
                    </FormLabel>
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
                    <FormLabel className="text-lg font-light tracking-wider">
                      Email
                    </FormLabel>
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

              {/* Bio */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-light tracking-wider">
                      Bio
                    </FormLabel>
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
                    <FormLabel className="text-lg font-light tracking-wider">
                      Last Name
                    </FormLabel>
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
                    <FormLabel className="text-lg font-light tracking-wider">
                      Phone
                    </FormLabel>
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
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-4">
            {isEditing ? (
              <div className="flex gap-x-3">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(false)}
                  className="text-xs rounded-none border border-gray-300 hover:bg-transparent hover:text-black font-light tracking-wider"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="text-xs rounded-none border border-gray-300 hover:bg-transparent hover:text-black font-light tracking-wider"
                >
                  Save Now {isPending && <Loader2 className="animate-spin" />}
                </Button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-base border-b border-black pb-1 hover:text-black font-light tracking-wider"
              >
                Edit Info
              </button>
            )}
          </div>
        </form>
      </Form>
    </section>
  )
}

export default AccountInfo
