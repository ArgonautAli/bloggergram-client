import "./userView.css";

function UserView({ userName, fullName, userId }) {
  return (
    <>
      <div className="user-container">
        <div className="name-circle">{fullName.slice(0, 1)}</div>
        <div className="user-message-container flex ml-2">
          <span>@{userName}</span>
          <span className="latest-mssg">Latest message</span>
        </div>
      </div>
    </>
  );
}

export default UserView;
