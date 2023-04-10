import "./createPost.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";
import cogoToast from "@successtar/cogo-toast";

function CreatePost({ callPosts, setCallPosts }) {
  const userName = useSelector((state) => state.authReducer.userName);
  const fullName = useSelector((state) => state.authReducer.fullName);
  const [postText, setPostText] = useState("");
  const token = localStorage.getItem("accessToken");
  const userId = useSelector((state) => state.authReducer.userId);

  async function createPostHandler() {
    try {
      const url = `${process.env.REACT_APP_BACKEND_PORT}/posts/createPost`;
      const body = {
        body: postText,
        creatorId: userId,
        creatorName: userName,
        creatorFullName: fullName,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(url, body, config);

      cogoToast.success(res.data.message);
      setPostText("");
      setCallPosts(!callPosts);
    } catch (err) {
      cogoToast.error(err);
    }
  }
  return (
    <>
      <div className="createPost-container">
        <div className="flex createPost-info">
          <span className="profile-placeholderImg">
            {userName?.slice(0, 1)}
          </span>
          <input
            className="createPost-input "
            onChange={(e) => setPostText(e.target.value)}
            value={postText}
          />
        </div>
        <div className="createPost-buttonContainer">
          <div className="createPost-button" onClick={createPostHandler}>
            Create Post
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
