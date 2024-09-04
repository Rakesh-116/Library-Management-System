import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/UserComponents/Navbar";

const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://localhost:3000/user/books"); // Replace with your API endpoint
                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <>
            <div className="bg-slate-300 min-h-screen pb-10">
                <Navbar />
                <div className="flex-wrap flex w-100">
                    {books.map((book) => (
                        <div key={book.book_id} className="bg-white rounded shadow-md m-4 p-4">
                            <p>Book Name: {book.title}</p>
                            <p>Author Name: {book.author}</p>
                            <p>Available Copies: {book.copies_available}</p>
                            <button className="bg-blue-600 px-4 py-2 mt-6 text-white rounded">Request Borrow</button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center my-6">
                    <button className="bg-blue-600 mx-4 px-4 py-2 text-white rounded ">Prev</button>
                    <button className="bg-blue-600 mx-4 px-4 py-2 text-white rounded ">Next</button>
                </div>
            </div>
        </>
    );
};

export default Home;
