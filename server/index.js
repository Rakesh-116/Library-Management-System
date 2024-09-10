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
app.use("/auth/admin", addBook);

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
        const { userId } = req.params;

        const requests = await prisma.borrowRequest.findMany({
            where: {
                user_id: parseInt(userId)
            },
            include: {
                Book: {
                    select: {
                        book_id: true,
                        title: true,
                        author: true
                    }
                }
            }
        });

        const response = requests.map(request => ({
            request_id: request.request_id,
            book: {
                book_id: request.Book.book_id,
                title: request.Book.title,
                author: request.Book.author
            },
            status: request.status
        }));

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user requests" });
    }
});

app.delete('/api/user/requests/:requestId', async (req, res) => {
    try {
        const { requestId } = req.params
        await prisma.borrowRequest.delete({
            where: {
                request_id: parseInt(requestId)
            },
        })
    } catch (error) {
        res.status(500).json({ error: "Failed to delete request" });
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

        // const requestCheck = await prisma.borrowRequest.findFirst({
        //     where: {
        //         userId: userId,
        //         bookId: bookId
        //     }
        // })

        // if (requestCheck) {
        //     return res.status(400).json({ error: "Book Already Requested" });
        // }

        const bookRequest = await prisma.borrowRequest.create({
            data: {
                user_id: userId,
                book_id: bookId,
                request_date: new Date(),
                status: "pending"
            }
        })
        res.json({
            msg: "Book Request is succesfull",
            bookRequest
        })
    } catch (error) {
        res.status(500).json({ error: "Failed to post borrow request" })
    }
})

//route for updating book
app.put("/api/admin/books/:id", async (req, res) => {
    const { id } = req.params;
    const { title, author, copies_available, total_copies } = req.body;

    try {
        const updatedBook = await prisma.book.update({
            where: { book_id: parseInt(id) },
            data: {
                title,
                author,
                copies_available,
                total_copies,
            }
        })
        res.json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "failed to update Book" });

    }
})

//route for deleting a book
app.delete("/api/admin/books/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await prisma.book.delete({
            where: {
                book_id: parseInt(id)
            },
        });
        res.json(deletedBook);
    } catch (error) {
        console.error('Error updating book:', error.message);
        res.status(500).json({ error: "failed to update Book", details: error.message });
    }
})
app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
})