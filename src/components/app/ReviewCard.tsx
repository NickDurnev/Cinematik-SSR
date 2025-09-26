import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { motion } from "framer-motion";

import { Show } from "@/components/common";
import { IReview } from "@/types/movie";

export const ReviewCard = ({ data }: { data: IReview }) => {
  const { id, formattedPath, avatar_path, author, content, created_at } = data;

  return (
    <motion.li
      key={id}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="w-full border-foreground border-b-[0.5px] bg-transparent pb-20 text-foreground"
    >
      <div className="mb-[50px] w-[90px]">
        <Show
          when={avatar_path && formattedPath?.includes("www.gravatar.com")}
          fallback={<AccountCircleIcon sx={{ width: 90, height: 90 }} />}
        >
          <img
            src={formattedPath as string}
            alt="User avatar"
            className="h-auto w-full rounded-full"
          />
        </Show>
      </div>
      <div className="w-full text-start">
        <p className="laptopL:mb-[65px] laptopM:mb-[50px] mb-[35px] laptopL:w-[690px] laptopM:w-[540px]">
          {content}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-base leading-4">{author}</p>
          <p className="text-base leading-4">{created_at.slice(0, 10)}</p>
        </div>
      </div>
    </motion.li>
  );
};
