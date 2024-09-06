import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/UserComponents/Navbar";

const Home = ({ role }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("/api/user/books");
                setBooks(response.data);
            } catch (error) {
                console.error(`Error fetching requests: ${error}`)
            }
        };

        fetchBooks();
    }, []);

    const addRequest = async (id) => {
        try {
            await axios.post("/api/user/bookRequest", { id });
        } catch (error) {
            console.error("Error requesting book:", error);
        }
    }

    return (
        <>
            <div className="bg-slate-300 min-h-screen pb-10">
                <Navbar role={role} />
                <div className="flex-wrap flex w-100">
                    {books.map((book) => (
                        <div key={book.book_id} className="bg-white rounded shadow-md m-4 p-4">
                            <p>Book Name: {book.title}</p>
                            <p>Author Name: {book.author}</p>
                            <p>Available Copies: {book.copies_available}</p>
                            {role == 'admin' ? (
                                <>
                                    <button onClick={() => addRequest(book.book_id)} className="bg-blue-600 hover:bg-blue-500 px-4 py-2 mt-6 text-white rounded">Update</button>
                                    <button onClick={() => addRequest(book.book_id)} className="bg-blue-600 hover:bg-blue-500 px-4 py-2 mt-6 text-white rounded ml-2">Delete</button>
                                </>
                            ) : (
                                <button onClick={() => addRequest(book.book_id)} className="bg-blue-600 hover:bg-blue-500 px-4 py-2 mt-6 text-white rounded">Request Borrow</button>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-center my-6">
                    <button className="bg-blue-600 mx-2 px-4 py-2 hover:bg-blue-500 text-white rounded ">Prev</button>
                    <button className="bg-blue-600 mx-2 px-4 py-2 hover:bg-blue-500 text-white rounded ">Next</button>
                </div>
            </div>
        </>
    );
};

export default Home;
