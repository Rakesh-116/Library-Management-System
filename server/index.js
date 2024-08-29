import express from "express";
import cors from "cors"
import dotenv from "dotenv";
// import { PrismaClient } from "@prisma/client";

// const prisma=new PrismaClient();

dotenv.config();

const PORT=3000;
const app=express();
app.use(express.json());
app.use(cors());

app.listen(PORT,()=> {
    console.log(`server is running on PORT ${PORT}`);
})