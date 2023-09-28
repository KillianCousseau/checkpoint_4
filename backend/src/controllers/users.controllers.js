const models = require("../models");

const browse = async (req, res) => {
  try {
    const [rows] = await models.user.findAll();
    if (rows) {
      const users = rows.map((row) => {
        const { hashedPassword, ...infos } = row;
        return infos;
      });
      res.send(users);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const read = async (req, res) => {
  try {
    const [rows] = await models.user.find(req.params.id);
    if (!rows[0]) {
      res.sendStatus(404);
    } else {
      delete rows[0].hashedPassword;
      res.send(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const add = async (req, res) => {
  try {
    const [result] = await models.user.insert(req.body);
    if (result) {
      res
        .location(`/users/${result.insertId}`)
        .status(201)
        .send({ id: result.insertId, ...req.body });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const edit = async (req, res) => {
  try {
    if (req.file) {
      req.body.profileImage = req.file.filename;
    }

    const [result] = await models.user.update({
      ...req.params,
      ...req.body,
    });
    if (result.affectedRows) {
      res.status(201).json({ ...req.params, ...req.body });
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
const destroy = async (req, res) => {
  try {
    const [result] = await models.user.delete(req.params.id);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = { browse, read, add, edit, destroy };
