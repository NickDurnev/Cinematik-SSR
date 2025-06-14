"use client";
import { Avatar } from "@/components";
import { IReview } from "@/types/review";
//#Components
import StarIcon from "@mui/icons-material/Star";
//#Styles
import { Header, InfoWrap, StyledRating, Text, Wrap } from "./Review.styled";

const Review = ({ review }: { review: IReview }) => {
  const { picture, name, rating, text, createdAt } = review;
  return (
    <Wrap
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <Header>
        <Avatar picture={picture} name={name} size={50} />
        <StyledRating
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
      </Header>
      <InfoWrap>
        <Text>{text}</Text>
        <div>
          <p>{name}</p>
          <p>{createdAt}</p>
        </div>
      </InfoWrap>
    </Wrap>
  );
};

export default Review;
