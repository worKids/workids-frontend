import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";
import Form from 'react-bootstrap/Form';

export default function StudentRanking() {

  const [userData, setUserData] = useRecoilState(userState);
  const navigate = useNavigate();
  const [rankingList, setLankingList] = useState({assetRanking: [], consumptionRanking: [], savingRanking: [], fineRanking: []}); 
  const numberOfAsset = rankingList.assetRanking.length;
  const numberOfConsumption = rankingList.consumptionRanking.length;
  const numberOfSaving = rankingList.savingRanking.length;
  const numberOfFine = rankingList.fineRanking.length;
  const [selectedTab, setSelectedTab] = useState('tab1');
  const [type, setType] = useState('t');

  const divBlock ={
    display: "inline-block",
    borderRadius: "25px",
    width: "25%",
    backgroundColor: 'rgba(217, 217, 217, 0.5)'
  }

  const handleTabChange = (e) => {
    if (e.target.id === 'inline-radio-1') {
      setSelectedTab('tab1'); // 1번이 선택되면 tab1 표시
      setType('t');
    } else if (e.target.id === 'inline-radio-2') {
      setSelectedTab('tab2'); // 2번이 선택되면 tab2 표시
      setType('m');
    }
};

  //랭킹 리스트 가져오기
  useEffect(() => {
    const token = userData.accessToken;
    if (!token) {
        navigate("/");
    }

    axBase(token)({
        method: "post",
        url: "/ranking/list",
        data: {
          nationNum: userData.nationNum,
          type: type,
        },
        })
        .then((response) => {
            console.log(response.data.data);
            setLankingList(response.data.data);
        })
        .catch((err) => {
            alert(err.response.data.message);
        });

  }, [type]);
  
  return (
    <div style={{height:"100%"}}>
      <Form style={{height:"90%"}}> 
        <div className="container d-flex justify-content-end" style={{fontSize:"13px"}}>*자산왕은 항상 전체 기간 기준입니다.</div>
        {['radio'].map((type) => (
            <div key={`inline-${type}`} style={{textAlign:"left", fontSize:"14px"}}>
            <Form.Check
                inline
                label="전체 랭킹"
                name="type"
                type={type}
                id={`inline-${type}-1`}
                checked={selectedTab === 'tab1'}
                onChange={handleTabChange}
            />
            <Form.Check
                inline
                label="월 랭킹"
                name="type"
                type={type}
                id={`inline-${type}-2`}
                checked={selectedTab === 'tab2'}
                onChange={handleTabChange}
            />
            </div>   
        ))}
    <div className="container d-flex justify-content-end" style={{ fontSize: "13px"}}>(단위:{userData.moneyName})</div>    
        <div className="container d-flex" style={{height:"100%"}}>

          <div style={divBlock} className="m-2">
            <div className="row justify-content-md-center p-3" style={{fontSize:"30px"}}>자산왕</div>
            <div className="row justify-content-md-center">
              {numberOfAsset === 0 ? (
                <div>
                  기간 내에 자산 있는 국민이 없습니다.
                </div>
              ):(
                <div>
                  <div className="row justify-content-md-center" style={{ fontSize: "20px", textAlign: "center" }}>
                    <div className="col-sm-3 p-1 m-1">등수</div>
                    <div className="col-sm-4 p-1 m-1">이름</div>
                    <div className="col-sm-3 p-1 m-1">총액</div>
                  </div>
                  {rankingList.assetRanking.map((item, index) => (
                    <div key={index} className="row justify-content-md-center p-1" style={{ fontSize: "18px", textAlign: "center" }}>
                      <div className="col-sm-3 p-1 m-1">{index + 1}등</div>
                      <div className="col-sm-4 p-1 m-1">{item.studentName}</div>
                      <div className="col-sm-3 p-1 m-1">{item.longResult}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={divBlock} className="m-2">
            <div className="row justify-content-md-center p-3" style={{fontSize:"30px"}}>소비왕</div>
            <div className="row justify-content-md-center">
              {numberOfConsumption === 0 ? (
                <div>
                  기간 내에 소비한 국민이 없습니다.
                </div>
              ):(
                <div>
                  <div className="row justify-content-md-center" style={{ fontSize: "20px", textAlign: "center" }}>
                    <div className="col-sm-3 p-1 m-1">등수</div>
                    <div className="col-sm-4 p-1 m-1">이름</div>
                    <div className="col-sm-3 p-1 m-1">총액</div>
                  </div>
                  {rankingList.consumptionRanking.map((item, index) => (
                    <div key={index} className="row justify-content-md-center p-1" style={{ fontSize: "18px", textAlign: "center" }}>
                      <div className="col-sm-3 p-1 m-1">{index + 1}등</div>
                      <div className="col-sm-4 p-1 m-1">{item.studentName}</div>
                      <div className="col-sm-3 p-1 m-1">{item.longResult}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={divBlock} className="m-2">
            <div className="row justify-content-md-center p-3" style={{fontSize:"30px"}}>저축왕</div>
            <div className="row justify-content-md-center">
              {numberOfSaving === 0 ? (
                <div>
                  기간 내에 저축한 국민이 없습니다.
                </div>
              ):(
                <div>
                  <div className="row justify-content-md-center" style={{ fontSize: "20px", textAlign: "center" }}>
                    <div className="col-sm-3 p-1 m-1">등수</div>
                    <div className="col-sm-4 p-1 m-1">이름</div>
                    <div className="col-sm-3 p-1 m-1">총액</div>
                  </div>
                  {rankingList.savingRanking.map((item, index) => (
                    <div key={index} className="row justify-content-md-center p-1" style={{ fontSize: "18px", textAlign: "center" }}>
                      <div className="col-sm-3 p-1 m-1">{index + 1}등</div>
                      <div className="col-sm-4 p-1 m-1">{item.studentName}</div>
                      <div className="col-sm-3 p-1 m-1">{item.longResult}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={divBlock} className="m-2">
            <div className="row justify-content-md-center p-3" style={{fontSize:"30px"}}>벌금왕</div>
            <div className="row justify-content-md-center">
              {numberOfFine === 0 ? (
                <div>
                  기간 내에 벌금 낸 국민이 없습니다.
                </div>
              ):(
                <div>
                  <div className="row justify-content-md-center" style={{ fontSize: "20px", textAlign: "center" }}>
                    <div className="col-sm-3 p-1 m-1">등수</div>
                    <div className="col-sm-4 p-1 m-1">이름</div>
                    <div className="col-sm-3 p-1 m-1">총액</div>
                  </div>
                  {rankingList.fineRanking.map((item, index) => (
                    <div key={index} className="row justify-content-md-center p-1" style={{ fontSize: "18px", textAlign: "center" }}>
                      <div className="col-sm-3 p-1 m-1">{index + 1}등</div>
                      <div className="col-sm-4 p-1 m-1">{item.studentName}</div>
                      <div className="col-sm-3 p-1 m-1">{item.longResult}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </Form>
    </div>
    
  );
}
