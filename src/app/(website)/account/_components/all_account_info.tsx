"use client";
import AccountInfo from "@/components/account/account_info";
import MuseClub from "@/components/account/muse_club";
import OrderHistory from "@/components/account/order_history";
import YourWishlist from "@/components/account/your_wishlist";
import React, { useState } from "react";
import Headers from "./headers";
import Dispute from "@/components/account/dispute_components";
import ChatSystem from "@/components/account/chat";

const AllAccountInfo = () => {
  const [tab, setTab] = useState<string>("Account Info");

  return (
    <div className="">
      <div className="mt-20">
        <Headers setTab={setTab} tab={tab} />
        {tab === "Account Info" && (
          <div className="flex flex-col gap-[100px]">
            <AccountInfo />
            <MuseClub />
            <OrderHistory />
            <YourWishlist />
          </div>
        )}
        {tab === "Dispute" && (
          <div>
            <Dispute/>
          </div>
        )}
        {tab === "Chats" && (
          <div>
            <ChatSystem/>
          </div>
        )}

      </div>
    </div>
  );
};

export default AllAccountInfo;
