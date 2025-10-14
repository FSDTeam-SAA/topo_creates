"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const DisputesDetails = ({ id }: { id: string }) => {
  const session = useSession();
  const token = session.data?.user.accessToken;

  const { data: disputeDetails = {}, isLoading } = useQuery({
    queryKey: ["disputes-details"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/customer/disputes/my-disputes/${id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-cache",
        }
      );
      const data = await res.json();

      return data?.data || {};
    },
  });

  return <div className="font-avenir tracking-widest opacity-80">
    
    <div className="border border-gray-500 p-5">
        <div>
            <h1>Order ID : {disputeDetails?.booking?._id}</h1>
            <h1>Date Submitted : {new Date(disputeDetails?.createdAt as string).toLocaleDateString()}{" "}</h1>
        </div>

        <div>
            <h1></h1>
        </div>
    </div>
  </div>;
};

export default DisputesDetails;
