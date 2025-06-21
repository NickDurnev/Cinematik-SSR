"use client";
import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";

//#Services
import { IReviewData } from "@/types/review";
import { IUser } from "@/types/user";

import { ErrorMessage } from "@hookform/error-message";

//#Styles
import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";

interface IProps {
  addReview: (review: IReviewData) => void;
  currentUser: IUser;
}

const DEFAULT_RATING = 4;

const AddReview = ({ addReview, currentUser }: IProps) => {
  const [value, setValue] = useState<number>(DEFAULT_RATING);
  const { name, picture } = currentUser;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async ({ text }: { text: string }): Promise<void> => {
    const date = moment().format("DD-MM-YYYY");
    const review = {
      createdAt: date,
      name: name,
      picture: picture,
      text: text,
      rating: value.toString(),
    };
    await addReview(review);

    setValue(2);
    reset();
  };
  return (
    <div className="mx-auto laptopL:mb-[115px] laptopM:mb-[100px] mb-20 w-full">
      <div className="rounded-2xl text-center">
        <form
          className="m-0 w-full laptopL:max-w-[900px] laptopM:max-w-[685px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            className="laptopM:m-0 mx-auto block w-full laptopM:max-w-[900px] max-w-[500px] resize-none rounded-[10px] border-[0.5px] border-mainText bg-transparent laptopM:p-[35px] p-[15px] font-inherit text-mainText text-sm leading-4 outline-none placeholder:font-inherit placeholder:laptopM:text-xl placeholder:text-addText placeholder:text-sm placeholder:laptopM:leading-5 placeholder:leading-4"
            placeholder="Add a comment..."
            rows={11}
            cols={55}
            {...register("text", {
              required: "You need type something",
              maxLength: {
                value: 200,
                message: "A maximum length is 200 symbols",
              },
              minLength: {
                value: 5,
                message: "Longer than 5 symbols",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="text"
            render={({ message }) => (
              <p
                style={{ color: "white", fontSize: "20px", marginTop: "10px" }}
              >
                {message}
              </p>
            )}
          />
          <div className="laptopM:mt-[30px] mt-5 ml-auto laptopL:w-[220px] laptopM:w-[210px] w-[350px]">
            <Rating
              className="text-mainText [&>span]:px-1.5 laptopM:[&>span]:px-2.5"
              name="Rating"
              value={value}
              onChange={(_, newValue) => {
                setValue(newValue || DEFAULT_RATING);
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
            <button
              type="submit"
              className="mx-auto laptopM:mt-[30px] mt-5 block w-full rounded-[10px] border-[0.5px] border-mainText bg-transparent p-5 laptopL:text-[27px] text-base text-mainText uppercase laptopL:leading-[27px] leading-4"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
