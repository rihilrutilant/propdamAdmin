import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AgentManagement from "../pages/AgentManagement";
import PropertyManagement from "../pages/PropertyManagement";
import FinanceManagement from "../pages/FinanceManagement";
import UserDetails from "../pages/UserDetails";
import UserActivity from "../pages/UserActivity";
import ReviewManagement from "../pages/ReviewManagement";
import PropertyDetails from "../pages/PropertybyId";
import ContactUsEnquires from "../pages/ContactUsEnquires";
import EnquiryByid from "../pages/enquiryByid";
import NewsLetterManagement from "../pages/NewsLetterManagement";
import SupportManagement from "../pages/SupportManagement";
import ApprovalManagement from "../pages/ApprovalManagement";
import ApprovalDisplay from "../pages/ApprovalDisplay";
import EditApproval from "../pages/EditApproval";
function Router() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" element={<Dashboard />} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/agent" element={<AgentManagement />} />
            <Route path="/property" element={<PropertyManagement />} />
            <Route path="/finance" element={<FinanceManagement />} />
            <Route path="/agentdetails" element={<UserDetails />} />
            <Route path="/agent/:id/activity" element={<UserActivity />} />
            <Route path="/review" element={<ReviewManagement />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/enquires" element={<ContactUsEnquires />} />
            <Route path="/enquires/:id" element={<EnquiryByid />} />
            <Route path="/newsletter" element={<NewsLetterManagement />} />
            <Route path="/support" element={<SupportManagement />} />
            <Route path="/approval" element={<ApprovalManagement />} />
            <Route path="/approval/:id" element={<ApprovalDisplay />} />
            <Route path="/approval/:id/edit" element={<EditApproval />} />
        </Routes>
    );
}

export default Router;