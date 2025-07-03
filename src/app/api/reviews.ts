import dbConnect from "@/db/connection";
import Review from "@/db/models/Review";
import schema from "@/middlewares/validation/reviewValidation";
import validate from "@/middlewares/validationMiddleware";

export default validate({ body: schema }, async function addReview(req, res) {
  await dbConnect();
  const review = await Review.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      review,
    },
  });
});
