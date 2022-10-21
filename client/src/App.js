import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import NavBar from "./components/views/NavBar/NavBar";
import Footer from "./components/views/Footer/Footer";
import Auth from "./hoc/auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={Auth(LandingPage, null)} />
        <Route exact path="/login" element={Auth(LoginPage, false)} />
        <Route exact path="/register" element={Auth(RegisterPage, false)} />
        <Route exact path="/navbar" element={<NavBar />} />
        <Route exact path="/footer" element={<Footer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
