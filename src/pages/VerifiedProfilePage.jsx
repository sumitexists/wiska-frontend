import { Outlet } from "react-router-dom";
import ContactList from "../features/private/components/ui/ContactList";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function VerifiedProfilePage() {
    const contacts = useLoaderData(); // Assuming you are using React Router's useLoaderData to get the messages
    
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate("manage-friends/");
    }
    return(

        <div className="w-full h-dvh grid grid-cols-[5fr_10fr]">
            <div className="flex flex-col w-full h-full bg-zinc-800 border-r border-zinc-700">
                <div className=" py-6 px-4 bg-zinc-800 text-white flex justify-between items-center">
                    <span className="text-3xl font-bold">Contacts</span>
                    <button className="bg-white text-black px-4 py-2 font-mono tracking-tighter transition-transform duration-300 hover:scale-103 hover:shadow-[3px_3px_7px] shadow-zinc-600" onClick={handleOnClick }>
                        [Manage Contacts]
                    </button>
                </div>
                <ContactList contacts={contacts}/>
            </div>
             <Outlet />  

        </div>
    ) 
}
