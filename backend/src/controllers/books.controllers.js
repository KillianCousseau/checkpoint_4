const models = require("../models");

const browse = async (req, res) => {
  try {
    if (req.query.user) {
      const [rows] = await models.book.findAllByUser(req.query.user);
      if (rows) {
        res.send(rows);
      }
    } else {
      const [rows] = await models.book.findAll();
      if (rows) {
        res.send(rows);
      } else {
        res.sendStatus(400);
      }
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const read = async (req, res) => {
  try {
    if (req.query.user) {
      const [rows] = await models.book.findByUser(
        req.params.id,
        req.query.user
      );
      if (rows[0]) {
        res.send(rows[0]);
      }
    } else {
      const [rows] = await models.book.find(req.params.id);
      if (!rows[0]) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const add = async (req, res) => {
  try {
    const [result] = await models.book.insert(req.body);
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

const addBookList = async (req, res) => {
  try {
    const [rows] = await models.book.find(req.body.volume_id);
    if (!rows[0]) {
      const [result] = await models.book.insert(req.body);
      await models.book.insertBookList(req.body.user_id, result.insertId);
      res.sendStatus(201);
    } else {
      await models.book.insertBookList(req.body.user_id, rows[0].id);
      res.sendStatus(201);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const edit = async (req, res) => {
  try {
    const [result] = await models.book.update(req.body);
    if (result.affectedRows) {
      res.status(201).json({ id: result.insertId, ...req.body });
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const editBookList = async (req, res) => {
  try {
    const [result] = await models.book.updateBookList(req.body);
    if (result.affectedRows) {
      res.sendStatus(201);
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
    const [result] = await models.book.delete(req.params.id);
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

const destroyBookList = async (req, res) => {
  try {
    const [result] = await models.book.deleteBookList(req.body);
    if (result.affectedRows) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  browse,
  read,
  add,
  addBookList,
  edit,
  editBookList,
  destroy,
  destroyBookList,
};
