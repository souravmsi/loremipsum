import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { createBlockBids } from "@/utils/helper";
import moment from "moment";

interface Blocks {
    blockNumber: number;
    startTime: string;
    endTime: string;
    price: number;
    volume: number;
}

interface PropTypes {
    open: boolean;
    onOk: () => void;
    onCancel: () => void;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: Blocks[];
    startTime: number;
    endTime: number;
    bidType: "single" | "block";
    price: number;
    volume: number;
    clientName: string;
    selectedDate: Date;
    blocks: Blocks[];
}

const formattedDate = (date: Date): string =>
    moment(date).format("dddd, MMMM D, YYYY");

const ConfirmDialog = ({
    open,
    onOk,
    onCancel,
    setOpen,
    data,
    startTime,
    endTime,
    bidType,
    price,
    volume,
    clientName,
    blocks,
    selectedDate,
}: PropTypes) => {
    if (bidType === "block") {
        data = createBlockBids(startTime, endTime, blocks, volume, price);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="overflow-auto">
                <DialogHeader>
                    <DialogTitle>Bid Summary</DialogTitle>
                    <DialogDescription>
                        {clientName} on {formattedDate(selectedDate)}
                    </DialogDescription>
                </DialogHeader>

                <Table>
                    <TableCaption>A list of your Bids.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Block No.</TableHead>
                            <TableHead>Start Time</TableHead>
                            <TableHead>End Time</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-right">Volume</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.blockNumber}>
                                <TableCell>{row.blockNumber}</TableCell>
                                <TableCell>{row.startTime}</TableCell>
                                <TableCell>{row.endTime}</TableCell>
                                <TableCell className="text-right">
                                    {row.price}
                                </TableCell>
                                <TableCell className="text-right">
                                    {row.volume}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex justify-end items-center gap-4 mt-4">
                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button onClick={onOk}>Confirm</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDialog;
