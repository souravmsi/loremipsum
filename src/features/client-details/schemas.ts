import { z } from "zod";
import {
    bankDetailsSchema,
    customerDetailsSchema as addressDetailsSchema,
    rtmSchema as rtm,
    damSchema as dam,
    tamSchema as tam,
    gtamSchema as gtam,
    recSchema as rec,
    gdamSchema as gdam,
} from "@/features/clients/schemas";

export const generalDetailsSchema = z
    .object({
        portfolioName: z
            .string()
            .min(1, { message: "Portfolio name is required" }),
        customerCodeNumber: z
            .string()
            .min(1, { message: "Customer code number is required" }),
        portfolioCode: z
            .string()
            .min(1, { message: "Portfolio code is required" }),
        contactNumber: z.string().regex(/^\d{10}$/, {
            message: "Contact number must be exactly 10 digits",
        }),
        email: z.string().email({ message: "Invalid email address" }),
        nationality: z.string().min(1, { message: "Nationality is required" }),
        clientType: z.enum(["seller", "buyer", "both"]),
        isClientSEZ: z.boolean(),
        isActive: z.boolean(),

        noc: z.string().url(),

        sellerLimit: z.number().min(1).optional(),
        buyerLimit: z.number().min(1).optional(),
    })
    .superRefine((data, ctx) => {
        if (data.clientType === "buyer" || data.clientType === "both") {
            if (data.buyerLimit === undefined) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["buyerLimit"],
                    message:
                        "Buyer limit is required when client type is buyer or both",
                });
            }
        }
        if (data.clientType === "seller" || data.clientType === "both") {
            if (data.sellerLimit === undefined) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["sellerLimit"],
                    message:
                        "Seller limit is required when client type is seller or both",
                });
            }
        }
    });

const rtmSchema = rtm.omit({
    fileMiddleName: true,
    fileSuffix: true,
});

const damSchema = dam.omit({
    fileMiddleName: true,
    fileSuffix: true,
});

const gdamSchema = gdam.omit({
    fileMiddleName: true,
    fileSuffix: true,
});

const tamSchema = tam.omit({
    fileMiddleName: true,
    fileSuffix: true,
});

const gtamSchema = gtam.omit({
    fileMiddleName: true,
    fileSuffix: true,
});

const recSchema = rec.omit({
    fileMiddleName: true,
    fileSuffix: true,
});

export {
    bankDetailsSchema,
    addressDetailsSchema,
    rtmSchema,
    damSchema,
    gdamSchema,
    tamSchema,
    gtamSchema,
    recSchema,
};
