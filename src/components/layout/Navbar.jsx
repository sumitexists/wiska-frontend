import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import useUser from "../../context/auth/AuthContext";
import { useLogout } from "../hooks/useLogout";
function NavBar() {
  const {user} = useUser()
  const [isSticky, setIsSticky] = useState(false);
  const sticky = "sticky top-10 z-10 bg-zinc-950 rounded-md shadow-md shadow-neutral-800" 
  const notSticky = "border-b-2 border-zinc-600 "
  const activeColor = (isActive) => {
    if (!isActive){
      return "text-white"
    }
    return "text-cyan-400 font-semibold"
  }
   useEffect(()=> {
    const handleScroll = ()=> {
      if(window.scrollY > 120) {
        if(!isSticky) setIsSticky(true)
      }
      else setIsSticky(false)
    }

      window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

   }, [isSticky]);

  const logout = useLogout();
  return (

    <nav className={`flex items-center justify-between w-full max-w-3/4 mx-auto px-6 py-4 ${isSticky? sticky : notSticky}`}>
        <ul className="flex gap-x-6 items-center ">
            <li><NavLink to="/" className="text-4xl mr-10 bg-linear-to-r from-white to-cyan-500 bg-clip-text text-transparent font-semibold font-kranky">WISKA</NavLink></li>
            <li><NavLink to="/" className={({isActive}) => `${activeColor(isActive)} hover:underline`}>Home</NavLink></li>
            <li><NavLink to={user? "/verified-profile" : "/login"} className={({isActive}) => `${activeColor(isActive)} hover:underline`}>Verified Profile</NavLink></li>
            <li><NavLink to={user? "/anonymous-mode" : "/login"} className={({isActive}) => `${activeColor(isActive)} hover:underline`}>Anonymous Mode</NavLink></li>
            <li><NavLink to="/help" className={({isActive}) => `${activeColor(isActive)} hover:underline`}>Help</NavLink></li>
        </ul>

        {user&&user.username?<ul className="flex justify-items-end gap-x-4 "> 
        <li className="text-white self-center capitalize font-semibold">{user.username}</li> <li className="text-zinc-600 font-semibold px-4 py-2 hover:underline hover:-translate-y-1" onClick ={logout}>Logout</li>
        </ul>:<ul className="flex justify-items-end gap-x-4 ">
           
      <li><NavLink to="/login" className="text-cyan-400 hover:underline">Login</NavLink></li>
              <li><NavLink to="/register" className="bg-cyan-400 text-black font-semibold px-4 py-2 hover:shadow-md hover:shadow-cyan-800 hover:bg-cyan-600 hover:-translate-y-2"><span> [ Register ]</span></NavLink></li>
        </ul>}
    </nav>
  )
}

export default NavBar