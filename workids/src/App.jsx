import { Routes, Route } from "react-router-dom";
import TeacherMainPage from "./pages/teacher/TeacherMainPage";
import React from "react";
import MainPage from "./pages/MainPage";
import JoinPage from "./pages/joinPage";
import TeacherJobPage from "./pages/teacher/TeacherJobPage";
import TeacherLawPage from "./pages/teacher/TeacherLawPage";
import TeacherBankPage from "./pages/teacher/TeacherBankPage";
import TeacherConsumptionPage from "./pages/teacher/TeacherConsumptionPage";
import TeacherCitizenPage from "./pages/teacher/TeacherCitizenPage";
import TeacherNationPage from "./pages/teacher/TeacherNationPage";
import TeacherAuctionPage from "./pages/teacher/TeacherAuctionPage";
import StudentMainPage from "./pages/student/StudentMainPage";
import StudentAuctionPage from "./pages/student/StudentAuctionPage";
import StudentBankPage from "./pages/student/StudentBankPage";
import StudentConsumptionPage from "./pages/student/StudentConsumptionPage";
import StudentJobPage from "./pages/student/StudentJobPage";
import StudentRankingPage from "./pages/student/StudentRankingPage";
import StudentLawPage from "./pages/student/StudentLawPage";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/teacher" element={<TeacherMainPage />} />
      <Route path="/teacher/law" element={<TeacherLawPage />} />
      <Route path="/teacher/job" element={<TeacherJobPage />} />
      <Route path="/teacher/bank" element={<TeacherBankPage />} />
      <Route path="/teacher/auction" element={<TeacherAuctionPage />} />
      <Route path="/teacher/consumption" element={<TeacherConsumptionPage />} />
      <Route path="/teacher/citizen" element={<TeacherCitizenPage />} />
      <Route path="/teacher/nation" element={<TeacherNationPage />} />
      <Route path="/student" element={<StudentMainPage />} />
      <Route path="/student/auction" element={<StudentAuctionPage />} />
      <Route path="/student/bank" element={<StudentBankPage />} />
      <Route path="/student/consumption" element={<StudentConsumptionPage />} />
      <Route path="/student/job" element={<StudentJobPage />} />
      <Route path="/student/law" element={<StudentLawPage />} />
      <Route path="/student/ranking" element={<StudentRankingPage />} />
    </Routes>
  );
}
