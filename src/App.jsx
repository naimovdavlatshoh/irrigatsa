import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
    useNavigate,
} from "react-router-dom";
import {
    AllAnnouncement,
    AllDetail,
    Contact,
    Home,
    MainDetail,
    NewsDetail,
    TemplateDetail,
} from "./pages/data";
import Topbar from "./components/Topbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AllNews from "./pages/main/AllNews";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <Router>
            <Topbar />
            <Header />
            <Routes>
                <Route path={`/`} element={<Home />} />
                <Route path="/main-detail/:id" element={<MainDetail />} />
                <Route
                    path="/template-detail/:id"
                    element={<TemplateDetail />}
                />
                <Route path="/contact/:id" element={<Contact />} />
                <Route path="/all-detail/:id" element={<AllDetail />} />
                <Route path="/news-detail/:id" element={<NewsDetail />} />
                <Route path="/all-news" element={<AllNews />} />
                <Route path="/all-announcement" element={<AllAnnouncement />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
