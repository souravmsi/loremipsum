"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Form } from "@/components/ui/form";
import GeneralDetailForm from "./general-detail-form";
import ObligationReportForm from "./obligation-report-detail";
import BankDetailForm from "./bank-detail";
import CustomerDetailForm from "./customer-detail-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const generalDetails = {
    portfolioName: "",
    customerCodeNumber: "",
    portfolioCode: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    nationality: "",
    buyerLimit: 0,
    sellerLimit: 0,
    noc: "",
    isClientSEZ: false,
    isActive: false,
};

const bankDetails = {
    bankName: "",
    accountHolderName: "",
    branchName: "",
    accountNumber: "",
    ifscCode: "",
    cancelCheque: "",
};

const customerDetails = {
    residentialAddress: "",
    registeredOfficeAddress: "",
    gstNumber: "",
    panNumber: "",
    tanNumber: "",
    gst: "",
    pan: "",
    tan: "",
};

const obligationDefaultValue = {
    multiplier: 0,
    fileMiddleName: "",
    fileSuffix: "",
    recipientEmails: [],
};

const obligationReportDetails = {
    rtm: obligationDefaultValue,
    dam: obligationDefaultValue,
    gdam: obligationDefaultValue,
    rec: obligationDefaultValue,
    tam: obligationDefaultValue,
    gtam: obligationDefaultValue,
};

export default function AddClient() {
    const [step, setStep] = useState<number>(1);

    const form = useForm<z.infer<typeof createSchema>>({
        defaultValues: {
            generalDetails,
            bankDetails,
            customerDetails,
            obligationReportDetails,
        },
        resolver: zodResolver(createSchema),
        mode: "all",
    });

    const stepper = {
        1: <GeneralDetailForm form={form} />,
        2: <ObligationReportForm form={form} />,
        3: <BankDetailForm form={form} />,
        4: <CustomerDetailForm form={form} />,
    };

    const prevHandler = () => {
        setStep((prev) => prev - 1);
    };

    const nextHandler = async () => {
        // const isValid = await form.trigger();
        // if (isValid) setStep((prev) => prev + 1);
        setStep((prev) => prev + 1);
    };

    const onSubmit = async (values: z.infer<typeof createSchema>) => {
        console.log(values);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">Add Client</Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col overflow-auto h-[80vh]">
                <DialogHeader className="mt-4">
                    <DialogTitle>Create New Client</DialogTitle>
                </DialogHeader>

                <div className="w-full pt-0 mx-auto">
                    <Progress value={step * 25} className="h-2 w-full" />
                </div>

                <Form {...form}>
                    <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
                        <div>{stepper[step]}</div>

                        <div className="mt-4 flex justify-between">
                            <Button
                                type="button"
                                variant={"outline"}
                                size={"lg"}
                                disabled={step <= 1}
                                onClick={prevHandler}
                            >
                                Previous
                            </Button>
                            {step < 4 && (
                                <Button
                                    type="button"
                                    size={"lg"}
                                    disabled={step >= 4}
                                    onClick={nextHandler}
                                >
                                    Next
                                </Button>
                            )}
                            {step === 4 && (
                                <Button type="submit">Create</Button>
                            )}
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
