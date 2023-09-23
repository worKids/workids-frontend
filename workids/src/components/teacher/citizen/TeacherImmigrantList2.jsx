import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";
import TeacherImmigrantLeave from "./TeacherImmigrantLeave";

export default function TeacherImmigrantList2({ citizenNumber }) {
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    const [immigrantList2, setImmigrantList2] = useState([]); // 국민 항목
    
    const divStudentList = {
        width: "90%",
        fontSize: "18px",
        textAlign: "center",
        borderRadius:"40px",
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
        margin : "4px"
      }
    const handleClose = () => setShow(false);

    useEffect(() => {
        handleXShow();
    }, []);

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
                setImmigrantList2(response.data.data);
                setShow(true); // 조회 결과가 있으면 테이블을 보여주도록 설정
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    };

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
                setImmigrantList2(response.data.data);
                setShow(true); // 조회 결과가 있으면 테이블을 보여주도록 설정
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    };

    // 이민자관리 출력화면
    const immigrantItems2 = immigrantList2.map((menu, index) => (
        <div key={index} style={{ display: 'flex', fontSize: '20px', marginBottom: '10px' }}>
    <div style={{ flex: 1 }}>{menu.citizenNumber}</div>
    <div style={{ flex: 1 }}>{menu.studentName}</div>
    <div style={{ flex: 1 }}>{menu.name}</div>
    <div style={{ flex: 1 }}>{menu.asset}</div>
    <div style={{ flex: 1 }}>{menu.credit_rating}</div>
    <div style={{ flex: 1 }}><TeacherImmigrantLeave citizenNumber={menu.citizenNumber} /></div>
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
                <div className="overflow-auto scrollCss" style={{height:'28vh'}}>
                    {immigrantItems2} 
                </div>
                </div>
            )}
        </div>

    </div>
    );
}