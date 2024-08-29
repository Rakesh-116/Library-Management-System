import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import {userAuth} from "./route/userAuth.route.js"; 
import {adminAuth} from "./route/adminAuth.route.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";

const prisma=new PrismaClient();

dotenv.config();

const PORT=3000;
const app=express();
app.use(express.json());
app.use(cors());


//route for the user
app.use("/auth/user",userAuth);

//route for the 
app.use("/auth/admin",adminAuth);

//login 
app.post("/auth/login",async(req,res)=> {
    const {username,password,role}=req.body;

    try {
        const user=role==="USER" ? await prisma.user.findUnique({where:{username}}) 
                                    : await prisma.admin.findUnique({where:{email}});

        if(!user || !(await bcrypt.compare(password,user.password))) {
            return res.status(401).json({error:"Invalid credentials"});
        }
        res.json({msg:`${role} logged in succesfully`,user});
    } catch (error) {
        res.status(500).json({error:error.message});
        
    }
})

app.listen(PORT,()=> {
    console.log(`server is running on PORT ${PORT}`);
})