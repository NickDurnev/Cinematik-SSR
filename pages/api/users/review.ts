import { Request, Response } from 'express';
import dbConnect from '../../../db/connection';
import User from '../../../db/models/User';

export default async function updateUser(req: Request, res: Response) {
  const { email } = req.body;
  await dbConnect();
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      res
        .status(404)
        .json({ status: 'error', code: 404, message: 'User not found' });
      return;
    }
    await User.updateOne({ leftReview: true }).exec();
    res.json({
      status: 'success',
      code: 200,
      message: 'User was updated',
    });
  } catch (error) {
    res.status(error.status).json({ success: false, message: error.message });
  }
}
