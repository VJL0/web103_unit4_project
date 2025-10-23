import pool from "../config/database.js";

const getExteriors = async (request, response) => {
  try {
    const results = await pool.query("SELECT * FROM exteriors ORDER BY id ASC");
    response.status(200).json(results.rows);
  } catch (error) {
    response.status(409).json({ error: error.message });
  }
};

export default {
  getExteriors,
};
