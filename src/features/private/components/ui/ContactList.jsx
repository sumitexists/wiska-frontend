import ContactBubble from "./ContactBubble";
import {formatMessageTime} from "../utils/utils";
import {useNavigate} from "react-router-dom";

function ContactList({ contacts  }) {
    const navigate = useNavigate();

  return (
    <div className="  flex flex-col w-full bg-zinc-700 overflow-y-auto scrollbar-none">

        {
            contacts.map((contact) => (
                <ContactBubble key={contact.id} username={contact.contact_details.username} fetchMessages={() => navigate(`/verified-profile/${contact.contact_details.id}`)}/>
            ))
        }
    </div>
  )
}

export default ContactList




// lastMessage={contact.last_message[0]} time={contact.last_message[1]}