import express from "express";
import { signin, register } from "../controller/auth.js";

const router = express.Router();

router.post("/register", register)
router.post("/signin", signin)

export default router;