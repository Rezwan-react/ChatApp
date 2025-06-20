import React from 'react'
import { CgMenuRound } from 'react-icons/cg'
import { CiChat1 } from 'react-icons/ci'
import { GrGroup } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Links, NavLink, useNavigate } from 'react-router'
import { IoIosLogOut } from "react-icons/io";

function Navbar() {
    const userData = useSelector((state) => state.authSlice.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'auth/logout' }); // Replace with your actual logout action
        localStorage.removeItem("user");   // Remove user from localStorage
        navigate('/login');                // Redirect to login page after logout
    };
    return (
        <nav>
            <div className="container">
                <div className="w-[192px] h-screen bg-[#212121] px-6 pt-24 flex flex-col justify-between border border-amber-100">
                    <ul className="flex flex-col gap-6 text-2xl font-medium font-poppins text-[#222222] ">
                        <NavLink to="/" className={({ isActive }) => isActive ? "flex items-center  gap-2 px-[19px] py-[16px] bg-[#32375C] text-[#fff] rounded-xl " : "text-[#fff] flex items-center gap-2 px-[19px] py-[16px] hover:text-gray-200 transition-colors duration-200"}><CiChat1 className='text-2xl' /><span>Chat</span> </NavLink>
                        <NavLink to="/group" className={({ isActive }) => isActive ? "flex items-center  gap-2 px-[19px] py-[16px] bg-[#32375C] text-[#fff] rounded-xl " : "text-[#fff] flex items-center gap-2 px-[19px] py-[16px] hover:text-gray-200 transition-colors duration-200"}><GrGroup className='text-2xl' /><span>Group</span> </NavLink>
                        <NavLink to="/people" className={({ isActive }) => isActive ? "flex items-center  gap-2 px-[19px] py-[16px] bg-[#32375C] text-[#fff] rounded-xl " : "text-[#fff] flex items-center gap-2 px-[19px] py-[16px] hover:text-gray-200 transition-colors duration-200"}><CgMenuRound className='text-2xl' /><span>People</span> </NavLink>
                    </ul>
                    <div className='flex flex-col gap-1'>
                        <div className='flex items-center gap-2'>
                            <div className='w-12 h-12 rounded-full border-2 border-[#FFC1DA] overflow-hidden flex items-center justify-center text-[#fff] text-2xl font-bold uppercase'>
                                {userData?.avatar ? (
                                    <img src={userData?.avatar} className='w-full h-full object-cover ' alt="user photo" />
                                ) : (
                                    userData?.fullName.charAt(0).toUpperCase()
                                )}
                            </div>
                            <div>
                                <h2 className='text-[13px] font-semibold font-poppins text-[#fff]'>{userData?.fullName}</h2>
                                <Link className='text-[12px] font-normal font-poppins text-[#fff]' to="/profile">Edit Profile</Link>
                            </div>
                        </div>
                        <div className='flex justify-center items-center gap-2'>
                            <button onClick={handleLogout} className='text-[13px] font-normal font-poppins text-[#fff] mt-[30px] mb-7' to="/logout"><IoIosLogOut className='text-[30px]' /></button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
