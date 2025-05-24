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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import dropdown from "@dropdowns/nationalities";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { generalDetailsSchema } from "../schemas";
import { ResponseData } from "@/utils/types";
import { Button } from "@/components/ui/button";

const allNationalities = dropdown.getAllNationalities();

const GeneralDetailForm = ({ data }: { data: ResponseData }) => {
    const form = useForm<z.infer<typeof generalDetailsSchema>>({
        defaultValues: {
            portfolioName: data?.portfolioName || "",
            customerCodeNumber: "",
            portfolioCode: data?.portfolioCode || "",
            contactNumber: data?.contactNumber || "",
            email: data?.primaryEmail || "",
            nationality: data?.nationality || "",
            clientType: data?.type.toLowerCase() as "seller" | "buyer" | "both",
            isActive: data?.isActive || false,
            isClientSEZ: data?.isSezClient || false,
            buyerLimit: 0,
            sellerLimit: 0,
        },
        resolver: zodResolver(generalDetailsSchema),
        mode: "onSubmit",
    });
    const type = form.watch("clientType");

    const onSubmit = async (values: z.infer<typeof generalDetailsSchema>) => {
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
                    name="portfolioName"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="portfolioName">
                                Portfolio Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    id="portfolioName"
                                    {...field}
                                    placeholder="Enter Portfolio Name"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="customerCodeNumber"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="customerCodeNumber">
                                Customer Code Number
                            </FormLabel>
                            <FormControl>
                                <Input
                                    id="customerCodeNumber"
                                    {...field}
                                    placeholder="Enter Customer Code Number"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="portfolioCode"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="portfolioCode">
                                Portfolio Code
                            </FormLabel>
                            <FormControl>
                                <Input
                                    id="portfolioCode"
                                    {...field}
                                    placeholder="Enter Portfolio Code"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="contactNumber"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="contactNumber">
                                Contact Number
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    id="contactNumber"
                                    {...field}
                                    placeholder="Enter Contact Number"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    id="email"
                                    type="email"
                                    placeholder="Enter email address"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="nationality"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="nationality">
                                Nationality
                            </FormLabel>
                            <FormControl>
                                <Select
                                    value={field.value}
                                    onValueChange={(e) => field.onChange(e)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Nationality" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {allNationalities.map((item) => (
                                            <SelectItem
                                                key={item.name}
                                                value={item.name}
                                            >
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="clientType"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="nationality">
                                Client Type
                            </FormLabel>
                            <FormControl>
                                <Select
                                    value={field.value}
                                    onValueChange={(e) => field.onChange(e)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Client Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {["Seller", "Buyer", "Both"].map(
                                            (item) => (
                                                <SelectItem
                                                    key={item}
                                                    value={item.toLowerCase()}
                                                >
                                                    {item}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="isClientSEZ"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="isClientSEZ">
                                Client SEZ
                            </FormLabel>
                            <FormControl>
                                <div>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="isActive"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="isClientSEZ">Active</FormLabel>
                            <FormControl>
                                <div>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {(type === "buyer" || type === "both") && (
                    <FormField
                        name="buyerLimit"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="buyerLimit">
                                    Buyer Limit (MW)
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
                                            if (
                                                sanitized &&
                                                isNaN(Number(sanitized))
                                            ) {
                                                return;
                                            }
                                            field.onChange(
                                                sanitized
                                                    ? Number(sanitized)
                                                    : 0
                                            );
                                        }}
                                        type="text"
                                        id="buyerLimit"
                                        placeholder="Enter Buyer Limit"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                {(type === "seller" || type === "both") && (
                    <FormField
                        name="sellerLimit"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="sellerLimit">
                                    Seller Limit (MW)
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
                                            if (
                                                sanitized &&
                                                isNaN(Number(sanitized))
                                            ) {
                                                return;
                                            }
                                            field.onChange(
                                                sanitized
                                                    ? Number(sanitized)
                                                    : 0
                                            );
                                        }}
                                        type="text"
                                        id="sellerLimit"
                                        placeholder="Enter Seller Limit"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <FormField
                    name="noc"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="noc">Upload NOC</FormLabel>
                            <FormControl>
                                <Input
                                    onChange={() => {
                                        field.onChange("http://www.google.com");
                                    }}
                                    type="file"
                                    id="noc"
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

export default GeneralDetailForm;
