const models = require("../models");

const checkUserExists = async (req, res, next) => {
  try {
    const [users] = await models.user.findOneByEmail(req.body.email);
    if (users.length) {
      const [user] = users;
      req.user = user;
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = checkUserExists;
