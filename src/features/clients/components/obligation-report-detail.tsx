"use client";

import React, { useState } from "react";
import {
    FormItem,
    FormControl,
    FormField,
    FormMessage,
    FormDescription,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { createSchema } from "../schemas";
import { TagInput, Tag } from "emblor";
import { z } from "zod";

interface Proptypes {
    form: UseFormReturn<z.infer<typeof createSchema>>;
}

const items = [
    {
        id: "rtm",
        label: "RTM",
    },
    {
        id: "dam",
        label: "DAM",
    },
    {
        id: "gdam",
        label: "GDAM",
    },

    {
        id: "rec",
        label: "REC",
    },
    {
        id: "tam",
        label: "TAM",
    },
    {
        id: "gtam",
        label: "GTAM",
    },
] as const;

const RtmForm: React.FC<Proptypes> = ({ form }) => {
    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

    const middleName = form.watch("obligationReportDetails.rtm.fileMiddleName");
    const fileSuffix = form.watch("obligationReportDetails.rtm.fileSuffix");
    const emails = form.watch("obligationReportDetails.rtm.recipientEmails");

    const tags: Tag[] = emails.map(
        (item, index): Tag => ({
            id: (index + 1).toString(),
            text: item,
        })
    );
    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-md font-semibold py-2 border-y-[1px] text-center">
                RTM Details
            </h3>
            <FormField
                name="obligationReportDetails.rtm.multiplier"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="rtm.multiplier">
                            RTM Trading Margin Multiplier (MWh)
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                onChange={(e) => {
                                    const rawValue = e.target.value;
                                    const sanitized = rawValue.replace(
                                        /^0+(?!$)/,
                                        ""
                                    );
                                    if (sanitized && isNaN(Number(sanitized))) {
                                        return;
                                    }
                                    field.onChange(
                                        sanitized ? Number(sanitized) : 0
                                    );
                                }}
                                type="text"
                                id="rtm.multiplier"
                                placeholder="Enter Margin Multiplier"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormItem>
                <FormLabel htmlFor="rtm.fileName">RTM File Name</FormLabel>
                <FormControl>
                    <Input
                        value={`RTM_IEX532025DOR_GMR_${middleName}_st_${fileSuffix}`}
                        onChange={() => {}}
                        disabled
                        type="text"
                        id="rtm.fileName"
                        placeholder="File Name"
                    />
                </FormControl>
                <FormMessage />
            </FormItem>

            <FormField
                name="obligationReportDetails.rtm.recipientEmails"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="rtm.recipientEmails">
                            RTM Report Recipient Email
                        </FormLabel>
                        <FormControl>
                            <TagInput
                                tags={tags}
                                setTags={(newTags) => {
                                    const transformedData = newTags.map(
                                        (item) => item.text
                                    );
                                    field.onChange(transformedData);
                                }}
                                placeholder="Add Email"
                                styleClasses={{
                                    input: "w-full shadow-none sm:max-w-[350px]",
                                }}
                                activeTagIndex={activeTagIndex}
                                setActiveTagIndex={setActiveTagIndex}
                            />
                        </FormControl>
                        <FormMessage>
                            {form.formState.errors?.obligationReportDetails?.rtm
                                ?.recipientEmails && "Invalid Email"}
                        </FormMessage>
                    </FormItem>
                )}
            />

            <FormField
                name="obligationReportDetails.rtm.fileMiddleName"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="rtm.fileMiddleName">
                            RTM File Middle Name
                        </FormLabel>
                        <FormControl>
                            <Input
                                id="rtm.fileMiddleName"
                                {...field}
                                placeholder="Enter File Middle Name"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                name="obligationReportDetails.rtm.fileSuffix"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="rtm.fileSuffix">
                            RTM File Suffix
                        </FormLabel>
                        <FormControl>
                            <Input
                                id="rtm.fileSuffix"
                                {...field}
                                placeholder="Enter File Suffix"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

