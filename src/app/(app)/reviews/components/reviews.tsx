//#Components
import { useState } from "react";
import { toast } from "react-toastify";

//#Services
import { useAddReview } from "@/services/review/query-hooks";
import { IReview, IReviewData } from "@/types/review";
import { IUser } from "@/types/user";

//#DB
import dbConnect from "@/db/connection";
import Review from "@/db/models/Review";

import { AddReview, ReviewList, Show } from "@/components";
//#Styles
import { Section } from "./reviews.styled";

interface IProps {
  data: IReview[];
  currentUser: IUser;
  isLeftReview: IUser["leftReview"];
  setIsLeftReview: (isLeftReview: boolean) => void;
}

const Reviews = ({
  data,
  currentUser,
  isLeftReview,
  setIsLeftReview,
}: IProps) => {
  const [reviews, setReviews] = useState([...data]);
  const { mutate: addReview, isPending: isReviewPending } = useAddReview();
  console.log(" isReviewPending:", isReviewPending);

  const handleAddReview = async (review: IReviewData): Promise<void> => {
    try {
      addReview(review, {
        onSuccess: response => {
          setReviews([...reviews, response.data]);
          setIsLeftReview(true);
        },
        onError: () => {
          toast.error("An error occurred while adding the review.");
        },
      });
      await fetch("api/users/review", {
        method: "PATCH",
        body: JSON.stringify({ email: currentUser.email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("An error occurred while adding the review.");
    }
  };

  return (
    <Section>
      <h2>Reviews</h2>
      <div>
        <Show when={currentUser && !isLeftReview}>
          <AddReview
            addReview={review => handleAddReview(review)}
            currentUser={currentUser}
          />
        </Show>
        <ReviewList reviews={reviews} />
      </div>
    </Section>
  );
};

export default Reviews;

export async function getServerSideProps() {
  await dbConnect();
  try {
    const data = await Review.find().exec();
    return { props: { data: JSON.parse(JSON.stringify(data)) } };
  } catch (error) {
    console.log(" error:", error);
    return {
      notFound: true,
    };
  }
}
