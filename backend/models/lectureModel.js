const pool = require("../lib/db");

const getLecturesByDay = async (dbDay) => {
  const result = await pool.query("SELECT * FROM lectures WHERE day = $1", [dbDay]);
  return result.rows;
};

module.exports = {
  getLecturesByDay,
};
