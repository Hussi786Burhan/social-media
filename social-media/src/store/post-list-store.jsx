import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Go to Mumbai",
    body: "Hi Friends I am going to Mumbai for my vacations hope we enjoy a lot, peace out",
    reactions: 2,
    userId: "user-9",
    tags: ["vacations", "Mumbai", "Enjoying"],
  },
  {
    id: "2",
    title: "Pass ho gaye bhai",
    body: "Chaar saal ki mehnat ke baad pass ho gaye. Hard to believe!",
    reactions: 15,
    userId: "user-12",
    tags: ["Graduate", "unbelievable"],
  },
];

const postListReducer = (currpostList, action) => {
  let newPostList = currpostList;

  if (action.type === "DELETE_POST") {
    newPostList = currpostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currpostList];
  }

  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userId: userId,
        tags: tags,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
