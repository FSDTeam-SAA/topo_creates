'use client'
import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

type PlanFeature = {
  text: string
}

type PricingPlan = {
  id: string
  title: string
  subtitle: string
  price: string
  period: string
  commission: string
  features: PlanFeature[]
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'founders-collective',
    title: "FOUNDER'S COLLECTIVE",
    subtitle: 'Exclusive Onboarding Tier',
    price: 'FREE',
    period: 'FIRST 3 MONTHS',
    commission: '0% Commission',
    features: [
      { text: 'Early Platform Access' },
      { text: 'No Monthly Fees (3 Months)' },
      { text: 'Zero Commission Rate' },
    ],
  },
  {
    id: 'signature',
    title: 'SIGNATURE',
    subtitle: 'Growth Plan',
    price: '$79',
    period: 'PER MONTH',
    commission: '10% Commission',
    features: [
      { text: 'Standard Platform Access' },
      { text: 'Affordable Monthly Fee' },
      { text: 'Premium Exposure' },
      { text: 'Invite-Based VIP Events' },
    ],
  },
  {
    id: 'vault-society',
    title: 'VAULT SOCIETY',
    subtitle: 'Premium Plan',
    price: '$129',
    period: 'PER MONTH',
    commission: '5% Commission',
    features: [
      { text: 'Premium Platform Access' },
      { text: 'Top-Tier Boutique Status' },
      { text: 'Lowest Commission Rate' },
      { text: 'Free Return Shipping' },
      { text: 'Guaranteed VIP Invites' },
    ],
  },
]

// API call function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createSubscription = async ({
  data,
  token,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  token: string
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/subscription/create`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  )

  if (!res.ok) {
    throw new Error('Failed to create subscription')
  }

  return res.json()
}

export default function PricingPlan() {
  const router = useRouter()
  const session = useSession()
  const accessToken = session?.data?.user?.accessToken || ''

  const { mutate } = useMutation({
    mutationFn: createSubscription,
    onSuccess: () => {
      toast.success(' Subscription created successfully!')
      setTimeout(() => {
        router.push('/become-lender/form')
      }, 2000)
    },
    onError: () => {
      toast.error(' Something went wrong, please try again.')
    },
  })

  const handleChoosePlan = (plan: PricingPlan) => {
    const data = {
      name: plan.title,
      description: `${plan.subtitle}.${plan.price} ${plan.period}`,
      price:
        plan.price === 'FREE' ? 0 : parseInt(plan.price.replace(/[^0-9]/g, '')),
      commission: parseInt(plan.commission.replace(/[^0-9]/g, '')),
      currency: 'AUD',
      billingCycle: 'monthly',
      isActive: true,
      features: plan.features.map((f) => f.text),
    }

    mutate({ data, token: accessToken })
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="headerClass font-normal tracking-[20px] mb-2">
          CHOOSE THE PLAN
        </h2>
        <h3 className="headerClass font-normal tracking-[20px]">
          THAT GROWS WITH YOU
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className="border border-gray-200 p-8 flex flex-col h-full"
          >
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold mb-1">{plan.title}</h3>
              <p className="text-sm text-gray-600 mb-8">{plan.subtitle}</p>

              <div className="mb-2">
                <span className="text-3xl font-bold">{plan.price}</span>
              </div>
              <p className="text-xs tracking-wider mb-8">{plan.period}</p>

              <div className="text-lg font-medium mb-8">{plan.commission}</div>
            </div>

            <div className="flex-grow">
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 mr-2">
                      <Check className="h-5 w-5 text-black" />
                    </div>
                    <span className="text-sm">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto">
              <button
                onClick={() => handleChoosePlan(plan)}
                className="w-full py-3 border-t border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                CHOOSE PLAN
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
