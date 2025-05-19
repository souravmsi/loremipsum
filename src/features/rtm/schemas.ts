import { z } from "zod";

const baseSchema = z.object({
    mode: z.enum(["manual", "automatic"]),
    client: z.object(
        {
            name: z.string(),
            id: z.string().uuid({ message: "Please select the client" }),
        },
        {
            message: "Please select the client",
        }
    ),
    bidType: z.enum(["single", "block"]),
    bids: z
        .array(
            z.object({
                blockNumber: z.number(),
                startTime: z.string(),
                endTime: z.string(),
                price: z.number(),
                volume: z.number(),
            })
        )
        .optional(),
    startTime: z.number().optional(),
    endTime: z.number().optional(),
    price: z.number().optional(),
    volume: z.number().optional(),
});

const rtmBidSchema = baseSchema.superRefine((data, ctx) => {
    if (data.bidType === "single") {
        const bids = data.bids || [];
        if (bids.length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["bids"],
                message: "Select atleast one block",
            });
        }
        const filterData = bids.find(
            (item) => item.volume <= 0 || item.price <= 0
        );

        if (filterData) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["bids"],
                message: "Price and Volume should be greater than 0",
            });
        }
    }

    if (data.bidType === "block") {
        if (data.startTime === undefined || data.endTime === undefined) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["bids"],
                message: "Select start time and end time",
            });
        }
        if (data.volume! <= 0 || data.price! <= 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["price"],
                message: "price and volume should be greater than 0",
            });
        }
    }
});

const rtmAdvanceBidsSchema = baseSchema
    .extend({
        date: z.date({ message: "Please select date" }),
    })
    .superRefine((data, ctx) => {
        if (data.bidType === "single") {
            const bids = data.bids || [];
            if (bids.length === 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["bids"],
                    message: "Select atleast one block",
                });
            }
            const filterData = bids.find(
                (item) => item.volume <= 0 || item.price <= 0
            );

            if (filterData) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["bids"],
                    message: "Price and Volume should be greater than 0",
                });
            }
        }

        if (data.bidType === "block") {
            if (data.startTime === undefined || data.endTime === undefined) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["bids"],
                    message: "Select start time and end time",
                });
            }
            if (data.volume! <= 0 || data.price! <= 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    path: ["price"],
                    message: "price and volume should be greater than 0",
                });
            }
        }
    });

export { rtmBidSchema, rtmAdvanceBidsSchema };
