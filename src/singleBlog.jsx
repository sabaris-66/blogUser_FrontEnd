import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleBlog = () => {
  const [loading, setLoading] = useState("Loading...");
  const [data, setData] = useState(null);
  const { postId } = useParams();
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
  }, []);

  return (
    <>
      {loading && <div>{loading}</div>}

      {data && (
        <div>
          <h1>{data.spPost.title}</h1>
          <br />
          <h2>Content: </h2>
          <div>{data.spPost.content}</div>
          <br />
          <br />
          <h2>Comments: </h2>
          {/* <form
            action={`http://localhost:3000/api/posts/${postId}/comment`}
            method="post"
          >
            <button type="submit">Add New Comment</button>
          </form> */}
          <ul>
            {data.spPost.comments.map((comment) => {
              return <li key={comment.id}>{comment.comment}</li>;
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default SingleBlog;
