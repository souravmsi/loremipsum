import React from "react";
import {
    FormItem,
    FormControl,
    FormField,
    FormMessage,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { createSchema } from "../schemas";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";

interface GeneralDetailFormProps {
    form: UseFormReturn<z.infer<typeof createSchema>>;
}

const CustomerDetailForm: React.FC<GeneralDetailFormProps> = ({ form }) => {
    return (
        <div className="mt-2 flex flex-col gap-2">
            <h3 className="text-md font-semibold">Customer Details</h3>
            <FormField
                name="customerDetails.residentialAddress"
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
                name="customerDetails.registeredOfficeAddress"
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
                name="customerDetails.panNumber"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="panNumber">PAN Number</FormLabel>
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
                name="customerDetails.gstNumber"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="gstNumber">GST Number</FormLabel>
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
                name="customerDetails.tanNumber"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="tanNumber">TAN Number</FormLabel>
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
                name="customerDetails.pan"
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
                name="customerDetails.gst"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="gst">Upload GST Document</FormLabel>
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
                name="customerDetails.tan"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="pan">Upload TAN Document</FormLabel>
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
        </div>
    );
};

export default CustomerDetailForm;
