"use client";

import React, { useRef } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandLoading,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface PropTypes {
    options: { value: string; label: string }[];
    onChange?: (value: { name: string; id: string }) => void;
    inputPlaceholder?: string;
    label?: string;
    buttonClassName?: string;
    dropdownClassName?: string;
    onSearchChange?: (value: string) => void;
    isLoading?: boolean;
}

function getTruncatedLabel(label: string, len: number) {
    if (label.length > len) {
        return label.substring(0, len) + "...";
    } else {
        return label;
    }
}

const Combobox: React.FC<PropTypes> = ({
    options = [],
    onChange = () => {},
    inputPlaceholder = "Search option...",
    label = "Select option...",
    buttonClassName = "",
    dropdownClassName = "",
    onSearchChange = () => {},
    isLoading = false,
}) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const selectedOption = useRef<{ label: string; value: string }>(null);

    React.useEffect(() => {
        onChange({
            name: selectedOption.current?.label || "",
            id: selectedOption.current?.value || "",
        });
    }, [value, onChange]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-[200px] justify-between", buttonClassName)}
                >
                    {value
                        ? getTruncatedLabel(selectedOption.current!.label, 20)
                        : label}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={cn("w-full p-0", dropdownClassName)}>
                <Command>
                    <CommandInput
                        placeholder={inputPlaceholder}
                        onChangeCapture={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            onSearchChange(event.target.value);
                        }}
                    />
                    <CommandList>
                        {isLoading && (
                            <CommandLoading>Loading...</CommandLoading>
                        )}
                        {!isLoading && (
                            <CommandEmpty>No option found.</CommandEmpty>
                        )}
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.label}
                                    onSelect={() => {
                                        if (option.value === value) {
                                            setValue("");
                                            selectedOption.current = null;
                                        } else {
                                            setValue(option.value);
                                            selectedOption.current = option;
                                        }
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === option.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default React.memo(Combobox);
