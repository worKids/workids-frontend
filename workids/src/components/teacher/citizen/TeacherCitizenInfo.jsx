import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";


export default function TeacherCitizenInfo({ citizenNumber }) {
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    const [selectedTab, setSelectedTab] = useState('tab1'); // 초기 탭 설정
    const [citizenInfo, setCitizenInfo] = useState([]); // 국민 항목
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const handleCitizenInfo = () => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }

        // 상세정보 가져오기
        axBase(token)({
            method: "post",
            url: "/teacher/citizen/info/list",
            data: {
                nationNum: userData.nationNum,
                citizenNumber: citizenNumber
            },
        })
            .then((response) => {

                setCitizenInfo(response.data.data);
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    };

    const citizenInfoItems = citizenInfo.map((menu, index) => (
        <tr key={index}>
            <td className="info-cell">
                <span className="info-label">{menu.citizenNumber}번</span>
            </td>
            <td className="info-cell">
                <span className="info-label">{menu.studentName}</span>
            </td>
            <td className="info-cell">
                <span className="info-label">{menu.name}</span>
            </td>
            <td className="info-cell">
                <span className="info-label">{menu.creditRating}점</span>
            </td>
        </tr>
    ));

    const handleTabChange = (e) => {
        if (e.target.id === 'inline-radio-1') {
            setSelectedTab('tab1');
        } else if (e.target.id === 'inline-radio-2') {
            setSelectedTab('tab2');
        } else if (e.target.id === 'inline-radio-3') {
            setSelectedTab('tab3');
        } else {
            setSelectedTab('tab4');
        }
    };

    // 각 탭에 따른 내용을 정의
    const tabContents = {
        tab1: (
            
            <div>
                <hr style={{ border: '2px solid #000' }} />
                <p>자산 내용을 여기에 추가.</p>

            </div>
        ),
        tab2: (
            <div>
                <hr style={{ border: '2px solid #000' }} />
                <p>벌금 내용을 여기에 추가.</p>
            </div>
        ),
        tab3: (
            <div>
                <hr style={{ border: '2px solid #000' }} />
                <p>벌칙 내용을 여기에 추가.</p>
            </div>
        ),
        tab4: (
            <div>
                <hr style={{ border: '2px solid #000' }} />
                <p>부동산 내용을 여기에 추가.</p>
            </div>
        ),
    };

    return (
        <div>
            <button
                onClick={() => { handleShow(); handleCitizenInfo(); }}
                style={{ backgroundColor: '#FFD700', color: 'black' }}
            >
                {citizenNumber}
            </button>
            <Modal
                show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{citizenInfoItems}</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    {/* 라디오 버튼 */}
                    <Form>
                        <div className="form-check form-check-inline">
                            <Form.Check
                                type="radio"
                                label={<span className="info-label">자산</span>}
                                id="inline-radio-1"
                                checked={selectedTab === 'tab1'}
                                onChange={handleTabChange}
                            />
                        </div>
                        <div className="form-check form-check-inline">
                            <Form.Check
                                type="radio"
                                label={<span className="info-label">벌금</span>}
                                id="inline-radio-2"
                                checked={selectedTab === 'tab2'}
                                onChange={handleTabChange}
                            />
                        </div>
                        <div className="form-check form-check-inline">
                            <Form.Check
                                type="radio"
                                label={<span className="info-label">벌칙</span>}
                                id="inline-radio-3"
                                checked={selectedTab === 'tab3'}
                                onChange={handleTabChange}
                            />
                        </div>
                        <div className="form-check form-check-inline">
                            <Form.Check
                                type="radio"
                                label={<span className="info-label">부동산</span>}
                                id="inline-radio-4"
                                checked={selectedTab === 'tab4'}
                                onChange={handleTabChange}
                            />
                        </div>
                    </Form>

                    {tabContents[selectedTab]}
                </Modal.Body>
                
            </Modal>
        </div>
    );
}