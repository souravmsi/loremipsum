"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CellContext } from "@tanstack/react-table";

interface EditableCellProps<TData, TValue> {
    getValue: () => TValue;
    table: CellContext<TData, TValue>["table"];
    row: CellContext<TData, TValue>["row"];
    column: CellContext<TData, TValue>["column"];
}

const EditableCell = <TData, TValue>({
    getValue,
    table,
    row,
    column,
}: EditableCellProps<TData, TValue>) => {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
        table.options.meta?.updateData(row.index, column.id, value);
    };

    return (
        <Input
            onBlur={onBlur}
            type="number"
            value={String(value)}
            onChange={(e) => setValue(e.target.value as TValue)}
        />
    );
};

export default EditableCell;
