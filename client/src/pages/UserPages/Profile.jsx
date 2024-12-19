import { useState, useEffect } from "react"
import axios from 'axios'
import Navbar from "../../components/UserComponents/Navbar";

const Profile = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchProfileDetails = async () => {
            try {
                const response = await axios.get(`/api/user/profile/${localStorage.getItem('userId')}`)
                setUser(response.data)
                console.log(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        fetchProfileDetails();
    }, [])
    return (
        <>
            <Navbar />
            <div className="w-full flex justify-center items-center h-screen">
                <div>
                    <h1>Profile</h1>
                    {user && (
                        <>
                            <br />
                            <p>{user.username}</p><br />
                            <p>{user.email}</p>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Profile