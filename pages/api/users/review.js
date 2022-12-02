import dbConnect from '../../../db/connection';
import User from '../../../db/models/User';

export default async function updateUser(req, res) {
  const { email } = req.body;
  await dbConnect();
  try {
    console.log(email);
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(404)
        .json({ status: 'error', code: 404, message: 'User not found' });
      return;
    }
    await User.update({ leftReview: true });
    res.json({
      status: 'success',
      code: 200,
      message: 'User was updated',
    });
  } catch (error) {
    res.status(error.status).json({ success: false, message: error.message });
  }
}
