import { User } from 'lucide-react'

export default function ChatHeader({ orderId }: { orderId?: string }) {
  return (
    <div className="py-4 px-4 sm:px-7 border border-[#E6E6E6] rounded-full flex items-center gap-3">
      <div className="bg-gray-100 rounded-full p-2">
        <User className="h-6 w-6 sm:h-7 sm:w-7 text-gray-500" />
      </div>
      <p className="font-normal text-lg sm:text-2xl">{orderId}</p>
    </div>
  )
}
