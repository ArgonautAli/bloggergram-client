import "./profileCard.css";
import { useSelector, useDispatch } from "react-redux";
import { authorise } from "../../redux/auth.slice";

function ProfileCard() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.authReducer.userName);
  const fullName = useSelector((state) => state.authReducer.fullName);

  function logOutHandler() {
    dispatch(
      authorise({
        userName: null,
        fullName: null,
        userId: null,
        isAuthenticated: false,
      })
    );
    localStorage.removeItem("accessToken");
  }
  return (
    <>
      <div className="profileCard-container ">
        <div>
          <div className="flex profile-detailContainer">
            <span className="profile-placeholder">{userName.slice(0, 1)}</span>
            <div className="flex profile-nameDetails">
              <span className="flex profile-fullName">{fullName}</span>
              <span className="flex profile-userName">@{userName}</span>
            </div>
          </div>
          <div className="logout-container">
            <div className="flex profile-logout" onClick={logOutHandler}>
              Logout
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
