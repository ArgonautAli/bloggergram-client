import "./feedContainer.css"
import CreatePost from "../createPost/createPost"
import PostView from "../postView/postView"

function FeedContainer() {
  return (
    <>
      <div className="feed-container">
        <CreatePost />
        <PostView />
      </div>
    </>
  )
}

export default FeedContainer
