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


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/competition/:id" element={<CompetitionDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify" element={<VerifyPage />} />
  {/* Add the route for CompetitionDetails */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
