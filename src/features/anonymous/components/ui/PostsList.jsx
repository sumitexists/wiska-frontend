import PostCard from "./PostCard";
import {useState, useEffect} from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import SearchBar from "../layout/SearchBar";
import { searchPosts } from "../../../../services/anonymousService";


function PostsList(){
  const [searchQuery, setSearchQuery] = useState("");
  const data = useLoaderData();
    const [posts, setPosts] = useState(data)
    const navigate = useNavigate();

    const handlePostSearch = async (e) => {
      e.preventDefault();
      try{
        const response = await searchPosts(searchQuery);
        setPosts(response);
      }
      catch (error) {
        console.error("Error searching posts:", error);
      }
    }

    useEffect(() => {
      if (searchQuery === "") {
        setPosts(data);
      }
    },[searchQuery]);

  return (
    <>
     
      <div className="h-full border-x border-cyan-400 w-full max-w-4xl mx-auto overflow-y-auto scrollbar-none">
         <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handlePostSearch} />
        {
          posts && posts.length > 0 ? posts.map((post) => (
            <PostCard key={post.id} postData={post} onClickPost={()=>navigate(`/anonymous-mode/post/${post.id}`)} />
          )) : <p className="text-center text-gray-400 font-semibold">No posts available.</p>
        }
        </div>
    </>
  );
}
export default PostsList