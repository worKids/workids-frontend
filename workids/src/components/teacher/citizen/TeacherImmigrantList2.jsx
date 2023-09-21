import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";
import TeacherImmigrantLeave from "./TeacherImmigrantLeave";

export default function TeacherImmigrantList2({ citizenNumber }) {
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    const [immigrantList2, setImmigrantList2] = useState([]); // 국민 항목
    const divListStyle = {
        borderRadius: "20px",
        backgroundColor: "#FEE173",
        border: "solid 5px #F6BE2C"
    }
    const handleClose = () => setShow(false);

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
        <tr key={index}>
            <td>{menu.citizenNumber}</td>
            <td>{menu.studentName}</td>
            <td>{menu.name}</td>
            <td>{menu.asset}</td>
            <td>{menu.credit_rating}</td>
            <td><TeacherImmigrantLeave citizenNumber={menu.citizenNumber} /></td>
        </tr>
    ));

    return (
        <div>
                 <button onClick={handleShow}>학급번호로 조회</button>
        <div>
        <div style={{ marginTop: "60px" }}></div> {/* 아래쪽으로 20px만큼 공간을 추가합니다. */}
           
            {show && (
                 <div className="overflow-auto m-3 p-4 scrollCss" style={{ ...divListStyle, maxHeight: '50vh' }}>
                <table>
                    <thead>
                    <tr>
                            <th style={{ width: "20%" }}>학급 번호</th>
                            <th style={{ width: "20%" }}>이름</th>
                            <th style={{ width: "20%" }}>직업</th>
                            <th style={{ width: "20%" }}>자산</th>
                            <th style={{ width: "20%" }}>신용도</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{immigrantItems2}</tbody>
                </table>
                </div>
            )}
        </div>
        </div>
    );
}