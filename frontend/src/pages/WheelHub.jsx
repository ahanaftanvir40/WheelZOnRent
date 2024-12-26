import { useState } from "react";
import CommentsSection from "../components/CommentsSection";

const WheelHub = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");

    const handlePostSubmit = () => {
        if (!newPost.trim()) return;

        setPosts([
            ...posts,
            {
                id: Date.now(),
                content: newPost,
                comments: [],
            },
        ]);
        setNewPost(""); // Clear input
    };

    const handleCommentSubmit = (postId, comment) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? { ...post, comments: [...post.comments, { id: Date.now(), content: comment, replies: [] }] }
                    : post
            )
        );
    };

    const handleReplySubmit = (postId, commentId, reply) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        comments: post.comments.map((comment) =>
                            comment.id === commentId
                                ? { ...comment, replies: [...comment.replies, { id: Date.now(), content: reply }] }
                                : comment
                        ),
                    }
                    : post
            )
        );
    };

    return (
        <div className="p-4 max-w-4xl mx-auto space-y-4 h-screen">
            {/* New Post */}
            <div className="bg-white p-4 rounded shadow space-y-2">
                <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full p-2 border rounded"
                />
                <button
                    onClick={handlePostSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Post
                </button>
            </div>

            {/* Posts */}
            {posts.map((post) => (
                <div key={post.id} className="bg-white p-4 rounded shadow space-y-4">
                    {/* Post Content */}
                    <p>{post.content}</p>

                    {/* Comments */}
                    <CommentsSection post={post} onCommentSubmit={handleCommentSubmit} onReplySubmit={handleReplySubmit} />
                </div>
            ))}
        </div>
    );
};

export default WheelHub;
