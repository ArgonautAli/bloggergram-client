import "./profileCard.css"

function ProfileCard() {
  return (
    <>
      <div className="profileCard-container ">
        <div>
          <div className="flex profile-detailContainer">
            <span className="profile-placeholder">#</span>
            <div className="flex profile-nameDetails">
              <span className="flex profile-fullName">full name</span>
              <span className="flex profile-userName">@username</span>
            </div>
          </div>
          <div className="logout-container">
            <div className="flex profile-logout">Logout</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileCard
