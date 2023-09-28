const AbstractManager = require("./AbstractManager");

class BookManager extends AbstractManager {
  constructor() {
    super({ table: "book" });
  }

  insert(book) {
    return this.database.query(
      `INSERT INTO ${this.table} (title, volume_id) VALUES (?, ?)`,
      [book.title, book.volume_id]
    );
  }

  update(book) {
    return this.database.query(
      `UPDATE ${this.table} SET title = ?, volume_id = ?`,
      [book.title, book.volume_id]
    );
  }

  updateBookList(data) {
    return this.database.query(
      `UPDATE book_list bl JOIN book b ON bl.book_id = b.id SET bl.checked = ? WHERE bl.user_id = ? AND b.volume_id = ?`,
      [data.checked, data.user_id, data.volume_id]
    );
  }

  findByUser(bookId, userId) {
    return this.database.query(
      `SELECT bl.* FROM book_list bl JOIN book b ON bl.book_id = b.id WHERE b.volume_id = ? AND bl.user_id = ?`,
      [bookId, userId]
    );
  }

  findAllByUser(id) {
    return this.database.query(
      `SELECT b.*, bl.checked FROM book b JOIN book_list bl ON bl.book_id = b.id WHERE bl.user_id = ?`,
      [id]
    );
  }

  insertBookList(userId, bookId) {
    return this.database.query(
      `INSERT INTO book_list (user_id, book_id) VALUES (?, ?)`,
      [userId, bookId]
    );
  }

  deleteBookList(data) {
    return this.database.query(
      `DELETE bl.* FROM book_list bl JOIN book b ON bl.book_id = b.id WHERE bl.user_id = ? AND b.volume_id = ?`,
      [data.user_id, data.volume_id]
    );
  }
}

module.exports = BookManager;
