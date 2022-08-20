// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { reviews } from './data/reviews';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(reviews);
  } else if (req.method === 'POST') {
    const review = req.body;
    reviews.push(review);
    res.status(201).json(review);
  }
}
