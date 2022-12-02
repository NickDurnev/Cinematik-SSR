const { Schema, model, models } = require('mongoose');

const UserSchema = new Schema(
  {
    name: { type: String, required: [true, 'Set name for user'] },
    email: {
      type: String,
      required: [true, 'Set email for user'],
      unique: true,
    },
    locale: String,
    leftReview: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

module.exports = models.users || model('users', UserSchema);
