import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Size = () => {
  const labels = [
    {
      id: 1,
      label: "XXS",
    },
    {
      id: 2,
      label: "XS",
    },
    {
      id: 3,
      label: "S",
    },
    {
      id: 4,
      label: "M",
    },
    {
      id: 5,
      label: "L",
    },
    {
      id: 6,
      label: "XL",
    },
  ];

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
      className="w-full"
    >
      <AccordionItem className="border-none" value="item-1">
        <AccordionTrigger className="uppercase font-avenir tracking-widest opacity-75 border-b border-black pb-2">
          Size
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance mt-4">
          <div className="space-y-4">
            {labels.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <input className="h-4 w-4" type="checkbox" id="XXS" />
                <label
                  htmlFor="XXS"
                  className="font-avenir tracking-[0.2rem] opacity-75 uppercase"
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Size;
