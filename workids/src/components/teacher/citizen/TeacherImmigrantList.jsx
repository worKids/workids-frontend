import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";
import TeacherImmigrantAcquire from "./TeacherImmigrantAcquire";

export default function TeacherImmigrantList({ citizenNumber }) {
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    const [immigrantList, setImmigrantList] = useState([]); // 국민 항목

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
                setImmigrantList(response.data.data);
                setShow(true); // 조회 결과가 있으면 테이블을 보여주도록 설정
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    };

    // 이민자관리 출력화면
    const [name, setName] = useState('');
    const [asset, setAsset] = useState('');
    const [creditRating, setCreditRating] = useState('');

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
        <tr key={index}>
            <td>{menu.citizenNumber}</td>
            <td>{menu.studentName}</td>
            <td><input type="text" value={name} onChange={handleNameChange} /></td>
            <td><input type="number" value={asset} onChange={handleAssetChange} /></td>
            <td><input type="number" value={creditRating} onChange={handleCreditRatingChange} /></td>
            <td><TeacherImmigrantAcquire
                citizenNumber={menu.citizenNumber}
                name={name}
                asset={asset}
                creditRating={creditRating}
            /></td>
        </tr>
    ));
    return (
        <div>
            <button onClick={handleShow}>학급번호로 조회</button>
            {show && (
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
                    <tbody>{immigrantItems}</tbody>
                </table>
            )}
        </div>
    );
}