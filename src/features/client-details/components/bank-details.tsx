"use client";

import React from "react";
import {
    FormItem,
    FormControl,
    FormField,
    FormMessage,
    FormLabel,
    Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { bankDetailsSchema } from "../schemas";
import { ClientDetailsResponse } from "@/utils/types";
import { Button } from "@/components/ui/button";

type PropTypes = {
    data: ClientDetailsResponse["payload"]["bankDetail"];
};

const BankDetails = ({ data }: PropTypes) => {
    const form = useForm<z.infer<typeof bankDetailsSchema>>({
        defaultValues: {
            bankName: data?.bankName || "",
            accountHolderName: data?.holderName || "",
            branchName: data?.branchName || "",
            accountNumber: data?.accountNumber || "",
            ifscCode: data?.ifscCode || "",
            cancelCheque: data?.cancelCheque || "",
        },
        resolver: zodResolver(bankDetailsSchema),
        mode: "onSubmit",
    });

    const onSubmit = async (values: z.infer<typeof bankDetailsSchema>) => {
        console.log(values);
    };

    return (
        <Form {...form}>
            <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
            >
                <FormField
                    name="bankName"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="bankName">Bank Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    id="bankName"
                                    placeholder="Enter Bank Name"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="accountHolderName"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="accountHolderName">
                                Account Holder&apos;s Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    id="accountHolderName"
                                    placeholder="Enter Account Holder's Name"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="branchName"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="branchName">
                                Branch Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    id="branchName"
                                    placeholder="Enter Branch Name"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="accountNumber"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="accountNumber">
                                Account Number
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    id="accountNumber"
                                    placeholder="Enter Account Number"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="ifscCode"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="ifscCode">IFSC Code</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    id="ifscCode"
                                    placeholder="Enter IFSC Code"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="cancelCheque"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="cancelCheque">
                                Upload Cancel Cheque
                            </FormLabel>
                            <FormControl>
                                <Input
                                    onChange={() => {
                                        field.onChange("http://www.google.com");
                                    }}
                                    type="file"
                                    id="cancelCheque"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="mt-4 flex justify-end">
                    <Button>Save</Button>
                </div>
            </form>
        </Form>
    );
};

export default BankDetails;
