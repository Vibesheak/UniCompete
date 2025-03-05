import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import About from "./pages/about";
import CompetitionDetails from "./pages/CompetitionDetails"; // Import the CompetitionDetails component
import Header from "./components/Header"; // Optional header for navigation
import Footer from "./components/Footer"; 
import RegisterPage from "./pages/RegisterPage";
import VerifyPage from "./pages/VerifyPage";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import AdminCompetitionDetails from "./pages/AdminCompetitionDetails";
import UniversitiyPage from "./pages/UniversitiyPage";


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main
  className="w-full"
  style={{
    marginTop: "0.2cm",
    marginBottom: "0.2cm",

  }}
>
          <Routes>
            
          <Route path="/" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/competition/:id" element={<CompetitionDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/userpage" element={<UserPage />} />
            <Route path="/adminpage" element={<AdminPage/>}/>
            <Route path="/admincompetition/:id" element={<AdminCompetitionDetails/>}/>
            <Route path="university/:university" element={<UniversitiyPage/>}/>
           
  {/* Add the route for CompetitionDetails */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
