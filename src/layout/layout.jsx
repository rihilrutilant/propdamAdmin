import Sidebar from "../component/Sidebar/Sidebar";
import TopNav from "../component/Sidebar/TopNav";
import Login from "../pages/Login";
import Router from "../router/Router";
import { Route, Routes, Navigate } from "react-router-dom";

function Layout() {
    return (
        <>
            {
                localStorage.getItem("AdminToken") ?
                    <div className="layout">
                        <Sidebar />

                        <div className="right-content">
                            <TopNav />

                            <div className="nav_content">
                                <Router />
                            </div>
                        </div>
                    </div> :
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" element={<Login />} />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
            }
        </>
    );
}

export default Layout;