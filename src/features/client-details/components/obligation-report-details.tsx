"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientDetailsResponse } from "@/utils/types";
import { TagInput, Tag } from "emblor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    FormItem,
    FormControl,
    FormField,
    FormMessage,
    FormLabel,
    Form,
} from "@/components/ui/form";
import {
    rtmSchema,
    damSchema,
    gdamSchema,
    tamSchema,
    gtamSchema,
    recSchema,
} from "../schemas";

interface PropTypes {
    rtm: ClientDetailsResponse["payload"]["rtm"];
    dam: ClientDetailsResponse["payload"]["dam"];
    gdam: ClientDetailsResponse["payload"]["gdam"];
    gtam: ClientDetailsResponse["payload"]["gtam"];
    tam: ClientDetailsResponse["payload"]["tam"];
    rec: ClientDetailsResponse["payload"]["rec"];
}

const RTM = ({ data }: { data: PropTypes["rtm"] }) => {
    const form = useForm<z.infer<typeof rtmSchema>>({
        defaultValues: {
            multiplier: 0,
            recipientEmails: [],
        },
        resolver: zodResolver(rtmSchema),
        mode: "onSubmit",
    });

    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
    const emails = form.watch("recipientEmails");

    const tags: Tag[] = emails.map(
        (item, index): Tag => ({
            id: (index + 1).toString(),
            text: item,
        })
    );

    const onSubmit = async (values: z.infer<typeof rtmSchema>) => {
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
                    name="multiplier"
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
                            value={``}
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
                    name="recipientEmails"
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
                                {form.formState.errors?.recipientEmails &&
                                    "Invalid Email"}
                            </FormMessage>
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

const DAM = ({ data }: { data: PropTypes["dam"] }) => {
    const form = useForm<z.infer<typeof damSchema>>({
        defaultValues: {
            multiplier: 0,
            recipientEmails: [],
        },
        resolver: zodResolver(damSchema),
        mode: "onSubmit",
    });

    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
    const emails = form.watch("recipientEmails");

    const tags: Tag[] = emails.map(
        (item, index): Tag => ({
            id: (index + 1).toString(),
            text: item,
        })
    );
    const onSubmit = async (values: z.infer<typeof damSchema>) => {
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
                    name="multiplier"
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
                            value={``}
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
                    name="recipientEmails"
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
                                {form.formState.errors?.recipientEmails &&
                                    "Invalid Email"}
                            </FormMessage>
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

const GDAM = ({ data }: { data: PropTypes["gdam"] }) => {
    const form = useForm<z.infer<typeof gdamSchema>>({
        defaultValues: {
            multiplier: 0,
            recipientEmails: [],
        },
        resolver: zodResolver(gdamSchema),
        mode: "onSubmit",
    });

    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
    const emails = form.watch("recipientEmails");

    const tags: Tag[] = emails.map(
        (item, index): Tag => ({
            id: (index + 1).toString(),
            text: item,
        })
    );
    const onSubmit = async (values: z.infer<typeof gdamSchema>) => {
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
                    name="multiplier"
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
                                    id="gdam.multiplier"
                                    placeholder="Enter Margin Multiplier"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormItem>
                    <FormLabel htmlFor="dam.fileName">GDAM File Name</FormLabel>
                    <FormControl>
                        <Input
                            value={``}
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
                    name="recipientEmails"
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
                                {form.formState.errors?.recipientEmails &&
                                    "Invalid Email"}
                            </FormMessage>
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

const TAM = ({ data }: { data: PropTypes["tam"] }) => {
    const form = useForm<z.infer<typeof tamSchema>>({
        defaultValues: {
            multiplier: 0,
            recipientEmails: [],
        },
        resolver: zodResolver(tamSchema),
        mode: "onSubmit",
    });

    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
    const emails = form.watch("recipientEmails");

    const tags: Tag[] = emails.map(
        (item, index): Tag => ({
            id: (index + 1).toString(),
            text: item,
        })
    );
    const onSubmit = async (values: z.infer<typeof tamSchema>) => {
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
                    name="multiplier"
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
                            value={``}
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
                    name="recipientEmails"
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
                                {form.formState.errors?.recipientEmails &&
                                    "Invalid Email"}
                            </FormMessage>
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

const GTAM = ({ data }: { data: PropTypes["gtam"] }) => {
    const form = useForm<z.infer<typeof gtamSchema>>({
        defaultValues: {
            multiplier: 0,
            recipientEmails: [],
        },
        resolver: zodResolver(gtamSchema),
        mode: "onSubmit",
    });

    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
    const emails = form.watch("recipientEmails");

    const tags: Tag[] = emails.map(
        (item, index): Tag => ({
            id: (index + 1).toString(),
            text: item,
        })
    );
    const onSubmit = async (values: z.infer<typeof gtamSchema>) => {
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
                    name="multiplier"
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
                                    id="gtam.multiplier"
                                    placeholder="Enter Margin Multiplier"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormItem>
                    <FormLabel htmlFor="gtam.fileName">
                        GTAM File Name
                    </FormLabel>
                    <FormControl>
                        <Input
                            value={``}
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
                    name="recipientEmails"
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
                                {form.formState.errors?.recipientEmails &&
                                    "Invalid Email"}
                            </FormMessage>
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

const REC = ({ data }: { data: PropTypes["rec"] }) => {
    const form = useForm<z.infer<typeof recSchema>>({
        defaultValues: {
            multiplier: 0,
            recipientEmails: [],
        },
        resolver: zodResolver(recSchema),
        mode: "onSubmit",
    });

    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
    const emails = form.watch("recipientEmails");

    const tags: Tag[] = emails.map(
        (item, index): Tag => ({
            id: (index + 1).toString(),
            text: item,
        })
    );
    const onSubmit = async (values: z.infer<typeof recSchema>) => {
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
                    name="multiplier"
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
                                    id="rec.multiplier"
                                    placeholder="Enter Margin Multiplier"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormItem>
                    <FormLabel htmlFor="rec.fileName">REC File Name</FormLabel>
                    <FormControl>
                        <Input
                            value={``}
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
                    name="recipientEmails"
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
                                {form.formState.errors?.recipientEmails &&
                                    "Invalid Email"}
                            </FormMessage>
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

const ObligationReportDetails: React.FC<PropTypes> = ({
    rtm,
    dam,
    rec,
    tam,
    gtam,
    gdam,
}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Obligation Report Details</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="dam">
                    <TabsList>
                        <TabsTrigger value="dam">DAM</TabsTrigger>
                        <TabsTrigger value="gdam">GDAM</TabsTrigger>
                        <TabsTrigger value="tam">TAM</TabsTrigger>
                        <TabsTrigger value="gtam">GTAM</TabsTrigger>
                        <TabsTrigger value="rtm">RTM</TabsTrigger>
                        <TabsTrigger value="rec">REC</TabsTrigger>
                    </TabsList>
                    <TabsContent value="dam">
                        <DAM data={dam} />
                    </TabsContent>
                    <TabsContent value="gdam">
                        <GDAM data={gdam} />
                    </TabsContent>
                    <TabsContent value="tam">
                        <TAM data={tam} />
                    </TabsContent>
                    <TabsContent value="gtam">
                        <GTAM data={gtam} />
                    </TabsContent>
                    <TabsContent value="rtm">
                        <RTM data={rtm} />
                    </TabsContent>
                    <TabsContent value="rec">
                        <REC data={rec} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default ObligationReportDetails;
