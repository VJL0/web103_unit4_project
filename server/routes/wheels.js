import express from "express";
import Controller from "../controllers/wheels.js";
const router = express.Router();

router.get("/", Controller.getWheels);

export default router;
