import pool from '../../db/db.js';

class UsersDAO {
  async create(user) {
    const result = await pool.query(
      `INSERT INTO portal_users (first_name, last_name, username, email, password, role)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        user.first_name,
        user.last_name,
        user.username,
        user.email,
        user.password,
        user.role || 'user'
      ]
    );
    return result.rows[0];
  }

  async findByUsername(username) {
    const result = await pool.query(
      `SELECT * FROM portal_users WHERE username = $1`,
      [username]
    );
    return result.rows[0];
  }

  async findByEmail(email) {
    const result = await pool.query(
      `SELECT * FROM portal_users WHERE email = $1`,
      [email]
    );
    return result.rows[0];
  }

  async findById(id) {
    const result = await pool.query(
      `SELECT * FROM portal_users WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  }

  async getAll() {
    const result = await pool.query(
      `SELECT * FROM portal_users ORDER BY id ASC`
    );
    return result.rows;
  }

  async deleteById(id) {
    await pool.query(
      `DELETE FROM portal_users WHERE id = $1`,
      [id]
    );
  }

  async updateById(id, updates) {
    const fields = [];
    const values = [];
    let index = 1;

    for (const key in updates) {
      fields.push(`${key} = $${index}`);
      values.push(updates[key]);
      index++;
    }

    const query = `UPDATE portal_users SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
    values.push(id);

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async updatePassword(email, newPasswordHash) {
    await pool.query(
      `UPDATE portal_users SET password = $1 WHERE email = $2`,
      [newPasswordHash, email]
    );
  }
}

export default new UsersDAO();
