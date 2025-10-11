'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { ProfileFormSchemaValues, profileSchema } from '@/schemas/account'
import { useUserStore } from '@/zustand/useUserStore'

const AccountInfo = () => {
  const [isEditing, setIsEditing] = useState(false)
  const { user, setUser } = useUserStore()
  const queryClient = useQueryClient()

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

  // ✅ Fetch user info
  const {
    data: userRes,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['user', user?.id],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/api/v1/user/${user?.id}`, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      })
      if (!res.ok) throw new Error('Failed to fetch user data')
      return res.json()
    },
    enabled: !!user?.id && !!user?.accessToken,
    staleTime: 0,
    refetchOnMount: 'always',
  })

  const currentUser = userRes?.data || user

  // ✅ Form setup
  const form = useForm<ProfileFormSchemaValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      bio: '',
    },
  })

  // ✅ Update form values when data changes
  useEffect(() => {
    if (currentUser) {
      form.reset({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || '',
        phoneNumber: currentUser.phoneNumber || '',
        bio: currentUser.bio || '',
      })
    }
  }, [currentUser, form])

  // ✅ Mutation for updating profile
  const { mutate, isPending } = useMutation({
    mutationFn: async (body: ProfileFormSchemaValues) => {
      const res = await fetch(`${baseUrl}/api/v1/user/${user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('Failed to update profile')
      return res.json()
    },
    onSuccess: async (res) => {
      setIsEditing(false)
      if (res?.data) {
        // ✅ fix: avoid `(prev:any)` type issue
        setUser({
          ...user,
          ...res.data,
        })
      }
      await queryClient.invalidateQueries({ queryKey: ['user', user?.id] })
      refetch()
    },
  })

  const onSubmit = (values: ProfileFormSchemaValues) => mutate(values)

  // ✅ Skeleton loader
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    )
  }

  if (isError || !currentUser) {
    return (
      <p className="text-center text-red-500 py-10">Failed to load user info</p>
    )
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
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-light tracking-wider">
                      First Name
                    </FormLabel>
                    {isEditing ? (
                      <FormControl>
                        <Input
                          {...field}
                          className="border-b border-gray-300 rounded-none px-2 py-1 text-sm"
                        />
                      </FormControl>
                    ) : (
                      <p className="text-base mt-1 mb-6 text-gray-700 tracking-widest">
                        {field.value || 'N/A'}
                      </p>
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
                    <FormLabel className="text-sm font-light tracking-wider">
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
                      <p className="text-base tracking-wider text-gray-700 mt-1 mb-6">
                        {field.value || 'N/A'}
                      </p>
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
                    <FormLabel className="text-sm font-light tracking-wider">
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
                      <p className="text-base text-gray-700 mt-1 tracking-wide mb-6">
                        {field.value || 'N/A'}
                      </p>
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
                    <FormLabel className="text-sm font-light tracking-wider">
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
                      <p className="text-base tracking-wider text-gray-700 mt-1 mb-6">
                        {field.value || 'N/A'}
                      </p>
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
                    <FormLabel className="text-sm font-light tracking-wider">
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
                      <p className="text-base text-gray-700 tracking-wider mt-1 mb-6">
                        {field.value || 'N/A'}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Action Buttons */}
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
                  disabled={isPending}
                  className="text-xs rounded-none border border-gray-300 hover:bg-transparent hover:text-black font-light tracking-wider"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin w-4 h-4" />
                  ) : (
                    'Save Now'
                  )}
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
