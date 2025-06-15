const db = require("../lib/db");
const { v4: uuidv4 } = require("uuid");

exports.createUser = async ({ email, name, school, school_id, hashedPassword, student_id }) => {
  const id = uuidv4();
  await db.query(
    `INSERT INTO users (id, email, name, school, school_id, password, student_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [id, email, name, school, school_id, hashedPassword, student_id]
  );
  return id;
};


exports.getUser = async (id) => {
  const result = await db.query(
    `SELECT id, email, name, school, school_id, student_id, created_at FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
};

exports.updateUser = async (id, fieldsToUpdate) => {
  const keys = Object.keys(fieldsToUpdate);
  const values = Object.values(fieldsToUpdate);

  if (keys.length === 0) return;

  const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
  const query = `UPDATE users SET ${setClause} WHERE id = $${keys.length + 1}`;

  await db.query(query, [...values, id]);
};

exports.deleteUser = async (id) => {
  await db.query(`DELETE FROM users WHERE id = $1`, [id]);
};
