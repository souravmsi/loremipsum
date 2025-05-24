import { z } from "zod";

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
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .refine(
                (val) =>
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(val),
                {
                    message:
                        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
                }
            ),
        confirmPassword: z
            .string()
            .min(1, { message: "Confirm Password is required" }),
        nationality: z.string().min(1, { message: "Nationality is required" }),
        clientType: z.enum(["seller", "buyer", "both"]),
        isClientSEZ: z.boolean(),
        isActive: z.boolean(),

        noc: z.string().url(),

        sellerLimit: z.number().min(1).optional(),
        buyerLimit: z.number().min(1).optional(),
    })
    .refine(
        (data) => {
            return data.password === data.confirmPassword;
        },
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    )
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

export const bankDetailsSchema = z.object({
    bankName: z.string().min(1, { message: "Bank name is required" }),
    accountHolderName: z
        .string()
        .min(1, { message: "Account Holder's name is required" }),
    branchName: z.string().min(1, { message: "Branch name is required" }),
    accountNumber: z
        .string()
        .min(16, { message: "Account number must be 16 digits." })
        .max(16, { message: "Account number must be 16 digits." })
        .regex(/^\d{16}$/, {
            message: "Account number must be a 16-digit number.",
        }),

    ifscCode: z.string().regex(/^[A-Za-z]{4}0\d{6}$/, {
        message:
            "IFSC code must have four letters, followed by 0, and six digits.",
    }),

    cancelCheque: z.string().url(),
});

export const customerDetailsSchema = z.object({
    residentialAddress: z
        .string()
        .min(1, { message: "Residential Address is required" }),
    registeredOfficeAddress: z
        .string()
        .min(1, { message: "Registered Office is required" }),
    gstNumber: z
        .string()
        .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, {
            message: "Please enter a valid GST number",
        }),
    panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, {
        message: "Please enter a valid PAN number",
    }),
    tanNumber: z.string().regex(/^[A-Z]{4}[0-9]{5}[A-Z]$/, {
        message: "Please enter a valid TAN number",
    }),

    gst: z.string().url(),
    pan: z.string().url(),
    tan: z.string().url(),
});

export const rtmSchema = z.object({
    multiplier: z.number().min(1),
    recipientEmails: z.array(z.string().email()).min(1),
    fileMiddleName: z
        .string()
        .min(1, { message: "File Middle Name is required" }),
    fileSuffix: z.string().min(1, { message: "File Suffix is required" }),
});

export const damSchema = z.object({
    multiplier: z.number().min(1),
    recipientEmails: z.array(z.string().email()).min(1),
    fileMiddleName: z
        .string()
        .min(1, { message: "File Middle Name is required" }),
    fileSuffix: z.string().min(1, { message: "File Suffix is required" }),
});

export const gdamSchema = z.object({
    multiplier: z.number().min(1),
    recipientEmails: z.array(z.string().email()).min(1),
    fileMiddleName: z
        .string()
        .min(1, { message: "File Middle Name is required" }),
    fileSuffix: z.string().min(1, { message: "File Suffix is required" }),
});

export const recSchema = z.object({
    multiplier: z.number().min(1),
    recipientEmails: z.array(z.string().email()).min(1),
    fileMiddleName: z
        .string()
        .min(1, { message: "File Middle Name is required" }),
    fileSuffix: z.string().min(1, { message: "File Suffix is required" }),
});

export const tamSchema = z.object({
    multiplier: z.number().min(1),
    recipientEmails: z.array(z.string().email()).min(1),
    fileMiddleName: z
        .string()
        .min(1, { message: "File Middle Name is required" }),
    fileSuffix: z.string().min(1, { message: "File Suffix is required" }),
});

export const gtamSchema = z.object({
    multiplier: z.number().min(1),
    recipientEmails: z.array(z.string().email()).min(1),
    fileMiddleName: z
        .string()
        .min(1, { message: "File Middle Name is required" }),
    fileSuffix: z.string().min(1, { message: "File Suffix is required" }),
});

export const obligationReportSchema = z.object({
    rtm: rtmSchema,
    dam: damSchema,
    gdam: gdamSchema,
    rec: recSchema,
    tam: tamSchema,
    gtam: gtamSchema,
});

export const createSchema = z.object({
    options: z
        .array(z.enum(["rmt", "dam", "gam", "rec", "tam", "gtam"]))
        .min(1),
    generalDetails: generalDetailsSchema,
    bankDetails: bankDetailsSchema,
    customerDetails: customerDetailsSchema,
    obligationReportDetails: obligationReportSchema,
});
