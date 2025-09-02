"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Filter } from "lucide-react";
import SearchProduct from "./filter/SearchProduct";
import Rental from "./filter/Rental";
import { LocalPickup } from "./filter/LocalPickup";
import EventDate from "./filter/EventDate";
import Price from "./filter/Price";
import Size from "./filter/Size";

export function FilterDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild className="lg:hidden">
        <Button variant="outline">
          <Filter />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="container">
        <div className=" space-y-3 mt-3">
          <SearchProduct />
          <Rental />
          <LocalPickup />
          <EventDate />
          <Price />
          <Size />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
