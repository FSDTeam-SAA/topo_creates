"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { useFilterStore } from "@/zustand/filterStore";

export function LocalPickup() {
  const { localPickup, setLocalPickup } = useFilterStore();

  const handleSliderChange = (value: number[]) => {
    setLocalPickup(value[0]);
  };

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
      className="w-full"
    >
      <AccordionItem className="border-none" value="item-1">
        <AccordionTrigger className="uppercase font-avenir tracking-widest opacity-75 border-b border-black pb-2">
          local pickup
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance mt-4">
          <Slider
            defaultValue={[localPickup]}
            value={[localPickup]}
            max={100}
            step={1}
            className="w-full"
            onValueChange={handleSliderChange}
          />
          <div className="text-sm text-gray-600 flex items-center justify-between">
            <h1>{localPickup} KM</h1>

            <h1>100 KM</h1>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
