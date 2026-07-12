import { useLoaderData, useNavigate } from "react-router-dom"
import CommunityCard from "./CommunityCard"
import { useState, useEffect } from "react"
import {searchCommunity} from "../../../../services/anonymousService"
import SearchBar from "../layout/SearchBar"


function CommunityList() {
    const data = useLoaderData()
    const [community, setCommunity] = useState(data)
    const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate()
    const handlePostSearch = async (e) => {
          e.preventDefault();
          try{
            const response = await searchCommunity(searchQuery);
            setCommunity(response);
          }
          catch (error) {
            console.error("Error searching communities:", error);
          }
        }
    
    useEffect(() => {
      if (searchQuery === "") {
        setCommunity(data);
      }
    },[searchQuery]);

    return(
        <div className="h-full border-x border-cyan-400 w-full max-w-6xl mx-auto overflow-y-auto scrollbar-none">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handlePostSearch} />
            {community.map((community) => (
                <CommunityCard key={community.id} communityData={community} onClickCommunity={()=> navigate(`/anonymous-mode/community/${community.id}`) }/>
            ))}
        </div>
    )

}
export default CommunityList