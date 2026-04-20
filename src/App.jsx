import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import SavedRoadmaps from "./pages/SavedRoadmaps";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import SkillGap from "./pages/SkillGap";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";

function App() {
  return (
    <>
    
    <Router>
      <Navbar></Navbar>
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/saved" element={<SavedRoadmaps />} />
        <Route path="/resume" element={<ResumeAnalyzer />} />
        <Route path="/skill-gap" element={<SkillGap />} />

      </Routes>
    </Router>
    </>
  );
}

export default App;













// import Navbar from "./components/Navbar";
// import Landing from "./pages/Landing";

// function App() {
//   return (
//     <>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/roadmap" element={<Roadmap />} />
//         <Route path="/saved" element={<SavedRoadmaps />} />
//         <Route path="/resume" element={<ResumeAnalyzer />} />
//         <Route path="/skill-gap" element={<SkillGap />} />
//       </Routes>
//     </>
//   );
// }

