const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const encodeJWT = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

const verifyJWT = (req, res, next) => {
  const token = req.cookies?.auth_token;
  const payload = jwt.verify(token, JWT_SECRET);

  if (payload) {
    req.user = payload;
    return next();
  }
  return res.sendStatus(401);
};

module.exports = { encodeJWT, verifyJWT };
