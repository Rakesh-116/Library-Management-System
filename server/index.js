import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import userAuth from "./route/userAuth.route.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import addBook from "./route/addBook.route.js";

const prisma = new PrismaClient();

dotenv.config();

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors());


//route for the user
app.use("/auth/user", userAuth);

//route for adding books
app.use("/auth/admin",addBook);

app.get("/api/user/books", async (req, res) => {
    try {
        const books = await prisma.book.findMany();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch books" });
    }
});

app.get("/api/user/collections/:userId", async (req, res) => {
    try {
        const { userId } = req.params
        const collections = await prisma.book.findMany({
            where: {
                BorrowedBooks: {
                    some: {
                        user_id: parseInt(userId)
                    }
                }
            },
            include: {
                BorrowedBooks: true,
            }
        })
        res.json(collections)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch borrowed books" })
    }
})

app.get("/api/user/requests/:userId", async (req, res) => {
    try {
        const { userId } = req.params
        const requests = await prisma.book.findMany({
            where: {
                BorrowRequests: {
                    some: {
                        user_id: parseInt(userId)
                    }
                }
            },
            include: {
                BorrowRequests: true
            }
        })
        res.json(requests)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user requests" })
    }
})

// Login
app.post("/api/auth/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

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

        if (role === 'admin') {
            if (user.password !== password) {
                return res.status(400).json({ error: "Invalid credentials" });
            }
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: "Invalid credentials" });
            }
        }
        res.json({ msg: "Login successful", user, role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed" });
    }
});

app.post("/api/user/bookRequest/", async (req, res) => {
    try {
        const { bookId, userId } = req.body;
        console.log("Book ID:", bookId);
        console.log("User ID:", userId);
        const bookRequest = await prisma.borrowRequest.create({
            data: {
                user_id: userId,
                book_id: bookId,
                request_date: new Date(),
                status: "pending"
            }
        })
        res.send({
            msg: "Book Request is succesfull",
            bookRequest
        })
    } catch (error) {
        res.status(500).json({ error: "Failed to post borrow request" })
    }
})

app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
})