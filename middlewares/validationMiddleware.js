import withJoi from 'next-joi';

export default withJoi({
  onValidationError: (req, res) => {
    res
      .status(400)
      .json({ status: 'error', code: 400, message: 'Invalid data' })
      .end();
  },
});
