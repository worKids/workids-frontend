import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";
import TeacherJobCreate from "./TeacherJobCreate";
import TeacherJobDelete from "./TeacherJobDelete";
import TeacherJobUpdate from "./TeacherJobUpdate";
import TeacherJobInsert from "./TeacherJobInsert";

export default function TeacherJob() {
  const jobMenu = ["직업 조회", "직업 부여"];
  const [state, setState] = useState(0); //버튼 클릭
  const [userData, setUserData] = useRecoilState(userState);
  const [jobList, setJobList] = useState([]); //직업 항목
  const [jobStudentList, setJobStudentList] = useState([]); //학생 직업 부여 항목
  const [jobKindList, setJobKindList] = useState([]); //직업 종류 항목
  const navigate = useNavigate();
  const [updateCheck, setUpdateCheck] = useState(0);

    // updateCheck 상태를 변경하는 함수
  const handleUpdateCheck = () => {
      setUpdateCheck((updateCheck + 1) % 2);
      onReset();
  };
  const divListStyle = {
    borderRadius: "40px",
    backgroundColor: "#fffeee",
    height: "85%",
  };
  const colStyle = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  };
  const divStyle = {
    width: "80%",
    height: "80vh",
    borderRadius: "40px",
    backgroundColor: "#FFFEEE",
  };

  const divvStyle = {
    borderRadius: "40px",
    backgroundColor: "#FEE173",
  };

  const numberOfJobList = jobList.length;

  const clickMenu = (idx) => {
    setState(idx);
  };

  const divJobStudentList = {
    width: "90%",
    fontSize: "18px",
    textAlign: "center",
    marginTop: "2vh",
    borderRadius: "40px",
    backgroundColor: "#FEE173",
    border: "solid 5px #F6BE2C",
  };

  //직업 메뉴의 탭들
  const menu = jobMenu.map((menu, index) => (
    <div
      key={index}
      onClick={() => clickMenu(index)}
      className={`menu-button ${state === index ? "bg-warning text-white" : ""}`}
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
  }, [updateCheck]);

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
  }, [updateCheck]);

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
  }, [updateCheck]);

  //직업수정 출력화면
  function JobStudentUpdateItem({ menu, jobList }) {
    const [selectedJob, setSelectedJob] = useState(menu.name);

    return (
      <div className="d-flex row mt-3" style={{ borderBottom: "1px solid black", padding: "10px" }}>
        <div className="col-1 text-center" style={{ fontSize: "24px" }}>
          {menu.citizenNumber}
        </div>
        <div className="col-3 text-center" style={{ fontSize: "24px" }}>
          {menu.studentName}
        </div>
        <div
          className="col-5 d-flex justify-content-center"
          style={{ fontSize: "20px", textAlign: "center" }}
        >
          <select
            name="jobs"
            id="jobs"
            className="w-50 border"
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
        </div>
        <div className="col-3  d-flex justify-content-center">
          {menu.name === null ? (
            <TeacherJobInsert citizenNumber={menu.citizenNumber} name={selectedJob} onUpdate={handleUpdateCheck} />
          ) : (
            <TeacherJobUpdate citizenNumber={menu.citizenNumber} name={selectedJob} onUpdate={handleUpdateCheck} />
          )}
        </div>
      </div>
    );
  }

  // JobStudentUpdateItems 배열을 사용하여 컴포넌트 렌더링
  const JobStudentUpdateItems = jobStudentList.map((menu, index) => (
    <JobStudentUpdateItem key={index} menu={menu} jobList={jobList} onUpdate={handleUpdateCheck} />
  ));

  return (
    <div style={divStyle} className="border border-dark mt-4 border-3 p-3">
      {" "}
      {/*가장 바깥쪽 DIV*/}
      <div className="d-flex justify-content-between">
        <div className="d-flex">{menu}</div> {/*메뉴탭*/}
      </div>
      {state === 0 ? (
        numberOfJobList === 0 ? (
          <div className="border border-dark  border-3 p-3" style={{ ...divvStyle, height: "65vh" }}>
          <div className="h-100 d-flex justify-content-center align-items-center">
            <div>직업을 생성해주세요.</div>
            <div className="justify-content-end p-3">
              <TeacherJobCreate onUpdate={handleUpdateCheck}/>
            </div>
          </div>
          </div>
        ) : (
          <div
            className="border border-dark  border-3 p-3"
            style={{ ...divvStyle, height: "65vh" }}
          >
            {" "}
            {/*중간탭*/}
            <div className="container d-flex justify-content-end invisible">
              (단위:{userData.moneyName})
            </div>
            <div className=" border border-dark  border-3 p-3" style={{ ...divListStyle }}>
              <div className="overflow-auto m-3 p-4 scrollCss " style={{ maxHeight: "45vh" }}>
                <table
                  style={{ ...colStyle, marginLeft: "auto", marginRight: "auto", width: "90%" }}
                >
                  {jobList.map((menu, index) => (
                    <tbody key={index} style={{ fontSize: "20px", height: "15vh" }}>
                      <tr
                        key={`${index}_content`}
                        style={{ borderTop: "3px solid black", padding: "10px" }}
                      >
                        <td className="fs-4" style={{ width: "20%" }}>
                          직업명 :
                        </td>
                        <td></td>
                        <td className="fs-4" style={{ width: "30%" }}>
                          {menu.name}
                        </td>

                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}
                          >
                            <TeacherJobDelete name={menu.name} onUpdate={handleUpdateCheck}/>
                          </div>
                        </td>
                      </tr>
                      <tr key={`${index}_content`}>
                        <td className="fs-4" style={{ width: "40%" }}>
                          업무항목 :
                        </td>
                        <td></td>
                        <td key={index} className="fs-4">
                          {menu.jobToDoContent}
                        </td>
                      </tr>
                      <tr key={`${index}_salary`}>
                        <td className="fs-4" style={{ width: "20%" }}>
                          월급 :
                        </td>
                        <td></td>
                        <td key={index} className="fs-4">
                          {menu.salary}
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
            <div className="container d-flex justify-content-end p-2">
              <TeacherJobCreate onUpdate={handleUpdateCheck}/>
            </div>
          </div>
        )
      ) : (
        <div>
          <div
            className="border border-dark  border-3 p-3"
            style={{ ...divvStyle, height: "65vh" }}
          >
            {" "}
            {/*중간탭*/}
            <div className="container d-flex justify-content-end invisible">
              (단위:{userData.moneyName})
            </div>
            <div className=" border border-dark  border-3 p-3" style={{ ...divListStyle }}>
              <div className=" m-3 p-4 ">
                <div style={colStyle}>
                  <div style={{ borderBottom: "5px solid black" }}>
                    <div className="d-flex row">
                      <div className="col-1 text-center" style={{ fontSize: "28px" }}>
                        번호
                      </div>
                      <div className="col-3 text-center" style={{ fontSize: "28px" }}>
                        이름
                      </div>
                      <div className="col-5 text-center" style={{ fontSize: "28px" }}>
                        직업
                      </div>
                      <div className="col-3 text-center" style={{ fontSize: "28px" }}></div>
                    </div>
                  </div>
                  <div className="container overflow-auto scrollCss " style={{ height: "37vh" }}>
                    {JobStudentUpdateItems}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
