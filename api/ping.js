module.exports = (req, res) => {
  res.status(200).json({ ok: true, pong: true, method: req.method });
};
