import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Pages/Home";
import Courses from "./Components/Pages/Courses";
import { Golfers } from "./Components/Pages/Golfers";
import { Rounds } from "./Components/Pages/Rounds";
import Navigation from "./Components/Navigation";

function App() {
  return (
    <>
    <Router>
      <Navigation />

      <div className="pages">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/golfers" element={<Golfers />} />
          <Route path="/rounds" element={<Rounds />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
