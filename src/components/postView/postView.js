import "./postView.css";
import {
  Options,
  LikeActive,
  LikeInActive,
  CommentIcon,
  Hyphen,
  DeleteIcon,
} from "../../assets/icons";
import CreateCommentBar from "../createComment/createCommentBar";
import CommentView from "../commentView/commentView";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

function PostView({
  body,
  creatorName,
  creatorId,
  likes,
  postId,
  creatorFullName,
  callPosts,
  setCallPosts,
}) {
  const userId = useSelector((state) => state.authReducer.userId);
  const [showOptions, setShowOptions] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [callComments, setCallComments] = useState(false);

  const token = localStorage.getItem("accessToken");

  console.log("  creatorFullName", creatorFullName);

  useEffect(() => {
    getCommentsHandler();
  }, [callComments]);

  async function deletePostHandler() {
    const url = `${process.env.REACT_APP_BACKEND_PORT}/posts/deletePost/${postId}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.delete(url, config);
    setCallPosts(!callPosts);
  }

  async function getCommentsHandler() {
    const url = `${process.env.REACT_APP_BACKEND_PORT}/posts/getComments/${postId}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(url, config);
    console.log("comments", res);
    setCommentData(res.data.data);
  }

  async function getPostHandler() {
    const url = `${process.env.REACT_APP_BACKEND_PORT}/posts/getPost/${postId}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(url, config);
  }

  return (
    <>
      <div className="post-container mb-3">
        <div className="upper-row">
          <div className="upper-img-name-container">
            {" "}
            <div className="name-circle">{creatorName?.slice(0, 1)}</div>
            <div className="upper-name-container">
              <span className="upper-username">{creatorFullName}</span>
              <span className="upper-username">@{creatorName}</span>
            </div>
          </div>
          {userId === creatorId && (
            <div className="options-dots">
              <span
                className="options-dots"
                onClick={() => setShowOptions(!showOptions)}
              >
                {" "}
                <Options />
              </span>
              {showOptions ? (
                <>
                  <div
                    className="options-box flex gap-x-1"
                    style={{ position: "absolute" }}
                    onClick={deletePostHandler}
                  >
                    <span className="mt-0.5">
                      {" "}
                      <DeleteIcon />
                    </span>
                    Delete
                  </div>
                </>
              ) : null}
            </div>
          )}
        </div>
        <div className="post-text mt-3"> {body}</div>
        <div className="post-info-container mt-2 px-2">
          <div className="flex icon-container">
            <LikeActive />
          </div>
          <div className="flex info-container">
            <span>24 likes</span>
            <Hyphen />
            <span>2 comments</span>
          </div>
        </div>
        <hr />
        <div>
          <CreateCommentBar
            postId={postId}
            callComments={callComments}
            setCallComments={setCallComments}
          />
          <>
            <div className="pl-8">
              {" "}
              {commentData?.map((comment) => {
                return (
                  <>
                    <CommentView
                      body={comment.body}
                      creatorId={comment.creatorId}
                      creatorName={comment.creatorName}
                      postId={comment.postId}
                      likes={comment.likes}
                    />
                  </>
                );
              })}
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default PostView;
