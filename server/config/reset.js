import pool from "./database.js";
import exteriorsData from "../data/exteriors.js";
import interiorsData from "../data/interiors.js";
import roofsData from "../data/roofs.js";
import wheelsData from "../data/wheels.js";

const resetDatabase = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(`
      CREATE TABLE IF NOT EXISTS exteriors (
        id SERIAL PRIMARY KEY,
        color VARCHAR(100) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL
      );
      CREATE TABLE IF NOT EXISTS interiors (
        id SERIAL PRIMARY KEY,
        color VARCHAR(100) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL
      );
      CREATE TABLE IF NOT EXISTS roofs (
        id SERIAL PRIMARY KEY,
        color VARCHAR(100) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        isconvertible BOOLEAN NOT NULL
      );
      CREATE TABLE IF NOT EXISTS wheels (
        id SERIAL PRIMARY KEY,
        color VARCHAR(100) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL
      );
    `);

    await client.query(`
      TRUNCATE TABLE exteriors, interiors, roofs, wheels
      RESTART IDENTITY CASCADE;
    `);

    const insertExteriorQuery = `
      INSERT INTO exteriors (color, image, price)
      VALUES ($1, $2, $3);
    `;

    for (const { color, image, price } of exteriorsData) {
      await client.query(insertExteriorQuery, [color, image, price]);
    }

    const insertInteriorQuery = `
      INSERT INTO interiors (color, image, price)
      VALUES ($1, $2, $3);
    `;

    for (const { color, image, price } of interiorsData) {
      await client.query(insertInteriorQuery, [color, image, price]);
    }

    const insertRoofQuery = `
      INSERT INTO roofs (color, image, price, isconvertible)
      VALUES ($1, $2, $3, $4);
    `;

    for (const { color, image, price, isconvertible } of roofsData) {
      await client.query(insertRoofQuery, [color, image, price, isconvertible]);
    }

    const insertWheelQuery = `
      INSERT INTO wheels (color, image, price)
      VALUES ($1, $2, $3);
    `;

    for (const { color, image, price } of wheelsData) {
      await client.query(insertWheelQuery, [color, image, price]);
    }

    await client.query("COMMIT");
    console.log("Database reset successfully.");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

resetDatabase();
