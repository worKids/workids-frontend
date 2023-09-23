import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";
import TeacherImmigrantAcquire from "./TeacherImmigrantAcquire";

export default function TeacherImmigrantList({ citizenNumber }) {
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    const [immigrantList, setImmigrantList] = useState([]); // 국민 항목
    const [jobList, setJobList] = useState([]); //직업 항목
 
    const divStudentList = {
        width: "90%",
        fontSize: "18px",
        textAlign: "center",
        borderRadius: "40px",
        backgroundColor: '#FEE173',
        height: "38.5vh"
    }
    const colStyle = {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    }
    const hrStyle = {
        width: "100%",
        height: "5px",
        backgroundColor: "black",
        margin: "4px"
    }
    
    const handleClose = () => setShow(false);
    const divListStyle = {
        borderRadius: "20px",
        backgroundColor: "#FEE173",
        border: "solid 5px #F6BE2C"
    }

    // 학급번호로 조회 버튼 클릭 이벤트 핸들러
    const handleShow = () => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
            return;
        }

        axBase(token)
            .post("/teacher/citizen/immigrant", {
                nationNum: userData.nationNum,
                citizenNumber: citizenNumber,
            })
            .then((response) => {
                console.log(response.data.data);
                setImmigrantList(response.data.data);
                setShow(true); // 조회 결과가 있으면 테이블을 보여주도록 설정
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    };
    const handleXShow = () => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
            return;
        }

        axBase(token)
            .post("/teacher/citizen/immigrant", {
                nationNum: userData.nationNum,
                citizenNumber: 0,
            })
            .then((response) => {
                console.log(response.data.data);
                setImmigrantList(response.data.data);
                setShow(true); // 조회 결과가 있으면 테이블을 보여주도록 설정
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    };

    //직업리스트 뽑아오기
    useEffect(() => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
        
        handleXShow();
        

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

    const [name, setName] = useState('');
    const [asset, setAsset] = useState('');
    const [creditRating, setCreditRating] = useState('');
    const [selectedJob, setSelectedJob] = useState(''); // 선택된 직업

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleAssetChange = (event) => {
        setAsset(event.target.value);
    };

    const handleCreditRatingChange = (event) => {
        setCreditRating(event.target.value);
    };

    const immigrantItems = immigrantList.map((menu, index) => (
        <div>

            <div key={index} className="row">
                <div className="col" style={{ fontSize: '20px' }}>
                    {menu.citizenNumber}
                </div>
                <div className="col" style={{ fontSize: '20px' }}>
                    {menu.studentName}
                </div>
                <div className="col" style={{ fontSize: '15px' }}>
                    <select
                        name="jobs"
                        id="jobs"
                        value={selectedJob}
                        onChange={(e) => setSelectedJob(e.target.value)}
                        style={{ width: '90px', height: '30px' }} // 원하는 넓이와 높이로 설정하세요
                    >
                        <option value={selectedJob}>{selectedJob}</option>
                        {jobList.map((job, index) => (
                            <option key={index} value={job.name}>
                                {job.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col" style={{ fontSize: '15px' }}>
                    <input
                        type="number"
                        value={asset}
                        onChange={handleAssetChange}
                        style={{ width: '90px', height: '30px' }} // 원하는 넓이로 설정하세요
                    />
                </div>
                <div className="col" style={{ fontSize: '15px' }}>
                    <input
                        type="number"
                        value={creditRating}
                        onChange={handleCreditRatingChange}
                        style={{ width: '90px', height: '30px' }} // 넓이를 80px로 설정
                    />
                </div>
                <div className="col">
                    <TeacherImmigrantAcquire
                        citizenNumber={menu.citizenNumber}
                        name={selectedJob}
                        asset={asset}
                        creditRating={creditRating}
                    />
                </div>
            </div>
        </div>
    ));


    return (
        <div >
            <div className="container d-flex justify-content-md-center align-items-center">
                <button onClick={handleShow} className="create-button" style={{width:"17vh"}}>국민 조회</button>
            </div>
            <div>
                <div className="my-4"></div>
                {show && (
                    <div style={divStudentList} className="container justify-content-md-center border border-dark  border-3 ">
                        <div className="row m-2 p-1 fs-4" style={colStyle}>
                            <div className="col-2">번호</div>
                            <div className="col-2">이름</div>
                            <div className="col-2 ">직업</div>
                            <div className="col-2">자산</div>
                            <div className="col-2">신용도</div>
                            <div className="col-1"></div>
                            <div style={hrStyle}></div>
                        </div>
                        <div className="overflow-auto scrollCss" style={{ height: '28vh' }}>
                            <div className="container">
                                {immigrantItems}
                              
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}