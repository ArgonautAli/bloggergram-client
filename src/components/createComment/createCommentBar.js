import "./createCommentBar.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";
import cogoToast from "@successtar/cogo-toast";

function CreateCommentBar({ postId, callComments, setCallComments }) {
  const userName = useSelector((state) => state.authReducer.userName);
  const fullName = useSelector((state) => state.authReducer.fullName);
  const token = localStorage.getItem("accessToken");
  const userId = useSelector((state) => state.authReducer.userId);
  const [commentBody, setCommentBody] = useState("");

  async function createCommentHandler(e) {
    if (e.keyCode === 13) {
      try {
        const url = `${process.env.REACT_APP_BACKEND_PORT}/posts/createComment/${postId}`;
        const body = {
          creatorId: userId,
          creatorName: fullName,
          body: commentBody,
        };
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.post(url, body, config);
        setCommentBody("");
        setCallComments(!callComments);
        // cogoToast.success(res.data.message);
      } catch (err) {
        cogoToast.error(err);
      }
    }
  }

  return (
    <>
      <div className="flex" style={{ columnGap: "6px" }}>
        <span className="name-circle ">{userName?.slice(0, 1)}</span>
        <input
          className="comment-input"
          value={commentBody}
          placeholder="Enter comment..."
          onKeyDown={(e) => createCommentHandler(e)}
          onChange={(e) => {
            setCommentBody(e.target.value);
          }}
        />
      </div>
    </>
  );
}

export default CreateCommentBar;
