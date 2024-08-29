import express from "express";
import { login, signin } from "../controller/userAuth.controller";

const router=express.Router();

router.post("/signin",signin)
router.post("/login",login)

export default router;