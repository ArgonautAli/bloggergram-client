import "./createPost.css"

function CreatePost() {
  return (
    <>
      <div className="createPost-container">
        <div className="flex createPost-info">
          <span className="profile-placeholderImg">#</span>
          <input className="createPost-input " />
        </div>
        <div className="createPost-buttonContainer">
          <div className="createPost-button">Create Post</div>
        </div>
      </div>
    </>
  )
}

export default CreatePost
