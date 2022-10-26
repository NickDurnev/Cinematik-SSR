import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  createdAt: String,
  name: { type: String, required: [true, 'Set name for review'] },
  avatar: String,
  text: { type: String, required: [true, 'Set text for review'] },
  rating: { type: String, required: [true, 'Set rating for review'] },
});

module.exports =
  mongoose.models.reviews || mongoose.model('reviews', ReviewSchema);
