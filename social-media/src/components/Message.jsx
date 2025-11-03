function Message({ onGetPostsClick }) {
  return (
    <center>
      <h1 className="Message">There are no Posts</h1>
      <button
        type="button"
        className="btn btn-primary"
        onClick={onGetPostsClick}   // ✅ Pass function directly, not object
      >
        Get Posts from server
      </button>
    </center>
  );
}

export default Message;


    