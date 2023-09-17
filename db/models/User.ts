import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String, required: [true, 'Set name for user'] },
    email: {
      type: String,
      required: [true, 'Set email for user'],
      unique: true,
    },
    locale: String,
    picture: String,
    leftReview: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const User = models.users || model('users', UserSchema);

export default User;