const DamForm: React.FC<Proptypes> = ({ form }) => {
    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

    const middleName = form.watch("obligationReportDetails.dam.fileMiddleName");
    const fileSuffix = form.watch("obligationReportDetails.dam.fileSuffix");
    const emails = form.watch("obligationReportDetails.dam.recipientEmails");

    const tags: Tag[] = emails.map(
        (item, index): Tag => ({
            id: (index + 1).toString(),
            text: item,
        })
    );
    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-md font-semibold py-2 border-y-[1px] text-center">
                DAM Details
            </h3>
            <FormField
                name="obligationReportDetails.dam.multiplier"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="dam.multiplier">
                            DAM Trading Margin Multiplier (MWh)
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                onChange={(e) => {
                                    const rawValue = e.target.value;
                                    const sanitized = rawValue.replace(
                                        /^0+(?!$)/,
                                        ""
                                    );
                                    if (sanitized && isNaN(Number(sanitized))) {
                                        return;
                                    }
                                    field.onChange(
                                        sanitized ? Number(sanitized) : 0
                                    );
                                }}
                                type="text"
                                id="dam.multiplier"
                                placeholder="Enter Margin Multiplier"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormItem>
                <FormLabel htmlFor="dam.fileName">DAM File Name</FormLabel>
                <FormControl>
                    <Input
                        value={`IEX532025DOR_GMR_${middleName}_st_${fileSuffix}`}
                        onChange={() => {}}
                        disabled
                        type="text"
                        id="dam.fileName"
                        placeholder="File Name"
                    />
                </FormControl>
                <FormMessage />
            </FormItem>

            <FormField
                name="obligationReportDetails.dam.recipientEmails"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="dam.recipientEmails">
                            DAM Report Recipient Email
                        </FormLabel>
                        <FormControl>
                            <TagInput
                                tags={tags}
                                setTags={(newTags) => {
                                    const transformedData = newTags.map(
                                        (item) => item.text
                                    );
                                    field.onChange(transformedData);
                                }}
                                placeholder="Add Email"
                                styleClasses={{
                                    input: "w-full shadow-none sm:max-w-[350px]",
                                }}
                                activeTagIndex={activeTagIndex}
                                setActiveTagIndex={setActiveTagIndex}
                            />
                        </FormControl>
                        <FormMessage>
                            {form.formState.errors?.obligationReportDetails?.dam
                                ?.recipientEmails && "Invalid Email"}
                        </FormMessage>
                    </FormItem>
                )}
            />

            <FormField
                name="obligationReportDetails.dam.fileMiddleName"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="dam.fileMiddleName">
                            DAM File Middle Name
                        </FormLabel>
                        <FormControl>
                            <Input
                                id="dam.fileMiddleName"
                                {...field}
                                placeholder="Enter File Middle Name"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                name="obligationReportDetails.dam.fileSuffix"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="dam.fileSuffix">
                            DAM File Suffix
                        </FormLabel>
                        <FormControl>
                            <Input
                                id="dam.fileSuffix"
                                {...field}
                                placeholder="Enter File Suffix"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

