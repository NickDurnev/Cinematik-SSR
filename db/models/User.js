import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Set name for user'] },
  email: { type: String, required: [true, 'Set email for user'], unique: true },
  locale: String,
  leftReview: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.models.users || mongoose.model('users', UserSchema);
