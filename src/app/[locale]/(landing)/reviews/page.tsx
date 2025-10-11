import { Metadata } from "next";

import Reviews from "./components/reviews";

export const metadata: Metadata = {
  title: "Reviews page",
};

const ReviewsPage = () => {
  return <Reviews />;
};

export default ReviewsPage;
