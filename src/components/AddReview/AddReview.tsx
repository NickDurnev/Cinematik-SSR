import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";

//#Services
import { IReviewData } from "@/services/review/types";
import { IUser } from "@/services/user/types";

import { ErrorMessage } from "@hookform/error-message";

//#Styles
import StarIcon from "@mui/icons-material/Star";
import { Container, Form, StyledRating, Wrap } from "./AddReview.styled";

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
    <Container>
      <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <textarea
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
          <Wrap>
            <StyledRating
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
            <button type="submit">Send</button>
          </Wrap>
        </Form>
      </div>
    </Container>
  );
};

export default AddReview;
