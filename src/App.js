import "./App.css"
import { Container } from "react-bootstrap"
import MainPage from "./pages/mainPage/MainPage"
import AppRoutes from "./utils/routes/routes"

function App() {
  return (
    <>
      <div className="App">
        <AppRoutes />
      </div>
    </>
  )
}

export default App
