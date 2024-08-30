import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import userAuth from "./route/userAuth.route.js"; 
import bcrypt from "bcryptjs/dist/bcrypt.js";

const prisma=new PrismaClient();

dotenv.config();

const PORT=3000;
const app=express();
app.use(express.json());
app.use(cors());


//route for the user
app.use("/auth/user",userAuth);



//login 
app.post("/auth/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await prisma.user.findUnique({ where: { username } });
        let role = 'user';

        if (!user) {
            user = await prisma.admin.findUnique({ where: { username } });
            role = 'admin';
        }

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        res.json({ msg: "Login successful", user, role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed" });
    }
});
app.listen(PORT,()=> {
    console.log(`server is running on PORT ${PORT}`);
})