const GdamForm: React.FC<Proptypes> = ({ form }) => {
    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

    const middleName = form.watch(
        "obligationReportDetails.gdam.fileMiddleName"
    );
    const fileSuffix = form.watch("obligationReportDetails.gdam.fileSuffix");
    const emails = form.watch("obligationReportDetails.gdam.recipientEmails");

    const tags: Tag[] = emails.map(
        (item, index): Tag => ({
            id: (index + 1).toString(),
            text: item,
        })
    );
    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-md font-semibold py-2 border-y-[1px] text-center">
                GDAM Details
            </h3>
            <FormField
                name="obligationReportDetails.gdam.multiplier"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="gdam.multiplier">
                            GDAM Trading Margin Multiplier (MWh)
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                onChange={(e) => {
                                    const rawValue = e.target.value;
                                    const sanitized = rawValue.replace(
                                        /^0+(?!$)/,
                                        ""
                                    );
                                    if (sanitized && isNaN(Number(sanitized))) {
                                        return;
                                    }
                                    field.onChange(
                                        sanitized ? Number(sanitized) : 0
                                    );
                                }}
                                type="text"
                                id="gdam.multiplier"
                                placeholder="Enter Margin Multiplier"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormItem>
                <FormLabel htmlFor="gdam.fileName">GDAM File Name</FormLabel>
                <FormControl>
                    <Input
                        value={`GDAM_IEX532025DOR_GMR_${middleName}_st_${fileSuffix}`}
                        onChange={() => {}}
                        disabled
                        type="text"
                        id="gdam.fileName"
                        placeholder="File Name"
                    />
                </FormControl>
                <FormMessage />
            </FormItem>

            <FormField
                name="obligationReportDetails.gdam.recipientEmails"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="gdam.recipientEmails">
                            GDAM Report Recipient Email
                        </FormLabel>
                        <FormControl>
                            <TagInput
                                tags={tags}
                                setTags={(newTags) => {
                                    const transformedData = newTags.map(
                                        (item) => item.text
                                    );
                                    field.onChange(transformedData);
                                }}
                                placeholder="Add Email"
                                styleClasses={{
                                    input: "w-full shadow-none sm:max-w-[350px]",
                                }}
                                activeTagIndex={activeTagIndex}
                                setActiveTagIndex={setActiveTagIndex}
                            />
                        </FormControl>
                        <FormMessage>
                            {form.formState.errors?.obligationReportDetails
                                ?.gdam?.recipientEmails && "Invalid Email"}
                        </FormMessage>
                    </FormItem>
                )}
            />

            <FormField
                name="obligationReportDetails.gdam.fileMiddleName"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="gdam.fileMiddleName">
                            GDAM File Middle Name
                        </FormLabel>
                        <FormControl>
                            <Input
                                id="gdam.fileMiddleName"
                                {...field}
                                placeholder="Enter File Middle Name"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                name="obligationReportDetails.gdam.fileSuffix"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="gdam.fileSuffix">
                            GDAM File Suffix
                        </FormLabel>
                        <FormControl>
                            <Input
                                id="gdam.fileSuffix"
                                {...field}
                                placeholder="Enter File Suffix"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

const RecForm: React.FC<Proptypes> = ({ form }) => {
    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

    const middleName = form.watch("obligationReportDetails.rec.fileMiddleName");
    const fileSuffix = form.watch("obligationReportDetails.rec.fileSuffix");
    const emails = form.watch("obligationReportDetails.rec.recipientEmails");

    const tags: Tag[] = emails.map(
        (item, index): Tag => ({
            id: (index + 1).toString(),
            text: item,
        })
    );
    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-md font-semibold py-2 border-y-[1px] text-center">
                REC Details
            </h3>
            <FormField
                name="obligationReportDetails.rec.multiplier"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="rec.multiplier">
                            REC Trading Margin Multiplier (MWh)
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                onChange={(e) => {
                                    const rawValue = e.target.value;
                                    const sanitized = rawValue.replace(
                                        /^0+(?!$)/,
                                        ""
                                    );
                                    if (sanitized && isNaN(Number(sanitized))) {
                                        return;
                                    }
                                    field.onChange(
                                        sanitized ? Number(sanitized) : 0
                                    );
                                }}
                                type="text"
                                id="rec.multiplier"
                                placeholder="Enter Margin Multiplier"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormItem>
                <FormLabel htmlFor="rec.fileName">RTM File Name</FormLabel>
                <FormControl>
                    <Input
                        value={`RTM_IEX532025DOR_GMR_${middleName}_st_${fileSuffix}`}
                        onChange={() => {}}
                        disabled
                        type="text"
                        id="rec.fileName"
                        placeholder="File Name"
                    />
                </FormControl>
                <FormMessage />
            </FormItem>

            <FormField
                name="obligationReportDetails.rec.recipientEmails"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="rec.recipientEmails">
                            REC Report Recipient Email
                        </FormLabel>
                        <FormControl>
                            <TagInput
                                tags={tags}
                                setTags={(newTags) => {
                                    const transformedData = newTags.map(
                                        (item) => item.text
                                    );
                                    field.onChange(transformedData);
                                }}
                                placeholder="Add Email"
                                styleClasses={{
                                    input: "w-full shadow-none sm:max-w-[350px]",
                                }}
                                activeTagIndex={activeTagIndex}
                                setActiveTagIndex={setActiveTagIndex}
                            />
                        </FormControl>
                        <FormMessage>
                            {form.formState.errors?.obligationReportDetails?.rec
                                ?.recipientEmails && "Invalid Email"}
                        </FormMessage>
                    </FormItem>
                )}
            />

            <FormField
                name="obligationReportDetails.rec.fileMiddleName"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="rec.fileMiddleName">
                            REC File Middle Name
                        </FormLabel>
                        <FormControl>
                            <Input
                                id="rec
                                .fileMiddleName"
                                {...field}
                                placeholder="Enter File Middle Name"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                name="obligationReportDetails.rtm.fileSuffix"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="rtm.fileSuffix">
                            RTM File Suffix
                        </FormLabel>
                        <FormControl>
                            <Input
                                id="rtm.fileSuffix"
                                {...field}
                                placeholder="Enter File Suffix"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

