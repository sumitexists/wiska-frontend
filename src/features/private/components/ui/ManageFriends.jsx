
import {NavLink, Outlet} from "react-router-dom";

function ManageFriends() {


    return(
        <div className="w-full h-[100vh] max-w-6xl mx-auto">
            <h1 className="text-6xl p-8 font-bold mb-6 text-center font-mono tracking-tighter">Manage Friends</h1>
            <ul className="flex gap-8 border-b border-zinc-600 p-4 mb-6  font-mono tracking-tighter text-lg font-semibold">
                <li><NavLink to="" end className={({isActive})=>`p-2 mb-2 ${isActive? "text-white border-b border-white" : "text-zinc-400"}`}>Add Friend</NavLink></li>
                <li><NavLink to="pending-requests" end className={({isActive})=>`p-2 mb-2 ${isActive? "text-white border-b border-white" : "text-zinc-400"}`}>Pending Requests</NavLink></li>
                <li><NavLink to="friends-list" end className={({isActive})=>`p-2 mb-2 ${isActive? "text-white border-b border-white" : "text-zinc-400"}`}>Friends List</NavLink></li>
            </ul>
            <Outlet />
        </div>
    )

}
export default ManageFriends;