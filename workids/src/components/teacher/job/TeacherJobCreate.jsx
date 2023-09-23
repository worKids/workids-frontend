import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { axBase } from "../../../apis/axiosInstance";


export default function TeacherJobCreate() {
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);
    const [addJob, setAddJob] = useState({
        nationNum: userData.nationNum,
        name: "",
        salary: 0,
        state: 0,
        content: "",
    });
    const { nationNum, name, salary, state, content } = addJob;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getAllInput = (e) => {
        const { name, value } = e.target;
        const nextInputs = {
            ...addJob,
            [name]: value,
        };

        //객체를 새로운 상태로 쓰겠다. 
        setAddJob(nextInputs);
    }

    const onResetJob = () => {
        setAddJob({
            nationNum: userData.nationNum,
            name: "",
            salary: 0,
            state: 0,
            content: "",
        })
    };

    const handleAddJob = () => {

        const token = userData.accessToken;
        if (!token) {
            navigate("/");
            onResetJob();
        }

        // 직업 리스트 뽑아오기
        axBase(token)({
            method: "post",
            url: "/teacher/job",
            data: {
                nationNum: addJob.nationNum,
                name: addJob.name,
                salary: addJob.salary,
                state: addJob.state,
                content: addJob.content

            },
        })
            .then((response) => {
                alert("직업 등록 완료");
                handleClose();
                onResetJob();

            })
            .catch((err) => {
                alert(err.response.data.message);
            });

    };


    return (
        <div>
            <div onClick={handleShow} className="create-button">추가</div>

            <Modal show={show} onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title className="info-label fs-3">직업 추가</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <div>
                            <Form.Group as={Row} className="mb-2 info-label">
                                <Form.Label column sm="3" style={{ fontSize: '20px' }}>
                                    직업명 :
                                </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="text" name="name" placeholder="직업명" onChange={getAllInput} value={name} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-2 info-label">
                                <Form.Label column sm="3" style={{ fontSize: '20px' }}>
                                    업무항목 :
                                </Form.Label>
                                <Col sm="6">
                                    <Form.Control type="text" name="content" placeholder="업무항목" onChange={getAllInput} value={content} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-2 info-label">
                                <Form.Label column sm="3" style={{ fontSize: '20px' }}>
                                    월급:
                                </Form.Label>
                                <Col sm="3">
                                    <Form.Control type="text" name="salary" placeholder="월급 금액" onChange={getAllInput} value={salary} />
                                </Col>
                                <Col sm="3"></Col>
                            </Form.Group>
                            <Modal.Footer>
                                <div onClick={handleAddJob} className="info-label fs-5 modal-button">Yes</div>
                                <div onClick={handleClose} className="info-label fs-5 modal-button">No</div>
                            </Modal.Footer>
                        </div>


                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}