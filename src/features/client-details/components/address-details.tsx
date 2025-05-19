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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressDetailsSchema } from "../schemas";
import { ClientDetailsResponse } from "@/utils/types";
import { Button } from "@/components/ui/button";

type PropTypes = {
    data: ClientDetailsResponse["payload"]["address"];
};

const AddressDetails = ({ data }: PropTypes) => {
    const form = useForm<z.infer<typeof addressDetailsSchema>>({
        defaultValues: {
            residentialAddress: (data?.residentialAddress as string) || "",
            registeredOfficeAddress: "",
            panNumber: data?.panNumber || "",
            gstNumber: "",
            tanNumber: "",
            pan: "",
            tan: "",
            gst: "",
        },
        resolver: zodResolver(addressDetailsSchema),
        mode: "onSubmit",
    });

    const onSubmit = async (values: z.infer<typeof addressDetailsSchema>) => {
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
                    name="residentialAddress"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="residentialAddress">
                                Residential Address
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    id={"residentialAddress"}
                                    placeholder="Enter Residential Address"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="registeredOfficeAddress"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="registeredOfficeAddress">
                                Registered Office Address
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    id={"registeredOfficeAddress"}
                                    placeholder="Enter Registered Office Address"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="panNumber"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="panNumber">
                                PAN Number
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    id="panNumber"
                                    placeholder="Enter PAN Number"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="gstNumber"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="gstNumber">
                                GST Number
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    id="gstNumber"
                                    placeholder="Enter GST Number"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="tanNumber"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="tanNumber">
                                TAN Number
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    id="tanNumber"
                                    placeholder="Enter TAN Number"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="pan"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="pan">Upload Pancard</FormLabel>
                            <FormControl>
                                <Input
                                    onChange={() => {
                                        field.onChange("http://www.google.com");
                                    }}
                                    type="file"
                                    id="pan"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="gst"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="gst">
                                Upload GST Document
                            </FormLabel>
                            <FormControl>
                                <Input
                                    onChange={() => {
                                        field.onChange("http://www.google.com");
                                    }}
                                    type="file"
                                    id="gst"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="tan"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="pan">
                                Upload TAN Document
                            </FormLabel>
                            <FormControl>
                                <Input
                                    onChange={() => {
                                        field.onChange("http://www.google.com");
                                    }}
                                    type="file"
                                    id="tan"
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

export default AddressDetails;
