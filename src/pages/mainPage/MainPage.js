import { Container } from "react-bootstrap";
import "./MainPage.css";
import Sidebar from "../../components/sideBar/sidebar";
import MessageContainer from "../../components/messages/messageContainer";
import FeedContainer from "../../components/feed/feed";
import AuthComponent from "../../components/auth/auth";
import ProfileCard from "../../components/profileCard/profileCard";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function MainPage() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAuthenticated = useSelector(
    (state) => state?.authReducer?.isAuthenticated
  );
  return (
    <>
      <Container>
        <div className="mt-6 flex  main-container">
          <div className="main-page flex">
            <div>
              <Sidebar />
              {isAuthenticated ? <ProfileCard /> : <AuthComponent />}
            </div>
            <div>
              <FeedContainer />
            </div>
            <div>
              <MessageContainer />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default MainPage;
