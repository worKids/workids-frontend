

import StudentTopNav from '../../components/student/StudentTopNav';
import StudentJob from "../../components/student/job/StudentJob";
export default function TeacherJobPage() {
  return (
    <div>
      <StudentTopNav />
      <div className="d-flex ">
        <StudentSideNav />
        <StudentJob />
      </div>
    </div>
  );
}