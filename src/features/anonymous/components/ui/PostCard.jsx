import { CommentIcon, HeartIcon } from "../../assets/icons/Icons";
import { postLike, deleteLike } from "../../../../services/anonymousService";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function PostCard({
  onClickPost = () => {},
  postData = {},
  deleteButton = false,
  onClickDelete = () => {},
}) {
  const dateString = postData.created_at;
  const likeButtonRef = useRef(null);
  const [post, setPost] = useState(postData);
  const navigate = useNavigate();

  const formattedDateTime = new Date(dateString).toLocaleString({
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const onClickLike = async (e) => {
    e.stopPropagation();
    if (!post.is_liked) {
      const response = await postLike({ postId: post.id });
      if (!response) return;
      setPost((prevPost) => ({
        ...prevPost,
        is_liked: true,
        likes: parseInt(prevPost.likes) + 1,
        like_id: response.id,
      }));
    } else {
      const response = await deleteLike({ likeId: post.like_id });
      if (!response) return;
      setPost((prevPost) => ({
        ...prevPost,
        is_liked: false,
        likes: parseInt(prevPost.likes) - 1,
        like_id: null,
      }));
    }
  };

  useEffect(() => {
    const likeButton = likeButtonRef.current;
    if (likeButton) {
      if (post.is_liked) {
        likeButton.firstChild.style.cssText +=
          "color: red; transition: color 0.3s ease-in-out; fill: red; stroke: red;";
      } else {
        likeButton.firstChild.style.cssText +=
          "color: white; transition: color 0.3s ease-in-out; fill: white; stroke: white;";
      }
    }
  }, [post.is_liked, post.likes]);

  return (
    <div
      className="my-10 w-full max-w-[500px] mx-auto bg-slate-800 p-8 text-cyan-400 border border-cyan-400 shadow-[5px_5px_15px] shadow-cyan-800 transition-all duration-300 hover:scale-105 hover:shadow-[8px_8px_15px] flex justify-between flex-col cursor-pointer"
      onClick={onClickPost}
    >
      <h1 className="text-4xl tracking-tight font-bold mb-4 text-white capitalize">
        {post.title}
      </h1>
      <p>
        <span
          onClick={(e) => {
            e.stopPropagation();
            if (post.community_name) {
              navigate(`/anonymous-mode/community/${post.community}`);
            }
          }}
          className={`text-cyan-300 border border-cyan-800 font-bold p-2 rounded-xl ${post.community_name ? "inline-block" : "hidden"}`}
        >
          {post.community_name}
        </span>
      </p>
      <hr className="mt-2 mb-10" />
      <p className="text-lg text-cyan-200 overflow-hidden h-full">
        {post.content}
      </p>
      <p className="font-semibold my-6 flex justify-between">
        <span>{post.author_username}</span>
        <span>{formattedDateTime}</span>
      </p>
      <div className="flex">
        <button
          className="border border-white text-white p-2 rounded-full mr-6 hover:bg-cyan-400 hover:border-none hover:scale-102 transition-scale duration-300 cursor-pointer flex"
          ref={likeButtonRef}
          onClick={onClickLike}
        >
          <HeartIcon />
          <span className="ml-2">{post.likes}</span>
        </button>
        <button className="border border-white text-white p-2 rounded-full mr-6 hover:bg-cyan-400 hover:border-none hover:scale-102 transition-scale duration-300 cursor-pointer flex">
          <CommentIcon />
          <span className="ml-2">{post.number_of_comments}</span>
        </button>
        <button
          className={`${deleteButton ? "block" : "hidden"} bg-cyan-500 text-white p-2 font-mono font-semibold tracking-tighter hover:bg-cyan-600 hover:scale-103 transition-scale duration-300 cursor-pointer hover:shadow-[2px_1px_5px] hover:shadow-zinc-900 `}
          onClick={onClickDelete}
        >
          Delete Post
        </button>
      </div>
    </div>
  );
}

export default PostCard;
