"use client";

import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

import { IReviewFormSchema, reviewFormSchema } from "@/services/review/schemas";
import { IReview } from "@/types/review";

import { Button } from "../common/Button";
import { Input } from "../common/Input";

const DEFAULT_RATING = 4;

type Props = {
  onSubmit: (data: IReviewFormSchema) => void;
  isLoading: boolean;
  reviewToUpdate?: IReview;
};

export const AddReviewForm = ({
  onSubmit,
  isLoading,
  reviewToUpdate,
}: Props) => {
  const [rating, setRating] = useState(
    Number(reviewToUpdate?.rating) || DEFAULT_RATING,
  );

  const form = useForm({
    defaultValues: {
      text: reviewToUpdate?.text || "",
      rating: DEFAULT_RATING.toString(),
    },
    validators: {
      onChange: reviewFormSchema,
      onBlur: reviewFormSchema,
    },
    onSubmit: ({ value }) => {
      onSubmit({
        text: value.text,
        rating: rating.toString(),
      });
      setRating(DEFAULT_RATING);
    },
  });

  return (
    <form
      className="m-0 mx-auto flex w-full laptopL:max-w-[900px] laptopM:max-w-[685px] flex-col gap-3 rounded-2xl text-center"
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field name="text">
        {field => (
          <Input
            className="laptopM:m-0 mx-auto block w-full laptopM:max-w-[900px] max-w-[500px] resize-none rounded-[10px] border-[0.5px] border-mainText bg-transparent laptopM:p-[35px] p-[15px] font-inherit text-mainText text-sm leading-4 outline-none placeholder:font-inherit placeholder:laptopM:text-xl placeholder:text-addText placeholder:text-sm placeholder:laptopM:leading-5 placeholder:leading-4"
            placeholder="Add a comment..."
            multiline
            value={field.state.value}
            onChange={e => {
              field.handleChange(e.target.value);
            }}
            required
            error={field.state?.meta?.errors?.length > 0}
            helperText={field.state?.meta?.errors[0]?.message}
          />
        )}
      </form.Field>
      <div className="mx-auto laptopL:w-[220px] laptopM:w-[210px] w-[350px] py-6">
        <Rating
          className="text-mainText [&>span]:px-1.5 laptopM:[&>span]:px-2.5"
          name="Rating"
          value={rating}
          onChange={(_, newValue) => {
            setRating(newValue || DEFAULT_RATING);
          }}
          precision={0.5}
          size="large"
          icon={
            <StarIcon
              fontSize="inherit"
              style={{
                stroke: "#fff",
              }}
            />
          }
          emptyIcon={
            <StarIcon
              fontSize="inherit"
              style={{
                stroke: "#fff",
              }}
            />
          }
          sx={{
            fontSize: "25px",
          }}
        />
      </div>
      <form.Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => {
          console.log("🚀 ~ AddReviewForm ~ canSubmit:", canSubmit);
          return (
            <div className="flex w-full items-center justify-center">
              <Button
                type="submit"
                variant="outlined"
                disabled={!canSubmit || isSubmitting || isLoading}
                className="mx-auto w-[200px] laptop:text-xl tablet:text-lg text-base"
                loading={isSubmitting || isLoading}
                loadingPosition="end"
                sx={{ padding: "15px 0" }}
              >
                {isSubmitting ? "Sending..." : "Send"}
              </Button>
            </div>
          );
        }}
      </form.Subscribe>
    </form>
  );
};
