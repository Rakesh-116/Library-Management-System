import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma=new PrismaClient();

export const signin=async(req,res)=> {
    try {
        const {username,password}=req.body;

        const hashedPassword=await bcrypt.hash(password,10);

        const user=await prisma.user.create({
            data:{
                username,
                password:hashedPassword,
                role:"USER"
            },
           });
           res.json({
            user,
            msg:"user created succesfull"
           })
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

export const login=async(req,res)=> {
    try {
        
    } catch (error) {
        
    }
}