import React from "react";

import Auction from "../../components/teacher/Auction";
import TeacherSideNav from "../../components/teacher/TeacherSideNav";
import TeacherTopNav from '../../components/teacher/TeacherTopNav';
export default function TeacherAuctionPage() {
  return (
    <div>
      <TeacherTopNav />
      <div className="d-flex">
        <TeacherSideNav />
        <Auction />
      </div>
    </div>
  );
}
