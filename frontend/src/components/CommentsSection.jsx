import { useState } from "react";

const CommentsSection = ({ post, onCommentSubmit, onReplySubmit }) => {
    const [newComment, setNewComment] = useState("");
    const [reply, setReply] = useState({ commentId: null, text: "" });

    const handleReplyChange = (commentId, text) => {
        setReply({ commentId, text });
    };

    return (
        <div className="space-y-4">
            {/* Add Comment */}
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 p-2 border rounded"
                />
                <button
                    onClick={() => {
                        if (!newComment.trim()) return;
                        onCommentSubmit(post.id, newComment);
                        setNewComment("");
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Comment
                </button>
            </div>

            {/* List Comments */}
            {post.comments.map((comment) => (
                <div key={comment.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                        <p>{comment.content}</p>
                    </div>

                    {/* Reply to Comment */}
                    <div className="pl-4 space-y-2">
                        <input
                            type="text"
                            value={reply.commentId === comment.id ? reply.text : ""}
                            onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                            placeholder="Reply..."
                            className="w-full p-2 border rounded"
                        />
                        <button
                            onClick={() => {
                                if (!reply.text.trim()) return;
                                onReplySubmit(post.id, comment.id, reply.text);
                                setReply({ commentId: null, text: "" });
                            }}
                            className="px-4 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
                        >
                            Reply
                        </button>

                        {/* List Replies */}
                        {comment.replies.map((reply) => (
                            <div key={reply.id} className="pl-4">
                                <p>{reply.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommentsSection;
