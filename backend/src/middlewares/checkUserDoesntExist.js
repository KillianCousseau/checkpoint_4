const models = require("../models");

const checkUserDoesntExists = async (req, res, next) => {
  const [user] = await models.user.findOneByEmail(req.body.email);

  if (user.length) {
    return res.status(400).json({ message: "User already exists" });
  }

  return next();
};

module.exports = checkUserDoesntExists;
