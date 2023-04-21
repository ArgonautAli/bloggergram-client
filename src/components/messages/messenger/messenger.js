import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./messenger.css";
import { BackButton } from "../../../assets/icons";
import { useSelector, useDispatch } from "react-redux";

function Messenger({
  selectedUserDetails,
  userSelected,
  setUserSelected,
  socket,
}) {
  const userId = useSelector((state) => state.authReducer.userId);
  const [messageBody, setMessageBody] = useState("");
  const [recievedMessages, setRecievedMessages] = useState([]);
  let recievedData = [];

  useEffect(() => {
    console.log("changing");

    socket?.on("welcome", (message) => {
      console.log(message);
    });
    userId && socket?.emit("addUsers", userId);
    socket?.on("getUsers", (users) => {
      console.log("users", users);
    });
    console.log("add user called");

    return function disconnectSocket() {
      socket?.off("welcome");
      socket?.off("addUsers");
    };
  }, []);

  useEffect(() => {
    console.log("get user called");
    socket?.on("getMessage", (data) => {
      console.log("getMessage", data);
      recievedData.push(data);
      setRecievedMessages((recievedMessages) => [...recievedMessages, data]);
    });
    return function disconnectSocket() {
      socket?.off("getMessage");
    };
  }, [socket]);

  console.log("recieved mess", recievedMessages);

  function sendMessageHandler() {
    socket?.emit("sendMessage", {
      senderId: userId,
      recieverId: selectedUserDetails._id,
      body: messageBody,
    });
    const data = {
      senderId: userId,
      recieverId: selectedUserDetails._id,
      body: messageBody,
    };
    setRecievedMessages((recievedMessages) => [...recievedMessages, data]);
  }

  async function createMessageHandler(e) {
    if (e.keyCode === 13) {
      socket?.emit("sendMessage", {
        senderId: userId,
        recieverId: selectedUserDetails._id,
        body: messageBody,
      });
      const data = {
        senderId: userId,
        recieverId: selectedUserDetails._id,
        body: messageBody,
      };
      setRecievedMessages((recievedMessages) => [...recievedMessages, data]);
    }
  }
  return (
    <>
      <div
        className="
      w-full"
      >
        <div className="flex selectedUser-detailsContainer w-full">
          <span
            onClick={() => setUserSelected(!userSelected)}
            style={{ cursor: "pointer" }}
          >
            {" "}
            <BackButton />{" "}
          </span>
          <span className="profile-placeholder">
            {selectedUserDetails.userName.slice(0, 1)}
          </span>
          <div className="flex profile-nameDetails ml-4">
            <span className="flex profile-fullName">
              {selectedUserDetails.fullName}
            </span>
            <span className="flex profile-userName">
              @{selectedUserDetails.userName}
            </span>
          </div>
        </div>
        <hr />
        <div className="texts-container">
          {recievedMessages.map((message) => {
            return (
              <div
                className="textMessage-placer  flex"
                style={
                  message.senderId === userId
                    ? { justifyContent: "flex-end" }
                    : { justifyContent: "flex-start" }
                }
              >
                <span
                  className="texts-ind my-2"
                  style={
                    message.senderId === userId
                      ? {
                          background: "#65a765",
                          borderRadius: "8px 8px 0px 8px",
                        }
                      : {
                          background: "#d3d3d3",
                          borderRadius: "8px 8px 8px 0px",
                        }
                  }
                >
                  {message.body}
                </span>
              </div>
            );
          })}
          {/* <div className="textMessage-placer  flex">
            <span
              className="texts-ind my-2"
              style={{ background: "#d3d3d3", borderRadius: "8px 8px 8px 0px" }}
            >
              placeholder message
            </span>
          </div> */}
          {/* <div
            className="textMessage-placer flex"
            style={{ justifyContent: "flex-end" }}
          >
            <span
              className="texts-ind  my-2"
              style={{
                background: "#65a765",
                borderRadius: "8px 8px 0px 8px",
              }}
            >
              placeholder message
            </span>
          </div> */}
        </div>
        <div
          className="text-sender-box mt-2 flex "
          style={{ flexDirection: "column", rowGap: "10px" }}
        >
          <input
            className="text-sender-input"
            onChange={(e) => setMessageBody(e.target.value)}
            onKeyDown={(e) => createMessageHandler(e)}
          />
          <div className="text-sender-btn" onClick={sendMessageHandler}>
            Send
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
