import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import NavBar from "./components/views/NavBar/NavBar";
import Footer from "./components/views/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/LoginPage" element={<LoginPage />} />
        <Route exact path="/RegisterPage" element={<RegisterPage />} />
        <Route exact path="/NavBar" element={<NavBar />} />
        <Route exact path="/Footer" element={<Footer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
