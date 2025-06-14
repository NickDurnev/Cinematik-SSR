import withJoi from "next-joi";

export default withJoi({
  onValidationError: (_req, res, error) => {
    res
      .status(400)
      .json({ status: "error", code: 400, message: error.message });
  },
});
