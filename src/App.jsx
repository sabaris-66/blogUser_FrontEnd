import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const getBlogs = async (url) => {
  const response = await fetch(url, {
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  console.log(response);
  return response.json();
};

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const blogPosts = async () => {
      const result = await fetch("http://localhost:3000/api/posts", {
        mode: "cors",
      });
      const allPosts = await result.json();
      console.log(allPosts);
      setData(allPosts);
    };
    blogPosts();
  }, []);

  // useEffect(() => {
  //   const fetchBlogData = async () => {
  //     try {
  //       const postsData = await getBlogs("http://localhost:3000/api/");
  //       console.log("bl");
  //       console.log(postsData);
  //       setData(postsData);
  //       setError(null);
  //     } catch (err) {
  //       setError(err.message);
  //       setData(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBlogData();
  // }, []);
  return (
    <>
      <h1>Saba's Blog Page</h1>
      <div>Welcome Everyone!</div>

      {data &&
        data.posts.map((post) => {
          return (
            <li key={post.title}>
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
            </li>
          );
        })}
    </>
  );
};

export default App;
