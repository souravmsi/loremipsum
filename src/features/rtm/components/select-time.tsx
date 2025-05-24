import * as React from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface OptionTypes {
    blockNumber: number;
    startTime: string;
    endTime: string;
}

interface PropTypes {
    label: string;
    placeholder: string;
    options: OptionTypes[];
    keyName: keyof OptionTypes;
    onChange: (val: number) => void;
    value: number;
    isDisabled: (index: number) => boolean;
}

function SelectTime({
    value,
    label = "Select",
    placeholder = "Select the item",
    options = [],
    keyName = "startTime",
    onChange = () => {},
    isDisabled = () => false,
}: PropTypes) {
    return (
        <Select
            value={value !== undefined ? String(value) : ""}
            onValueChange={(e) => {
                onChange(Number(e));
            }}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {options.map((item, index) => (
                        <SelectItem
                            disabled={isDisabled(index)}
                            key={item[keyName]}
                            value={String(index)}
                        >
                            {item[keyName]}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default SelectTime;
