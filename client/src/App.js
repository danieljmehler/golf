import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Pages/Home";
import CourseList from "./Components/Pages/CourseList";
import CourseDetail from "./Components/Pages/Courses/CourseDetail";
import TeeDetail from "./Components/Pages/Tees/TeeDetail";
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
                        <Route path="/courses" element={<CourseList />}/>
                        <Route path="/courses/:courseId" element={<CourseDetail />}/>
                        {/* <Route path="/tees" element={<TeeList />}/> */}
                        <Route path="/tees/:teeId" element={<TeeDetail />}/>
                        <Route path="/golfers" element={<Golfers />} />
                        <Route path="/rounds" element={<Rounds />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
