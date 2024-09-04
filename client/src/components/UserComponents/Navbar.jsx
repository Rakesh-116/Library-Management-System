
const Navbar = () => {
    return (
        <>
            <div className="bg-gray-800 text-white h-16 flex justify-between w-full items-center px-10 mb-10">
                <h1 className="w-1/2">Book your Book</h1>
                <div className="w-full flex justify-end">
                    <a className="mx-4">My Requests</a>
                    <a className="mx-4">Profile</a>
                </div>
            </div>
        </>
    )
}

export default Navbar;