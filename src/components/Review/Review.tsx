"use client";
import { Avatar } from "@/components";
import { IReview } from "@/types/review";
import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";
import { motion } from "framer-motion";

const Review = ({ review }: { review: IReview }) => {
  const { picture, name, rating, text, createdAt } = review;
  return (
    <motion.li
      className="w-full border-addText border-b-[0.5px] bg-transparent pb-[35px] text-mainText"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <div className="laptopM:mb-[50px] mb-[35px] flex w-[210px] items-center justify-between">
        <Avatar picture={picture} name={name} size={50} />
        <Rating
          className="flex w-[140px] justify-between text-mainText"
          name="read-only"
          value={Number(rating)}
          readOnly
          precision={0.5}
          icon={
            <StarIcon
              fontSize="inherit"
              style={{
                width: "18px",
                height: "18px",
                stroke: "#fff",
              }}
            />
          }
          emptyIcon={
            <StarIcon
              fontSize="inherit"
              style={{
                width: "18px",
                height: "18px",
                stroke: "#fff",
              }}
            />
          }
        />
      </div>
      <div className="w-full text-left">
        <p className="laptopL:mb-[65px] laptopM:mb-[50px] mb-[35px] laptopL:w-[690px] laptopM:w-[540px]">
          {text}
        </p>
        <div className="flex items-center justify-between">
          <p className="font-normal text-base text-mainText leading-4">
            {name}
          </p>
          <p className="font-normal text-base text-mainText leading-4">
            {createdAt}
          </p>
        </div>
      </div>
    </motion.li>
  );
};

export default Review;
