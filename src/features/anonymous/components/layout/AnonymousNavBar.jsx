
import { NavLink } from "react-router-dom"
import useAnonymousUser from "../../../../context/auth/AnonymousContext"
function AnonymousNavBar() {
  const { anonymousUser } = useAnonymousUser();
  const activeColor = (isActive) => {
    if (!isActive){
      return "text-white"
    }
    return "text-lime-400"
  }
  return (
        <nav className="sticky z-10 top-12 flex items-center justify-between w-full max-w-3/4 mx-auto px-6 py-4 bg-zinc-900/40 backdrop-blur-md border border-cyan-400 rounded-lg shadow-[5px_5px_15px] shadow-cyan-800">
        <ul className="flex gap-x-6 items-center ">
            <li><NavLink to="/" className="text-4xl mr-10 bg-gradient-to-r from-white to-cyan-500 bg-clip-text text-transparent font-semibold font-kranky">WISKA</NavLink></li>
            <li><NavLink to="/anonymous-mode" end className={({isActive}) => `${activeColor(isActive)} hover:underline`}>Posts</NavLink></li>
            <li><NavLink to="/anonymous-mode/communities" className={({isActive}) => `${activeColor(isActive)} hover:underline`}>Communities</NavLink></li>
            <li><NavLink to={`/anonymous-mode/profile/${anonymousUser?.id}`} className={({isActive}) => `${activeColor(isActive)} hover:underline`}>Profile</NavLink></li>
        </ul>

        <ul className="flex justify-items-end gap-x-4 ">
            <li><NavLink to={anonymousUser ? "/verified-profile" : "/login"} className="bg-indigo-700 px-4 py-2 rounded-lg hover:shadow-[4px_2px_5px] hover:shadow-indigo-900 hover:bg-indigo-500"><span>Switch to Verified Profile</span></NavLink></li>
        </ul>
    </nav>
  )
}

export default AnonymousNavBar