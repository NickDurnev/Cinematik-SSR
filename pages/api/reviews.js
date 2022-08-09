// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { reviews } from './data/reviews';

export default function handler(req, res) {
  res.status(200).json(reviews);
}
