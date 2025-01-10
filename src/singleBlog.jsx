import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const SingleBlog = () => {
  const [loading, setLoading] = useState("Loading...");
  const [data, setData] = useState(null);
  const { postId } = useParams();
  const [newCommentCount, setNewCommentCount] = useState(0);
  const commentRef = useRef(null);
  const commentFormRef = useRef(null);
  console.log(postId);
  useEffect(() => {
    const getPostWithComments = async () => {
      const response = await fetch(
        `http://localhost:3000/api/posts/${postId}`,
        { mode: "cors" }
      );
      const postWithComments = await response.json();
      if (postWithComments) {
        setLoading(null);
        console.log(postWithComments);
        setData(postWithComments);
      }
    };
    getPostWithComments();
  }, [newCommentCount]);

  const addComment = async (event) => {
    event.preventDefault();
    const comment = commentRef.current.value;
    console.log(comment);
    await fetch(`http://localhost:3000/api/posts/${postId}/comment`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    });
    commentFormRef.current.reset();
    setNewCommentCount((prev) => prev + 1);
  };

  return (
    <div>
      {loading && <div>{loading}</div>}

      {data && (
        <div className="content">
          <h1>{data.spPost.title}</h1>
          <br />
          <h2>Content: </h2>
          <div>{data.spPost.content}</div>
          <br />
          <br />
          <h2>Comments: </h2>
          <form action="" onSubmit={addComment} ref={commentFormRef}>
            <input
              type="text"
              ref={commentRef}
              name="newComment"
              placeholder="Comment"
              required
            />
            <button type="submit">Add</button>
          </form>
          <ul>
            {data.spPost.comments.map((comment) => {
              return <li key={comment.id}>{comment.comment}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SingleBlog;
