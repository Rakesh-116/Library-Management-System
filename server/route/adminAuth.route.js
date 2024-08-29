import express from "express";
import { loginAdm, signinAdm } from "../controller/adminAuth.controller";

const router=express.Router();

router.post("/signin",signinAdm);
router.post("/login",loginAdm);

export default router;