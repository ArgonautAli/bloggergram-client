import "./postView.css"
import {
  Options,
  LikeActive,
  LikeInActive,
  CommentIcon,
  Hyphen,
} from "../../assets/icons"

function PostView() {
  return (
    <>
      <div className="post-container">
        <div className="upper-row">
          <div className="upper-img-name-container">
            {" "}
            <div className="name-circle">H</div>
            <div className="upper-name-container">
              <span className="upper-username">Name</span>
              <span className="upper-username">@UserName</span>
            </div>
          </div>
          <div>
            <Options />
          </div>
        </div>
        <div className="post-text mt-3">
          {" "}
          Mohabbat mein nahin hai farq, jeene aur marne ka, Usi ko dekh kar
          jeete hain jis kaafir pe dum nikle ~Mirza Ghalib
        </div>
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
        <div>Comment container</div>
      </div>
    </>
  )
}

export default PostView
