import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function TeacherLawCreate({lawList}){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    console.log(lawList)

    return(
        <div>
            <Button onClick={handleShow}>추가</Button>

            <Modal show={show} onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title>법 제정하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="content">
                            <Form.Label column sm="3">
                                부과 규칙 : 
                            </Form.Label>
                            <Col sm="6">
                                <Form.Select aria-label="Default select example">
                                    <option>부과 규칙</option>
                                    
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="fine">
                            <Form.Label column sm="3">
                                벌금: 
                            </Form.Label>
                            <Col sm="3">
                                <Form.Control type="text" placeholder="벌금 금액"/>
                            </Col>
                            <Col sm="3">미소</Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="btn_close" variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}