import "./feedContainer.css";
import CreatePost from "../createPost/createPost";
import PostView from "../postView/postView";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { authorise } from "../../redux/auth.slice";

function FeedContainer() {
  const token = localStorage.getItem("accessToken");
  const userId = useSelector((state) => state.authReducer.userId);
  const [callPosts, setCallPosts] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    getAllPosts();
    getPostsByUser();
  }, [callPosts]);

  async function getAllPosts() {
    const url = `${process.env.REACT_APP_BACKEND_PORT}/posts/getAllPosts`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(url, config);
    const postsData = res.data.data.reverse();
    console.log("p", postsData);
    setAllPosts(postsData);
  }

  async function getPostsByUser() {
    const url = `${process.env.REACT_APP_BACKEND_PORT}/posts/getposts/${userId}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(url, config);
  }
  return (
    <>
      <div className="feed-container">
        <CreatePost callPosts={callPosts} setCallPosts={setCallPosts} />
        <>
          {allPosts?.map((post) => (
            <PostView
              body={post.body}
              creatorName={post.creatorName}
              creatorFullName={post.creatorFullName}
              creatorId={post.creatorId}
              likes={post.likes}
              postId={post._id}
              callPosts={callPosts}
              setCallPosts={setCallPosts}
            />
          ))}
        </>
      </div>
    </>
  );
}

export default FeedContainer;
