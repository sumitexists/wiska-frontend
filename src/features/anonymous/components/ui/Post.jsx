import Comment from "./Comment"
import {useState, useEffect , useRef} from "react"
import {useLoaderData} from "react-router-dom"
import {postComment, postLike, deleteLike} from "../../../../services/anonymousService"
import formatedTime from "../../../../utils/formatedTime";
import {HeartIcon} from "../../assets/icons/Icons"

function Post() {
    const [postResponse, commentsResponse] = useLoaderData();
    const likeButtonRef = useRef(null);
    const [post , setPost] = useState(postResponse)
    const [comments, setComments] = useState(commentsResponse)
    const [comment, setComment]= useState("")
    const dateString = post.created_at
    const formattedDateTime = formatedTime(dateString)

  const handleComment = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
        const newComment =await postComment({ comment: comment, postId: post.id })
        setComment("")
        setComments((prev)=> [newComment,...prev ])
        setPost((prevPost) => ({ ...prevPost, number_of_comments: prevPost.number_of_comments + 1 }));
    }

  }
  const onClickLike = async (e)=>{
      e.stopPropagation();
      if (!post.is_liked) {
        const response = await postLike({postId: post.id});
        if (!response) return;
        setPost((prevPost) => ({ ...prevPost, is_liked: true, likes: parseInt(prevPost.likes) + 1, like_id: response.id }));
      }
      else{
        const response = await deleteLike({likeId: post.like_id});
        if (!response) return;
        setPost((prevPost) => ({ ...prevPost, is_liked: false, likes: parseInt(prevPost.likes) - 1, like_id: null }));
      }
        }
        useEffect(() => {
        const likeButton = likeButtonRef.current;
        if (likeButton) {
            if (post.is_liked) {
                likeButton.firstChild.style.cssText += "color: red; transition: color 0.3s ease-in-out; fill: red; stroke: red;";
            } else {
                likeButton.firstChild.style.cssText += "color: white; transition: color 0.3s ease-in-out; fill: white; stroke: white;";
            }
        }
     },[post.is_liked, post.likes]);

    return(
        <div className="w-full max-w-6xl mx-auto border-x border-cyan-200 p-8 mt-8">
            <h1 className="text-4xl text-cyan-400 p-4 font-semibold tracking-tighter capitalize">{post.title}</h1>
            <hr  className="text-cyan-400 my-8" />
            <div className="text-xl text-slate-300 max-h-1/2 overflow-y-auto scrollbar-none">
            <p>{post.content}</p>
            <p className="mt-6 text-bold text-cyan-500">Posted by: {post.author_username} at {formattedDateTime}</p>
            <div className="flex justify-end gap-4 mt-4">
              <button className="border border-white text-white p-2 rounded-full mr-6 hover:bg-cyan-400 hover:border-none hover:scale-102 transition-scale duration-300 cursor-pointer flex" ref={likeButtonRef} onClick={onClickLike}><HeartIcon /><span className="ml-2">{post.likes}</span></button>
            </div>
            
            </div>
            <hr className="text-cyan-400 my-16"/>
            <h1 className="text-4xl text-cyan-200 font-bold border-b border-cyan-200 mb-12 pb-2 animate-pulse">Comments : {post.number_of_comments}</h1>
            <form onSubmit = {handleComment} className="flex justify-between items-center gap-4 mb-4">
                <textarea placeholder="Write a comment..." value={comment} onChange = {(e)=> setComment(e.target.value)} className=" text-slate-300 placeholder:text-slate-500 border-b border-cyan-400 w-full focus:outline-none" />
                <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-2 rounded">
                    Comment
                </button>
            </form>
            <div className="max-h-[50vh] overflow-y-auto scrollbar-none">
                {
                comments? comments.map((comment) => (
                  <Comment key={comment.id} comment={comment}/>
                )) : <p>No comments yet.</p>
              }
            </div>
           

        </div>
    )
}
export default Post