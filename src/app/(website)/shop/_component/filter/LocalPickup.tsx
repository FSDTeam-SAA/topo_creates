import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";

export function LocalPickup() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
      <AccordionItem className="border-none" value="item-1">
        <AccordionTrigger className="uppercase font-avenir tracking-widest opacity-75 border-b border-black pb-2">
          local pickup
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance mt-4">
          <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
