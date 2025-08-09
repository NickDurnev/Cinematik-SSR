"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";

import { Avatar, Button, Show } from "@/components";
import { UserStore, useUserStore } from "@/hooks/stores";
import { IReview } from "@/types/review";
import { cardVariants } from "@/utils/animations";
import { formatDate } from "@/utils/dateFormatter";

type Props = {
  review: IReview;
  handleDelete: () => void;
  handleUpdate: () => void;
  isDeletePending: boolean;
  isUpdatePending: boolean;
};

const Review = ({
  review,
  handleDelete,
  handleUpdate,
  isDeletePending,
  isUpdatePending,
}: Props) => {
  const { picture, name, rating, text, created_at, updated_at } = review;
  const user = useUserStore((state: UserStore) => state.user);

  return (
    <motion.li
      className="flex w-full flex-col gap-y-8 border-foreground border-b-[0.5px] bg-transparent pb-6 text-mainText"
      variants={cardVariants}
      initial="closed"
      whileInView="open"
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-x-10">
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
        <Show when={user.id === review.user_id}>
          <Stack direction="row" spacing={2}>
            <Button
              isIconButton={true}
              aria-label="delete"
              disabled={isDeletePending || isUpdatePending}
              loading={isDeletePending}
              onClick={handleDelete}
            >
              <DeleteIcon />
            </Button>
            <Button
              isIconButton={true}
              aria-label="update"
              disabled={isDeletePending || isUpdatePending}
              loading={isUpdatePending}
              onClick={handleUpdate}
            >
              <EditIcon />
            </Button>
          </Stack>
        </Show>
      </div>
      <div className="flex w-full flex-col gap-y-5 text-left">
        <p className="laptopL:w-[690px] laptopM:w-[540px]">{text}</p>
        <div className="flex items-center justify-between">
          <p className="font-normal text-base text-mainText leading-4">
            {name}
          </p>
          <p className="font-normal text-base text-mainText leading-4">
            {created_at !== updated_at && "Edited "}{" "}
            {formatDate(created_at !== updated_at ? updated_at : created_at)}
          </p>
        </div>
      </div>
    </motion.li>
  );
};

export default Review;