const TamForm: React.FC<Proptypes> = ({ form }) => {
    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

    const middleName = form.watch("obligationReportDetails.tam.fileMiddleName");
    const fileSuffix = form.watch("obligationReportDetails.tam.fileSuffix");
    const emails = form.watch("obligationReportDetails.tam.recipientEmails");

    const tags: Tag[] = emails.map(
        (item, index): Tag => ({
            id: (index + 1).toString(),
            text: item,
        })
    );
    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-md font-semibold py-2 border-y-[1px] text-center">
                TAM Details
            </h3>
            <FormField
                name="obligationReportDetails.tam.multiplier"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="tam.multiplier">
                            TAM Trading Margin Multiplier (MWh)
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                onChange={(e) => {
                                    const rawValue = e.target.value;
                                    const sanitized = rawValue.replace(
                                        /^0+(?!$)/,
                                        ""
                                    );
                                    if (sanitized && isNaN(Number(sanitized))) {
                                        return;
                                    }
                                    field.onChange(
                                        sanitized ? Number(sanitized) : 0
                                    );
                                }}
                                type="text"
                                id="tam.multiplier"
                                placeholder="Enter Margin Multiplier"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormItem>
                <FormLabel htmlFor="tam.fileName">TAM File Name</FormLabel>
                <FormControl>
                    <Input
                        value={`_GMR_${middleName}_st_${fileSuffix}`}
                        onChange={() => {}}
                        disabled
                        type="text"
                        id="tam.fileName"
                        placeholder="File Name"
                    />
                </FormControl>
                <FormMessage />
            </FormItem>

            <FormField
                name="obligationReportDetails.tam.recipientEmails"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="tam.recipientEmails">
                            TAM Report Recipient Email
                        </FormLabel>
                        <FormControl>
                            <TagInput
                                tags={tags}
                                setTags={(newTags) => {
                                    const transformedData = newTags.map(
                                        (item) => item.text
                                    );
                                    field.onChange(transformedData);
                                }}
                                placeholder="Add Email"
                                styleClasses={{
                                    input: "w-full shadow-none sm:max-w-[350px]",
                                }}
                                activeTagIndex={activeTagIndex}
                                setActiveTagIndex={setActiveTagIndex}
                            />
                        </FormControl>
                        <FormMessage>
                            {form.formState.errors?.obligationReportDetails?.tam
                                ?.recipientEmails && "Invalid Email"}
                        </FormMessage>
                    </FormItem>
                )}
            />

            <FormField
                name="obligationReportDetails.tam.fileMiddleName"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="tam.fileMiddleName">
                            TAM File Middle Name
                        </FormLabel>
                        <FormControl>
                            <Input
                                id="tam.fileMiddleName"
                                {...field}
                                placeholder="Enter File Middle Name"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                name="obligationReportDetails.tam.fileSuffix"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="tam.fileSuffix">
                            TAM File Suffix
                        </FormLabel>
                        <FormControl>
                            <Input
                                id="tam.fileSuffix"
                                {...field}
                                placeholder="Enter File Suffix"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

