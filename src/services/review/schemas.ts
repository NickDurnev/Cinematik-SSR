import * as z from "zod";

export const reviewFormSchema = z.object({
  text: z
    .string({
      required_error: "Text is required",
    })
    .trim()
    .min(5, "Text must be at least 5 characters")
    .max(200, "Text must be less than 200 characters"),
  rating: z.string({ required_error: "Rating is required" }),
});

export type IReviewFormSchema = z.infer<typeof reviewFormSchema>;
