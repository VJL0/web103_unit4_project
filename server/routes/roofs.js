import express from "express";
import Controller from "../controllers/roofs.js";
const router = express.Router();

router.get("/", Controller.getRoofs);

export default router;
