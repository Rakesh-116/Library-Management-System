import { useNavigate } from "react-router-dom";


const Navbar = ({ role }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="bg-gray-800 text-white h-16 flex justify-between w-full items-center px-10 mb-10">
                <h1 className="w-1/2">Book your Book</h1>
                <div className="w-full flex justify-end">
                    <button onClick={() => { navigate('/') }} className="mx-2 hover:bg-gray-600 px-4 py-2 rounded">Home</button>
                    <button onClick={() => { navigate('/collection') }} className="mx-2 hover:bg-gray-600 px-4 py-2 rounded">My Collection</button>
                    <button onClick={() => { navigate('/fine') }} className="mx-2 hover:bg-gray-600 px-4 py-2 rounded">Fines</button>
                    <button onClick={() => { navigate('/profile') }} className="mx-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded">Profile</button>
                    {role === 'admin' ? (
                        <a className="mx-4">Add Book {role}</a>
                    ) : (
                        <a className="mx-4">My Requests {role}</a>
                    )}
                    <a className="mx-4">Profile</a>
                </div>
            </div>
        </>
    )
}

export default Navbar;