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
        <tr key={index}>
            <td>{menu.citizenNumber}</td>
            <td>{menu.studentName}</td>
            <td>
                <select
                    name="jobs"
                    id="jobs"
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                    style={{ width: '100px' }} // 원하는 넓이로 설정하세요
                >
                    <option value={selectedJob}>{selectedJob}</option>
                    {jobList.map((job, index) => (
                        <option key={index} value={job.name}>
                            {job.name}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                <input
                    type="number"
                    value={asset}
                    onChange={handleAssetChange}
                    style={{ width: '80px' }} // 원하는 넓이로 설정하세요
                />
            </td>
            <td>
                <input
                    type="number"
                    value={creditRating}
                    onChange={handleCreditRatingChange}
                    style={{ width: '80px' }} // 넓이를 80px로 설정
                />
            </td>
            <td><TeacherImmigrantAcquire
                citizenNumber={menu.citizenNumber}
                name={selectedJob}
                asset={asset}
                creditRating={creditRating}

            /></td>
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
                            <tr >
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
                    </div>
                )}
            </div>

        </div>
    );
}