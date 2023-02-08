// Library imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Local imports
import { Home } from "./Components/Pages/Home";
import { Golfers } from "./Components/Pages/Golfers";
import Navigation from "./Components/Navigation";
import CourseList from "./Components/Pages/CourseList";
import CourseDetail from "./Components/Pages/Courses/CourseDetail";
import TeeDetail from "./Components/Pages/Tees/TeeDetail";
import HoleInfoDetail from "./Components/Pages/HoleInfo/HoleInfoDetail";
import RoundList from "./Components/Pages/RoundList";
import RoundDetail from "./Components/Pages/Rounds/RoundDetail";


function App() {
    return (
        <Router>
            <Navigation />

            <div className="pages">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/courses" element={<CourseList />} />
                    <Route path="/courses/:courseId" element={<CourseDetail />} />
                    {/* <Route path="/tees" element={<TeeList />}/> */}
                    <Route path="/tees/:teeId" element={<TeeDetail />} />
                    {/* <Route path="/hole_info" element={<HoleInfoList />}/> */}
                    <Route path="/hole_info/:holeInfoId" element={<HoleInfoDetail />} />
                    <Route path="/golfers" element={<Golfers />} />
                    <Route path="/rounds" element={<RoundList />} />
                    <Route path="rounds/:roundId" element={<RoundDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
