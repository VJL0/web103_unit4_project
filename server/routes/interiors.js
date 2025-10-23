import express from "express";
import Controller from "../controllers/interiors.js";
const router = express.Router();

router.get("/", Controller.getInteriors);

export default router;
