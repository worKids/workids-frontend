import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";
import TeacherJobCreate from "./TeacherJobCreate";
import TeacherJobDelete from "./TeacherJobDelete";
import TeacherJobUpdate from "./TeacherJobUpdate";
import TeacherJobInsert from "./TeacherJobInsert";

export default function TeacherJob(){
    const jobMenu = ["직업 조회", "직업 수정"];
    const [state, setState] = useState(0);//버튼 클릭
    const [userData, setUserData] = useRecoilState(userState);
    const [jobList, setJobList] = useState([]); //직업 항목
    const [jobStudentList, setJobStudentList] = useState([]); //학생 직업 부여 항목
    const [jobKindList, setJobKindList] = useState([]); //직업 종류 항목
    const navigate = useNavigate();
  

    const clickMenu = (idx) => {
        setState(idx);
      };
    

    const divStyle = {
    width: "80%",
    borderRadius: "40px",
    };

    //직업 메뉴의 탭들
    const menu = jobMenu.map((menu, index) => (
        <div
          key={index}
          onClick={() => clickMenu(index)}
          className={`m-2 border border-dark  border-3 text-center p-3 rounded-pill ${
            state === index ? "bg-warning text-white" : ""
          }`}
        >
          {menu}
        </div>
      ));

 
       //직업리스트 뽑아오기
    useEffect(() => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }

        axBase(token)({
            method: "post",
            url: "/job/list",
            data: {
                nationNum: userData.nationNum,
            },
            })
            .then((response) => {
                console.log(response.data.data);
                setJobList(response.data.data);
            })
            .catch((err) => {
                alert(err.response.data.message);
            });

        }, []);

    //학생- 직업 리스트 뽑아오기
    useEffect(() => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }

        axBase(token)({
            method: "post",
            url: "/teacher/job/citizen/list",
            data: {
                nationNum: userData.nationNum,
            },
            })
            .then((response) => {
                console.log(response.data.data);
                setJobStudentList(response.data.data);
            })
            .catch((err) => {
                alert(err.response.data.message);
            });

        }, []);

        //직업 종류뽑아오기
    useEffect(() => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }

        axBase(token)({
            method: "post",
            url: "/teacher/job/kind/list",
            data: {
                nationNum: userData.nationNum,
            },
            })
            .then((response) => {
                console.log(response.data.data);
                setJobKindList(response.data.data);
            })
            .catch((err) => {
                alert(err.response.data.message);
            });

        }, []);

       



    //직업수정 출력화면
    function JobStudentUpdateItem({ menu, jobList }) {
        const [selectedJob, setSelectedJob] = useState(menu.name);
      
        return (
          <tr>
            <td>{menu.citizenNumber}</td>
            <td>{menu.studentName}</td>
            <td>
              <select
                name="jobs"
                id="jobs"
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
              >
                    <option value={menu.name}>{menu.name}</option>
                {jobList.map((job, index) => (
                  <option key={index} value={job.name}>
                    {job.name}
                  </option>
                ))}
              </select>
            </td>
            <td>
                {menu.name === null ? (
                    <TeacherJobInsert citizenNumber={menu.citizenNumber} name = {selectedJob} />
                ) : (
                    <TeacherJobUpdate citizenNumber={menu.citizenNumber} name={selectedJob} />
                )}
            </td>
            <hr></hr>
          </tr>
        );
      }
      
      // JobStudentUpdateItems 배열을 사용하여 컴포넌트 렌더링
      const JobStudentUpdateItems = jobStudentList.map((menu, index) => (
        <JobStudentUpdateItem key={index} menu={menu} jobList={jobList} />
      ));
    


    return (
        <div style={divStyle} className="border border-dark  border-3 p-3">
                <div className="d-flex justify-content-between">
                    <div className="d-flex">{menu}</div>
                    <div>직업 관리</div>
                </div>
                {state === 0 ? (
                    <div>
                        <table style={{ marginLeft: '10%' }}>
                        {jobList.map((menu, index) => (
                            <tbody key={index}>
                                <tr key={`${index}_name`}>
                                    <td style={{ width: '40%' }}>직업명</td>
                                    <td style={{ width: '50%' }}>{menu.name}</td>
                                </tr>
                                <tr key={`${index}_content`}>
                                    <td>해야할 일</td>
                                    <td key={index}>{menu.jobToDoContent}</td>
                                </tr>
                                <tr key={`${index}_salary`}>
                                    <td>월급</td>
                                    <td key={index}>{menu.salary}미소</td>
                                </tr>
                                <tr>
                                <div>
                             <TeacherJobDelete name={menu.name}/>
                                  </div>
                                </tr>
                                <hr></hr>
                            </tbody>
                        ))}
                    </table>
                        <div>
                            <TeacherJobCreate />
                        </div>
                    </div>
               
                   ) : (
                   <div>
                    <table>
                        
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }}>학급 번호</th>
                                <th style={{ width: '40%' }}>이름</th>
                                <th style={{ width: '40%' }}>직업</th>
                                <th style={{ width: '40%' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                        {JobStudentUpdateItems}
                        </tbody>
                       

                    </table>
                </div>
            )}
        </div>
    );
}