import { useEffect, useState } from "react";
import CommentsSection from "../components/CommentsSection";
import axios from "axios";
import toast from "react-hot-toast";

const WheelHub = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");

    // Fetch posts
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/getposts", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });
                setPosts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, [posts]);

    const handlePostSubmit = async () => {
        if (!newPost.trim()) return;
        try {
            const response = await axios.post("http://localhost:3000/api/posts", { content: newPost }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            setPosts([
                ...posts,
                { ...response.data, comments: [] } // Initialize comments as an empty array
            ]);
            setNewPost(""); // Clear input
            toast.success("Post created successfully!");
        } catch (error) {
            console.error(error);
        }
    };

    const handleCommentSubmit = async (postId, comment) => {
        try {
            const response = await axios.post(`http://localhost:3000/api/posts/${postId}/comments`, { content: comment }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });
            const newComment = response.data.comments;

            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId
                        ? { ...post, comments: [...post.comments, newComment] }
                        : post
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleReplySubmit = (postId, commentId, reply) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post._id === postId
                    ? {
                        ...post,
                        comments: post.comments.map((comment) =>
                            comment._id === commentId
                                ? { ...comment, replies: [...comment.replies, { _id: Date.now(), content: reply }] }
                                : comment
                        ),
                    }
                    : post
            )
        );
    };
    console.log("Posts", posts);

    return (
        <div className="p-4 max-w-4xl mx-auto space-y-4 min-h-screen">
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
                <div key={post._id} className="bg-white p-4 rounded shadow space-y-4">
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