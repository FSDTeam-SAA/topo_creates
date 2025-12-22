// lib/api/paymentApi.ts

export const paymentApi = {
  savePaymentInfo: async (token: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payment/savePaymentInfo`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data?.message || 'Failed to save payment info')
    }
    return data
  },
}
