import dbConnect from "@/db/connection";
import User from "@/db/models/User";
import schema from "@/middlewares/validation/userValidation";
import validate from "@/middlewares/validationMiddleware";

export default validate({ body: schema }, async function addUser(req, res) {
  const { email } = req.body;
  await dbConnect();
  const user = await User.findOne({ email });
  if (user) {
    res.json({
      status: "success",
      code: 200,
      message: "User already exists",
      data: user,
    });
    return;
  }
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    message: "User was created",
    data: newUser,
  });
});
