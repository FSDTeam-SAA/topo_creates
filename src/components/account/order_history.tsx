import clsx from 'clsx'
import { Button } from '../ui/button'

const OrderHistory = () => {
  const orders = [
    {
      id: 1,
      orderDate: 'May 10, 2025',
      eventDate: 'May 20, 2025',
      paymentStatus: 'PAID',
      fulfillmentStatus: 'FULFILLED',
      statusColor: 'green',
      totalCost: '$299.00',
      trackingUrl: '#',
      invoiceUrl: '#',
    },
    {
      id: 2,
      orderDate: 'May 5, 2025',
      eventDate: 'May 18, 2025',
      paymentStatus: 'UNPAID',
      fulfillmentStatus: 'PENDING',
      statusColor: 'yellow',
      totalCost: '$189.50',
      trackingUrl: '#',
      invoiceUrl: '#',
    },
    {
      id: 3,
      orderDate: 'Apr 28, 2025',
      eventDate: 'May 10, 2025',
      paymentStatus: 'PAID',
      fulfillmentStatus: 'CANCELLED',
      statusColor: 'red',
      totalCost: '$0.00',
      trackingUrl: '#',
      invoiceUrl: '#',
    },
  ]

  return (
    <div className="w-full ">
      <section>
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
            <h2 className="text-2xl tracking-widest font-light">
              Order History
            </h2>
            <p className="text-base sm:text-lg md:text-2xl font-light tracking-widest">
              April 10, 2023 - Today
            </p>
          </div>
          <hr className="mt-4 border border-black" />
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                {[
                  'Order Date',
                  'Event Date',
                  'Payment',
                  'Fulfillment Status',
                  'Total Cost',
                  'Tracking',
                ].map((header, index) => (
                  <th
                    key={index}
                    className="py-3 px-4 sm:px-6 lg:px-10 text-left text-gray-600 font-normal text-sm whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="py-6 px-4 sm:px-6 lg:px-10 text-base text-gray-900 border-r font-light tracking-wide border-gray-300">
                    {order.orderDate}
                  </td>
                  <td className="py-6 px-4 sm:px-6 lg:px-10 text-base font-light tracking-wide text-gray-900 border-r border-gray-300">
                    {order.eventDate}
                  </td>
                  <td className="py-6 px-4 sm:px-6 lg:px-10 font-light tracking-wide text-base text-gray-900 border-r border-gray-300">
                    {order.paymentStatus}
                  </td>
                  <td className="py-6 px-4 sm:px-6 lg:px-10 font-light tracking-wide text-base text-gray-900 border-r border-gray-300">
                    <span
                      className={clsx('px-2 py-1 rounded-full text-xs', {
                        'bg-green-100 text-green-800':
                          order.statusColor === 'green',
                        'bg-yellow-100 text-yellow-800':
                          order.statusColor === 'yellow',
                        'bg-red-100 text-red-800': order.statusColor === 'red',
                      })}
                    >
                      {order.fulfillmentStatus}
                    </span>
                  </td>
                  <td className="py-6 px-4 sm:px-6 lg:px-10 text-base text-gray-900 border-r border-gray-300 font-light tracking-wide">
                    {order.totalCost}
                  </td>
                  <td className="py-6 px-4 sm:px-6 lg:px-10 text-base text-gray-900 font-light tracking-wide">
                    <Button
                      variant="link"
                      size="sm"
                      className="text-xs p-0 h-auto text-blue-600 font-light tracking-wide"
                      asChild
                    >
                      <a href={order.trackingUrl}>TRACK ORDER</a>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default OrderHistory
