import React, { useEffect } from "react";
import {
    FormItem,
    FormControl,
    FormField,
    FormMessage,
    FormLabel,
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
import { UseFormReturn } from "react-hook-form";
import { createSchema } from "../schemas";
import { z } from "zod";

const allNationalities = dropdown.getAllNationalities();

interface GeneralDetailFormProps {
    form: UseFormReturn<z.infer<typeof createSchema>>;
}

const GeneralDetailForm: React.FC<GeneralDetailFormProps> = ({ form }) => {
    const type = form.watch("generalDetails.clientType");
    return (
        <div className="mt-2 flex flex-col gap-2">
            <h3 className="text-md font-semibold">General Details</h3>
            <FormField
                name="generalDetails.portfolioName"
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
                name="generalDetails.customerCodeNumber"
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
                name="generalDetails.portfolioCode"
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
                name="generalDetails.contactNumber"
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
                name="generalDetails.email"
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
                name="generalDetails.nationality"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="nationality">Nationality</FormLabel>
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
                name="generalDetails.clientType"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="nationality">Client Type</FormLabel>
                        <FormControl>
                            <Select
                                value={field.value}
                                onValueChange={(e) => field.onChange(e)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Client Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {["Seller", "Buyer", "Both"].map((item) => (
                                        <SelectItem
                                            key={item}
                                            value={item.toLowerCase()}
                                        >
                                            {item}
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
                name="generalDetails.password"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <FormControl>
                            <Input
                                id="password"
                                {...field}
                                type="password"
                                placeholder="Enter Password"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                name="generalDetails.confirmPassword"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="confirmPassword">
                            Confirm Password
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                id="confirmPassword"
                                type="password"
                                placeholder="Enter Confirm Password"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                name="generalDetails.isClientSEZ"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="isClientSEZ">Client SEZ</FormLabel>
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
                name="generalDetails.isActive"
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
                    name="generalDetails.buyerLimit"
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
                                            sanitized ? Number(sanitized) : 0
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
                    name="generalDetails.sellerLimit"
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
                                            sanitized ? Number(sanitized) : 0
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
                name="generalDetails.noc"
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
        </div>
    );
};

export default GeneralDetailForm;
