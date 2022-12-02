import dbConnect from '../../db/connection';
import Review from '../../db/models/Review';
import validate from '../../middlewares/validationMiddleware';
import schema from '../../middlewares/validation/reviewValidation';

export default validate({ body: schema }, async function addReview(req, res) {
  await dbConnect();
  try {
    const review = await Review.create(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        review,
      },
    });
  } catch (error) {
    res.status(error.status).json({ success: false, message: error.message });
  }
});
