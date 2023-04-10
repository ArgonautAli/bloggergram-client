import { useEffect, useRef, useState } from "react";
import "./messageContainer.css";
import Messenger from "./messenger/messenger";
import UserView from "./userView";
import "./messageContainer.css";
import { useSelector, useDispatch } from "react-redux";
import cogoToast from "@successtar/cogo-toast";
import axios from "axios";
import { io } from "socket.io-client";

function MessageContainer() {
  const [socket, setSocket] = useState(null);
  // const socket = useRef();
  const token = localStorage.getItem("accessToken");
  const userId = useSelector((state) => state.authReducer.userId);
  const [userSelected, setUserSelected] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState();
  const [userList, setUserList] = useState([]);
  // const [data, setData] = useState(false);

  useEffect(() => {
    setSocket(io(`ws://${process.env.REACT_APP_MESSAGE_PORT}`));

    return function disconnectSocket() {
      socket?.disconnect();
    };
  }, []);

  function sendMessageHandler() {
    console.log("send message run");
    socket?.emit("sendMessage", {
      senderId: "6413093750586ac4ee227ccf",
      recieverId: "6416e7550dfce40992ec8475",
      body: "hello my message",
    });
  }

  useEffect(() => {
    getUsersHandler();
  }, []);

  async function getUsersHandler() {
    try {
      const url = `${process.env.REACT_APP_BACKEND_PORT}/user/getAllUsers`;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(url, config);
      console.log("Res1", res);
      let allUsers = res.data.data;
      let filteredUsers = allUsers.filter((users) => users._id !== userId);
      setUserList(filteredUsers);
      // cogoToast.success(res.data.message);
    } catch (err) {
      cogoToast.error(err);
    }
  }

  console.log("userlist", userList);
  console.log(" userId", userId);
  return (
    <>
      <div className="message-container">
        <>
          {/* <Messenger /> */}
          {userSelected ? (
            <>
              <Messenger
                selectedUserDetails={selectedUserDetails}
                userSelected={userSelected}
                setUserSelected={setUserSelected}
                socket={socket}
              />
            </>
          ) : (
            <>
              <div className="users-container">
                {userList.map((users) => (
                  <>
                    <div
                      onClick={() => {
                        setUserSelected(true);
                        setSelectedUserDetails(users);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <UserView
                        userName={users.userName}
                        fullName={users.fullName}
                        userId={users._id}
                      />
                    </div>
                  </>
                ))}
              </div>
            </>
          )}
        </>
      </div>
    </>
  );
}

export default MessageContainer;
