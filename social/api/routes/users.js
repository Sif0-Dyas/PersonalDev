import express from "express";
import { getUser } from "../controllers/user.js";

const router = express.Router()

// example
router.get("/find/:userId", getUser)




export default router