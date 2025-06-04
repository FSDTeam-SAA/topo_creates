"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import ReportIssueModal from "./report_issue";
import Link from "next/link";

type TicketStatus = "Pending" | "In Review" | "Resolved";

interface Ticket {
  id: string;
  date: string;
  issue: string;
  description: string;
  status: TicketStatus;
}

export default function Dispute() {
  const [open, setonOpenChange] = useState(false);

  const tickets: Ticket[] = [
    {
      id: "XXXXX",
      date: "20/04/2023",
      issue: "ITEM HASN'T ARRIVED",
      description:
        "I haven't received my package yet and it's been over a week since shipping...",
      status: "Pending",
    },
    {
      id: "XXXXX",
      date: "20/04/2023",
      issue: "ITEM HASN'T ARRIVED",
      description:
        "I haven't received my package yet and it's been over a week since shipping...",
      status: "In Review",
    },
    {
      id: "XXXXX",
      date: "20/04/2023",
      issue: "ITEM HASN'T ARRIVED",
      description:
        "I haven't received my package yet and it's been over a week since shipping...",
      status: "Resolved",
    },
  ];

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "In Review":
        return "bg-rose-100 text-rose-800 hover:bg-rose-100";
      case "Resolved":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100";
    }
  };

  return (
    <div className="font-sans mb-[100px]">
      {/* Subheader */}
      <div className="flex justify-between items-center border-b pb-4 mb-8">
        <h2 className="text-lg">Dispute Handling</h2>
        <Button
          onClick={() => setonOpenChange(true)}
          variant="link"
          className="text-xs font-normal text-black hover:text-gray-700 p-0 h-auto"
        >
          REPORT AN ISSUE
        </Button>
        <ReportIssueModal open={open} setonOpenChange={setonOpenChange} />
      </div>

      {/* Tickets */}
      <div className="space-y-6">
        {tickets.map((ticket, index) => (
          <div key={index} className="border-b pb-6">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-base font-medium">TICKET #{ticket.id}</h3>
              <Badge
                variant="outline"
                className={`rounded-full px-3 py-0.5 font-normal text-xs ${getStatusColor(
                  ticket.status
                )}`}
              >
                {ticket.status}
              </Badge>
            </div>
            <p className="text-xs text-gray-500 mb-2">DATE: {ticket.date}</p>
            <p className="text-xs font-medium mb-1">ISSUE: {ticket.issue}</p>
            <p className="text-sm text-gray-700 mb-3">
              &quot;{ticket.description}&quot;
            </p>
            <div className="flex justify-end">
             <Link href={`/account/${ticket.id}`}>
              <Button
              
                variant="link"
                className="text-xs font-normal text-black hover:text-gray-700 p-0 h-auto"
              >
                VIEW
              </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
