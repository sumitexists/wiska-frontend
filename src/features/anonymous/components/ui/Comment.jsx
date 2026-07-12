import formatedTime from "../../../../utils/formatedTime";

function Comment({ comment }) {
    return(
        <div className="my-4 p-4 border-b border-gray-500">
            <p className="text-xl">{comment.content}</p>
            <p className="flex justify-between mt-2"><span className="font-semibold ">By: {comment.author_username}</span> <span>{formatedTime(comment.created_at)}</span></p>
        </div>
    )
}
export default Comment