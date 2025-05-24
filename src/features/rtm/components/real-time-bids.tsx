"use client";

import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
    useTransition,
} from "react";
import SelectTime from "./select-time";
import Combobox from "@/components/combobox";
import RealTimeBidTable from "./data-table";
import ConfirmDialog from "./confirm-dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDebounce } from "@uidotdev/usehooks";
import { getClientsByName } from "@/actions/clients";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { rtmBidSchema } from "../schemas";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import moment from "moment";

function generateTimeBlocks(interval = 15, totalBlocks = 96) {
    const blocks = [];
    let currentTime = 0;

    for (let i = 1; i <= totalBlocks; i++) {
        const startTime = formatTime(currentTime);
        currentTime += interval;
        const endTime = formatTime(currentTime);

        blocks.push({
            blockNumber: i,
            startTime,
            endTime,
            price: 0,
            volume: 0,
        });
    }

    return blocks;
}

function formatTime(minutes: number) {
    const hours = Math.floor(minutes / 60) % 24;
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

interface Bids {
    blockNumber: number;
    startTime: string;
    endTime: string;
    price: number;
    volume: number;
}

function getValidBlocks(blocks: ReturnType<typeof generateTimeBlocks>) {
    const now = moment();

    return blocks.filter((block) => {
        const [hours, minutes] = block.startTime.split(":").map(Number);
        const blockTime = moment()
            .startOf("day")
            .add(hours, "hours")
            .add(minutes, "minutes");
        const diffMinutes = blockTime.diff(now, "minutes");
        return diffMinutes >= 90;
    });
}

const RealTimeBids = ({
    data,
}: {
    data: { label: string; value: string }[];
}) => {
    const [isPending, startTransition] = useTransition();
    const { setValue, watch, register, getValues } = useForm<
        z.infer<typeof rtmBidSchema>
    >({
        defaultValues: {
            mode: "manual",
            client: {
                name: "",
                id: "",
            },
            bidType: "single",
            bids: [],
            startTime: undefined,
            endTime: undefined,
            price: 0,
            volume: 0,
        },
    });
    const [options, setOptions] = useState(data);
    const [search, setSearch] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const debounceSearch = useDebounce(search, 300);

    const mode = watch("mode");
    const bidType = watch("bidType");
    const startTime = watch("startTime");
    const endTime = watch("endTime");

    const totalBlocks = useMemo(generateTimeBlocks, []);

    const blocks = useMemo(() => {
        return getValidBlocks(totalBlocks);
    }, [totalBlocks]);

    useEffect(() => {
        startTransition(async () => {
            const res = await getClientsByName(debounceSearch);
            const transformedData = res.map((client) => ({
                label: client.portfolioName,
                value: client.id,
            }));
            setOptions(transformedData);
        });
    }, [debounceSearch]);

    const clientChangeHandler = useCallback(
        (client: { name: string; id: string }) => {
            setValue("client", { name: client.name, id: client.id });
        },
        [setValue]
    );

    const okHandler = useCallback(() => {
        setIsDialogOpen(false);
    }, [setIsDialogOpen]);

    const cancelHandler = useCallback(() => {
        setIsDialogOpen(false);
    }, [setIsDialogOpen]);

    const bidsChangeHandler = useCallback(
        (bids: Bids[]) => {
            setValue("bids", bids);
        },
        [setValue]
    );

    const isStartTimeDisabled = useCallback(
        (index: number) => {
            if (endTime) {
                return index > endTime;
            }
            return false;
        },
        [endTime]
    );

    const isEndTimeDisabled = useCallback(
        (index: number) => {
            if (startTime) {
                return index < startTime;
            }
            return false;
        },
        [startTime]
    );

    const handleSubmit = () => {
        const formData = getValues();
        const { success, error, data } = rtmBidSchema.safeParse(formData);
        if (success) {
            console.log(data);
            setIsDialogOpen(true);
        } else {
            toast("Error while bidding", {
                description: () => {
                    return error.errors[0].message;
                },
                action: {
                    label: "Ok",
                    onClick: () => {},
                },
            });
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2 mb-4">
                <div className="grid w-full max-w-sm items-center gap-2">
                    <Label>Mode</Label>
                    <RadioGroup
                        value={mode}
                        onValueChange={(e) => {
                            setValue("mode", e as "manual" | "automatic");
                        }}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="manual" id="manual" />
                            <Label htmlFor="manual">Manual</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="automatic" id="automatic" />
                            <Label htmlFor="automatic">Automatic</Label>
                        </div>
                    </RadioGroup>
                </div>

                <div className="grid w-full max-w-sm items-center gap-2">
                    <Label>Bid Type</Label>
                    <RadioGroup
                        value={bidType}
                        onValueChange={(e) => {
                            setValue("bidType", e as "single" | "block");
                        }}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="single" id="single" />
                            <Label htmlFor="single">Single</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="block" id="block" />
                            <Label htmlFor="block">Block</Label>
                        </div>
                    </RadioGroup>
                </div>

                {bidType === "block" && (
                    <>
                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Label>Block Start Time</Label>
                            <SelectTime
                                isDisabled={isStartTimeDisabled}
                                value={watch("startTime")!}
                                onChange={(e: number) =>
                                    setValue("startTime", e)
                                }
                                options={blocks}
                                label="Start Time"
                                placeholder="Select Start Time"
                                keyName="startTime"
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Label>Block End Time</Label>
                            <SelectTime
                                isDisabled={isEndTimeDisabled}
                                value={watch("endTime")!}
                                onChange={(e: number) => setValue("endTime", e)}
                                options={blocks}
                                label="Start Time"
                                placeholder="Select End Time"
                                keyName="endTime"
                            />
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Label>Price</Label>
                            <Input
                                className="w-[180px]"
                                type="number"
                                {...register("price", {
                                    setValueAs: (value: string) =>
                                        value ? Number(value) : 0,
                                })}
                            />
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Label>Volume</Label>
                            <Input
                                className="w-[180px]"
                                type="number"
                                {...register("volume", {
                                    setValueAs: (value: string) =>
                                        value ? Number(value) : 0,
                                })}
                            />
                        </div>
                    </>
                )}

                <div className="grid w-full items-center gap-2">
                    <Label>Client</Label>
                    <div className="flex items-center gap-x-2">
                        <Combobox
                            isLoading={isPending}
                            onChange={clientChangeHandler}
                            onSearchChange={setSearch}
                            options={options}
                            buttonClassName="w-[250px]"
                            dropdownClassName="w-[250px]"
                        />
                    </div>
                </div>
            </div>
            {bidType === "single" && (
                <div className="my-4">
                    <RealTimeBidTable
                        onChange={bidsChangeHandler}
                        data={blocks}
                    />
                </div>
            )}

            <Button className="w-24" onClick={handleSubmit}>
                Submit
            </Button>

            <ConfirmDialog
                startTime={startTime!}
                endTime={endTime!}
                blocks={blocks}
                price={watch("price")!}
                bidType={bidType}
                selectedDate={new Date()}
                volume={watch("volume")!}
                data={watch("bids")!}
                open={isDialogOpen}
                setOpen={setIsDialogOpen}
                onOk={okHandler}
                onCancel={cancelHandler}
                clientName={watch("client").name}
            />
        </div>
    );
};

export default RealTimeBids;

/*






* */
