import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/Post-list-store";
import Message from "./Message";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
  const { postList, addInitialPosts } = useContext(PostListData);

  const [fetching, setfetching] = useState(false);

  useEffect(() => {
  setfetching(true);
  const controller = new AbortController();
  const signal = controller.signal;

  fetch("https://dummyjson.com/posts", { signal })
    .then((res) => res.json())
    .then((data) => {
      addInitialPosts(data.posts);
      setfetching(false);
    })
    .catch((err) => {
      if (err.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        console.error(err);
      }
    });

  return () => {
    console.log("Cleaning up useEffect");
    controller.abort();
  };
}, []);


  return (
    <>
      {fetching && <LoadingSpinner />}

      {!fetching && postList.length === 0 && <Message />}

      {!fetching && postList.length > 0 &&
        postList.map((post) => (
          <Post key={post.id} post={post} />
        ))}
    </>
  );
};

export default PostList;
