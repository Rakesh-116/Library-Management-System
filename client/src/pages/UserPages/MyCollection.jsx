import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/UserComponents/Navbar";

const MyCollection = () => {
    const [requests, setRequests] = useState([]);
    const [collections, setCollections] = useState([]);
    const [isRequestClicked, setIsRequestClicked] = useState(false);
    const [isCollectionClicked, setIsCollectionClicked] = useState(true);

    const fetchCollections = async () => {
        try {
            const userId = localStorage.getItem('userId')
            const response = await axios.get(`/api/user/collections/${userId}`);
            setCollections(response.data);
            setIsCollectionClicked(true);
            setIsRequestClicked(false);
        } catch (error) {
            console.error(`Error fetching collections: ${error}`);
        }
    }

    const fetchRequests = async () => {
        try {
            const userId = localStorage.getItem('userId')
            const response = await axios.get(`/api/user/requests/${userId}`);
            setRequests(response.data);
            setIsRequestClicked(true);
            setIsCollectionClicked(false);
        } catch (error) {
            console.error(`Error fetching requests: ${error}`);
        }
    }

    useEffect(() => {
        fetchCollections();
    }, []);

    return (
        <div className="bg-yellow-50 min-h-screen pb-10">
            <Navbar />
            <div className="flex justify-evenly items-center w-full pb-6">
                <button
                    onClick={fetchRequests}
                    className={`${isRequestClicked ? 'bg-blue-600 text-white' : 'bg-white'} px-6 py-4 rounded-md shadow-md`}
                >
                    My Requests
                </button>
                <button
                    onClick={fetchCollections}
                    className={`${isCollectionClicked ? 'bg-blue-600 text-white' : 'bg-white'} px-6 py-4 rounded-md shadow-md`}
                >
                    My Collections
                </button>
            </div>
            <hr style={{ width: "80%", height: "1px", backgroundColor: "#000", margin: "20px auto" }} />

            {isCollectionClicked && (
                <div className="flex flex-wrap justify-center w-100">
                    {collections.map((book) => (
                        <div key={book.book_id} className="bg-white rounded shadow-md m-4 p-4">
                            <p>Book Name: {book.title}</p>
                            <p>Author Name: {book.author}</p>
                        </div>
                    ))}
                </div>
            )}

            {isRequestClicked && (
                <div className="flex flex-wrap justify-center w-100">
                    {requests.map((book) => (
                        <div key={book.book_id} className="bg-white rounded shadow-md m-4 p-4">
                            <p>Book Name: {book.title}</p>
                            <p>Author Name: {book.author}</p>
                            <p>Status: {book.BorrowRequests[0].status}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyCollection;