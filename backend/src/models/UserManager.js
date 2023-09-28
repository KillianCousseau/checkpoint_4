const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `INSERT INTO ${this.table} (username, email, hashedPassword, profileImage) VALUES (?, ?, ?, ?)`,
      [user.username, user.email, user.hashedPassword, user.profileImage]
    );
  }

  update(user) {
    return this.database.query(
      `UPDATE ${this.table} SET username = ?, email = ?, profileImage = ? WHERE id = ?`,
      [user.username, user.email, user.profileImage, user.id]
    );
  }

  findOneByEmail(email) {
    return this.database.query(
      "select id, username, email, hashedPassword, profileImage from user where email = ?",
      [email]
    );
  }
}

module.exports = UserManager;
