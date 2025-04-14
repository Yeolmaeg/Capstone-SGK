const db = require("../lib/db");
const { v4: uuidv4 } = require("uuid");

/*exports.createUser = async ({ email, name, school, school_id }) => {
  const id = uuidv4();
  await db.query(
    `INSERT INTO users (id, email, name, school, school_id)
     VALUES ($1, $2, $3, $4, $5)`,
    [id, email, name, school, school_id]
  );
  return id;
};
*/

exports.getUser = async (id) => {
  const result = await db.query(
    `SELECT id, email, name, school, school_id, created_at FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
};

exports.updateUser = async (id, { school, school_id }) => {
  await db.query(
    `UPDATE users SET school = $1, school_id = $2 WHERE id = $3`,
    [school, school_id, id]
  );
};

exports.deleteUser = async (id) => {
  await db.query(`DELETE FROM users WHERE id = $1`, [id]);
};
