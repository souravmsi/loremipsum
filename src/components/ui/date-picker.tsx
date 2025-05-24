"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DayPickerBase } from "react-day-picker";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface Proptypes {
    fromDate?: DayPickerBase["fromDate"];
    onChange?: (value: Date) => void;
}

export default function DatePicker({ fromDate, onChange }: Proptypes) {
    const [date, setDate] = React.useState<Date>();

    React.useEffect(() => {
        if (onChange) onChange(date!);
    }, [date, onChange]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[250px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Select Date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    fromDate={fromDate}
                />
            </PopoverContent>
        </Popover>
    );
}
