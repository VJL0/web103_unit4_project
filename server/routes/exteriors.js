import express from "express";
import Controller from "../controllers/exteriors.js";
const router = express.Router();

router.get("/", Controller.getExteriors);

export default router;
