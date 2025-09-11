"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useShoppingStore } from "@/zustand/shopingStore";

const FormSchema = z.object({
  startDate: z.date({ required_error: "Start date is required." }),
  endDate: z.date({ required_error: "End date is required." }),
});

const RentalDates = () => {
  const { rent, startDate, endDate, setStartDate, setEndDate } =
    useShoppingStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    },
  });

  // keep form in sync with zustand
  useEffect(() => {
    if (startDate) form.setValue("startDate", startDate);
    if (endDate) form.setValue("endDate", endDate);
  }, [startDate, endDate, form]);

  // auto-calc endDate when startDate or rent changes
  useEffect(() => {
    if (startDate && rent) {
      const newEndDate = new Date(startDate);
      newEndDate.setDate(startDate.getDate() + Number(rent));
      setEndDate(newEndDate);
      form.setValue("endDate", newEndDate, { shouldValidate: true });
    }
  }, [startDate, rent, form, setEndDate]);

  return (
    <div className="font-avenir uppercase mt-3">
      <Form {...form}>
        <form className="flex flex-col lg:flex-row items-center gap-5">
          {/* Start Date */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col lg:w-1/2">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        className={cn(
                          "w-full pl-3 text-left font-normal bg-inherit hover:bg-inherit border border-black/75 uppercase",
                          field.value ? "text-black/75" : "text-black/75"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span className="font-avenir uppercase">
                            dd / mm / yyyy
                          </span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setStartDate(date ?? null);
                      }}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* End Date */}
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col lg:w-1/2">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        className={cn(
                          "w-full pl-3 text-left font-normal bg-inherit hover:bg-inherit border border-black/75 uppercase",
                          field.value ? "text-black/75" : "text-black/75"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span className="font-avenir uppercase">
                            dd / mm / yyyy
                          </span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setEndDate(date ?? null);
                      }}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default RentalDates;
