import { useContext } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/Post-list-store";
import Message from "./Message";

const PostList = () => {
  const { postList, addInitialPosts } = useContext(PostListData);

  const handleGetClickPosts = () => {
    fetch('https://dummyjson.com/posts')
      .then(res => res.json())
      .then(data => {
        addInitialPosts(data.posts); // ✅ fixed function name
      });
  };

  return (
    <>
      {postList.length === 0 && (
        <Message onGetPostsClick={handleGetClickPosts} />
      )}
      {postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostList;