const GtamForm: React.FC<Proptypes> = ({ form }) => {
    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

    const middleName = form.watch(
        "obligationReportDetails.gtam.fileMiddleName"
    );
    const fileSuffix = form.watch("obligationReportDetails.gtam.fileSuffix");
    const emails = form.watch("obligationReportDetails.gtam.recipientEmails");

    const tags: Tag[] = emails.map(
        (item, index): Tag => ({
            id: (index + 1).toString(),
            text: item,
        })
    );
    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-md font-semibold py-2 border-y-[1px] text-center">
                GTAM Details
            </h3>
            <FormField
                name="obligationReportDetails.gtam.multiplier"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="gtam.multiplier">
                            GTAM Trading Margin Multiplier (MWh)
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                onChange={(e) => {
                                    const rawValue = e.target.value;
                                    const sanitized = rawValue.replace(
                                        /^0+(?!$)/,
                                        ""
                                    );
                                    if (sanitized && isNaN(Number(sanitized))) {
                                        return;
                                    }
                                    field.onChange(
                                        sanitized ? Number(sanitized) : 0
                                    );
                                }}
                                type="text"
                                id="gtam.multiplier"
                                placeholder="Enter Margin Multiplier"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormItem>
                <FormLabel htmlFor="gtam.fileName">GTAM File Name</FormLabel>
                <FormControl>
                    <Input
                        value={`_GMR_${middleName}_st_${fileSuffix}`}
                        onChange={() => {}}
                        disabled
                        type="text"
                        id="gtam.fileName"
                        placeholder="File Name"
                    />
                </FormControl>
                <FormMessage />
            </FormItem>

            <FormField
                name="obligationReportDetails.gtam.recipientEmails"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="gtam.recipientEmails">
                            GTAM Report Recipient Email
                        </FormLabel>
                        <FormControl>
                            <TagInput
                                tags={tags}
                                setTags={(newTags) => {
                                    const transformedData = newTags.map(
                                        (item) => item.text
                                    );
                                    field.onChange(transformedData);
                                }}
                                placeholder="Add Email"
                                styleClasses={{
                                    input: "w-full shadow-none sm:max-w-[350px]",
                                }}
                                activeTagIndex={activeTagIndex}
                                setActiveTagIndex={setActiveTagIndex}
                            />
                        </FormControl>
                        <FormMessage>
                            {form.formState.errors?.obligationReportDetails
                                ?.gtam?.recipientEmails && "Invalid Email"}
                        </FormMessage>
                    </FormItem>
                )}
            />

            <FormField
                name="obligationReportDetails.gtam.fileMiddleName"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="gtam.fileMiddleName">
                            GTAM File Middle Name
                        </FormLabel>
                        <FormControl>
                            <Input
                                id="gtam.fileMiddleName"
                                {...field}
                                placeholder="Enter File Middle Name"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                name="obligationReportDetails.gtam.fileSuffix"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="gtam.fileSuffix">
                            GTAM File Suffix
                        </FormLabel>
                        <FormControl>
                            <Input
                                id="gtam.fileSuffix"
                                {...field}
                                placeholder="Enter File Suffix"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

const ObligationReportForm: React.FC<Proptypes> = ({ form }) => {
    return (
        <div className="mt-2 flex flex-col gap-2">
            <h3 className="text-md font-semibold">Obligation Report Details</h3>

            <FormField
                control={form.control}
                name="items"
                render={() => (
                    <FormItem>
                        <div className="mb-4">
                            <FormLabel className="text-sm">Options</FormLabel>
                            <FormDescription className="xs">
                                Select the options.
                            </FormDescription>
                        </div>
                        {items.map((item) => (
                            <FormField
                                key={item.id}
                                control={form.control}
                                name="items"
                                render={({ field }) => {
                                    return (
                                        <FormItem
                                            key={item.id}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value?.includes(
                                                        item.id
                                                    )}
                                                    onCheckedChange={(
                                                        checked
                                                    ) => {
                                                        return checked
                                                            ? field.onChange([
                                                                  ...field.value,
                                                                  item.id,
                                                              ])
                                                            : field.onChange(
                                                                  field.value?.filter(
                                                                      (value) =>
                                                                          value !==
                                                                          item.id
                                                                  )
                                                              );
                                                    }}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-medium pl-2">
                                                {item.label}
                                            </FormLabel>
                                        </FormItem>
                                    );
                                }}
                            />
                        ))}
                        <FormMessage />
                    </FormItem>
                )}
            />
            <RtmForm form={form} />
            <DamForm form={form} />
            <GdamForm form={form} />
            <RecForm form={form} />
            <TamForm form={form} />
            <GtamForm form={form} />
        </div>
    );
};

export default ObligationReportForm;
