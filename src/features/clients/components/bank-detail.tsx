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

interface GeneralDetailFormProps {
    form: UseFormReturn<z.infer<typeof createSchema>>;
}

const BankDetailForm: React.FC<GeneralDetailFormProps> = ({ form }) => {
    return (
        <div className="mt-2 flex flex-col gap-2">
            <h3 className="text-md font-semibold">Bank Details</h3>
            <FormField
                name="bankDetails.bankName"
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
                name="bankDetails.accountHolderName"
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
                name="bankDetails.branchName"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="branchName">Branch Name</FormLabel>
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
                name="bankDetails.accountNumber"
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
                name="bankDetails.ifscCode"
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
                name="bankDetails.cancelCheque"
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
        </div>
    );
};

export default BankDetailForm;
