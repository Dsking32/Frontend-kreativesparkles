// Example: api/ping.js
module.exports = (req, res) => {
  res.status(200).json({ ok: true, pong: Date.now() });
};
