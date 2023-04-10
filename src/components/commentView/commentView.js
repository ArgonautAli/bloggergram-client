import "./commentView.css";
import { Options } from "../../assets/icons";
import { useEffect, useState } from "react";
import { DeleteIcon } from "../../assets/icons";

function CommentView({ body, creatorId, creatorName, postId, likes }) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <>
      <div className="my-3">
        <div className="flex comment-container">
          <span className="name-circle ">{creatorName.slice(0, 1)}</span>
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
                  // onClick={deletePostHandler}
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
        </div>
        <div className="comment-text-box my-1">{body}</div>
      </div>
    </>
  );
}

export default CommentView;
