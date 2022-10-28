import dbConnect from '../../db/connection';
import User from '../../db/models/User';
import validate from '../../db/middlewares/validationMiddleware';
import schema from '../../db/validation/userValidation';

export default validate({ body: schema }, async function addUser(req, res) {
  const { email } = req.body;
  await dbConnect();
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.json({
        status: 'success',
        code: 200,
        data: {
          user,
        },
      });
      return;
    }
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.status(error.status).json({ success: false, message: error.message });
  }
});
