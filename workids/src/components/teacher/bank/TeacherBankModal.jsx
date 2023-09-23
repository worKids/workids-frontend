import React, { useState } from "react";
import { axBase } from "../../../apis/axiosInstance";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function TeacherBankModal(props) {
  const userData = useRecoilValue(userState);
  const [productName, setProductName] = useState("");
  const [productContent, setProductContent] = useState("");
  const [productPeriod, setProductPeriod] = useState();
  const [interestRate, setInterestRate] = useState();
  const navigate = useNavigate();

  const createBank = async () => {
    const token = userData.accessToken;

    if (!token) {
      navigate("/");
    }

    props.onModalClose();

    axBase(token)({
      method: "post",
      url: "/teacher/bank",
      data: {
        nationNum: userData.nationNum,
        productType: 1,
        productName: productName,
        productContent: productContent,
        productPeriod: productPeriod,
        interestRate: interestRate,
        cancelInterestRate: 0.0,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        props.setCheck(props.check + 1);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const widthStyle = {
    width: "100%",
  };

  return (
    <Form className="m-3">
      <Form.Group className="mb-3">
        <Form.Label>상품명:</Form.Label>
        <Form.Control
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="1월 예금"
          style={widthStyle}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>상품 설명:</Form.Label>
        <Form.Control
          type="text"
          value={productContent}
          onChange={(e) => setProductContent(e.target.value)}
          placeholder="1월 예금입니다"
          style={widthStyle}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>상품 가입 기간(주):</Form.Label>
        <Form.Control
          type="number"
          value={productPeriod}
          onChange={(e) => setProductPeriod(e.target.value)}
          placeholder="8주"
          style={widthStyle}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>만기 이자율(%):</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          placeholder="10%"
          style={widthStyle}
        />
      </Form.Group>

      <div className="d-flex justify-content-end">
        <div onClick={createBank} className="fs-5 modal-button hoverable">확인</div>
      </div>
    </Form>
  );
}
