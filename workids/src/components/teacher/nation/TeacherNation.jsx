import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";  
 
export default function TeacherNation(){ 
    const nationInfoMenu = ["나라 정보", "나라 정보 수정", "학급번호 연결"];
    const [state, setState] = useState(0);//버튼 클릭
    const userData = useRecoilValue(userState);  
    const [nationInfo, setNationInfo] = useState([]); 
    const [citizenList, setCitizenList] = useState([]); 
    const navigate = useNavigate();
      const [showCitizenList, setShowCitizenList] = useState(false);

    const clickMenu = (idx) => {
        setState(idx);
        onReset();
        if(idx===1){
            setCheckedItems(initialCheckedItems); //checkbox 초기 설정
        }
      };

    const divStyle = {
    width: "80%",
    borderRadius: "40px",
    };

    const borderRound = {
        borderRadius: "40px",
        textAlign: 'center',
    };

    const btn = {
        borderRadius: "30px", 
        backgroundColor: 'white', 
        color: 'black',
        marginRight: '10px'
    };

 

    const navigateToCitizenCreate = () => {
        setShowCitizenList(true); // 버튼 클릭 시 상태 변경
        navigate("/teacher/citizenCreate");
      };
 
  
    const menu = nationInfoMenu.map((menu, index) => (
        <div
          key={index}
          onClick={() => clickMenu(index)}
          className={`m-2 border border-dark  border-3 text-center p-3 rounded-pill ${
            state === index ? "bg-warning text-white" : ""
          }`}
        >
          {menu}
        </div>
    ));

    const handleSaveChanges = () => {
        // 변경된 내용을 저장하는 로직을 추가
        const token = userData.accessToken;
        if (!token) {
          navigate("/");
          return;
        }
    
        axBase(token)({
          method: "patch",
          url: "/nation", // 변경 내용 저장 엔드포인트
          data: { 
            // 변경된 내용을 서버로 전송
            nationNum: userData.nationNum,
            name: nationInfo.name,
            moneyName: nationInfo.moneyName,
            taxRate: nationInfo.taxRate,
            presidentName: nationInfo.presidentName,
            payDay: nationInfo.payDay,
            state: nationInfo.state,
            startDate: nationInfo.startDate,
            endDate: nationInfo.endDate,
          },
        })
          .then((response) => {
            console.log("변경된 내용이 성공적으로 저장되었습니다.");
            alert("변경된 내용이 성공적으로 저장되었습니다.");
          })
          .catch((err) => {
            console.log("변경된 내용 저장 중 오류가 발생했습니다.", err.response.data.message);
          });
      };
 
    useEffect(() => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
        console.log(userData.nationNum); 

        axBase(token)({
            method: "post",
            url: "/nation/list",
            data: {
                
                num: userData.nationNum,
            },
            }) 
            .then((response) => {
                console.log(response.data.data); 
                setNationInfo(response.data.data); // 상태 업데이트   
            })
            .catch((err) => {
                alert(err.response.data.message);
            });

    }, []);

    useEffect(() => {
        const token = userData.accessToken;
        if (!token) {
            navigate("/");
        }
        console.log(userData.nationNum); 

        axBase(token)({
            method: "post",
            url: "/teacher/citizen/list",
            data: { 
                num: userData.nationNum,
            },
            }) 
            .then((response) => {
                console.log(response.data.data); 
                setCitizenList(response.data.data); // 상태 업데이트   
            })
            .catch((err) => {
                alert(err.response.data.message);
            });

    }, []);

    //국민 목록 출력
    const CitizenItems = citizenList.map((item,index)=>(

        <div key={index} className="row justify-content-md-center p-1" style={{fontSize:"15px", textAlign:"center"}}>
        <div className="col-1 p-2">{item.citizenNumber}</div>
        <div className="col-4 p-2">{item.studentName}</div>   
        <div className="col-4 p-2">{item.birthDate}</div>   
        <hr></hr>
        </div>
    ));


 

 

    return ( 
  
        <div style={divStyle} className="border border-dark  border-3 p-3">
                <div className="d-flex justify-content-between">
                    <div className="d-flex">{menu}</div>
                    <div>나라 정보</div>
                </div>
                {state === 0 ? (
                    <div className="d-flex justify-content-center align-items-center">
                    <div> 
                    <p>나라명: {nationInfo.name}</p>
                    <p>화폐명: {nationInfo.moneyName}</p>
                    <p>세율: {nationInfo.taxRate}</p>
                    <p>월급지급일: {nationInfo.payDay}</p>
                    <p>대통령명: {nationInfo.presidentName}</p>
                    <p>나라운영상태: {nationInfo.state}</p>
                    <p>운영시작일: {nationInfo.startDate}</p>
                    <p>운영종료일: {nationInfo.endDate}</p>
                    <p>참여코드: {nationInfo.code}</p>
                    </div>
                    </div>

                ) : state ===1? ( 
                    <div className="d-flex justify-content-center align-items-center">
                    <div>
                        {/* 나라 정보 수정 폼 */}
                        <div className="row">
                            <div className="col-md-6"> 
                            <div className="mb-4">
                                <label htmlFor="nationName" className="form-label"> 
                                나라명:
                                </label>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="moneyName" className="form-label">
                                화폐명:
                                </label>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="taxRate" className="form-label">
                                세율:
                                </label>
                            </div> 
                            <div className="mb-4">
                                <label htmlFor="payDay" className="form-label">
                                월급지급일:
                                </label>
                            </div> 
                            <div className="mb-4">
                                <label htmlFor="presidentName" className="form-label">
                                대통령명:
                                </label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="state" className="form-label">
                                나라운영상태:
                                </label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="startDate" className="form-label">
                                운영 시작일:
                                </label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="endDate" className="form-label">
                                운영 종료일:
                                </label>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="code" className="form-label">
                                참여코드:
                                </label>
                            </div>
                            </div>
                            <div className="col-md-6">
                            <div className="mb-3">
                                <input
                                type="text"
                                className="form-control"
                                id="nationName"
                                value={nationInfo.name}
                                onChange={(e) => setNationInfo({ ...nationInfo, name: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                type="text"
                                className="form-control"
                                id="moneyName"
                                value={nationInfo.moneyName}
                                onChange={(e) => setNationInfo({ ...nationInfo, moneyName: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                type="text"
                                className="form-control"
                                id="taxRate"
                                value={nationInfo.taxRate}
                                onChange={(e) => setNationInfo({ ...nationInfo, taxRate: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                type="text"
                                className="form-control"
                                id="payDay"
                                value={nationInfo.payDay}
                                onChange={(e) => setNationInfo({ ...nationInfo, payDay: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                type="text"
                                className="form-control"
                                id="presidentName"
                                value={nationInfo.presidentName}
                                onChange={(e) => setNationInfo({ ...nationInfo, presidentName: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                type="text"
                                className="form-control"
                                id="state"
                                value={nationInfo.state}
                                onChange={(e) => setNationInfo({ ...nationInfo, state: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                type="text"
                                className="form-control"
                                id="startDate"
                                value={nationInfo.startDate}
                                onChange={(e) => setNationInfo({ ...nationInfo, startDate: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                type="text"
                                className="form-control"
                                id="endDate"
                                value={nationInfo.endDate}
                                onChange={(e) => setNationInfo({ ...nationInfo, endDate: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                {nationInfo.code}
                            </div>
                        </div> 
                    </div>
 
                    <div className="text-end"> {/* 오른쪽 정렬 */}
                    <button className="btn btn-secondary" onClick={handleSaveChanges}>
                      변경내용 저장
                    </button>
                    </div>
                  </div>
                  </div>
                ) : (
                    showCitizenList? (
                        <div>
                            job
                            </div>
 
                      ) : (
                        <div className="border border-dark  border-3 m-5 p-5 bg-warning" style={borderRound}> 
                        <p>국민 목록 설정이 되어있지 않습니다.</p>
                        <p>국민 목록을 설정해주세요 ~ !</p>
                        <p/>
                        {navigateToCitizenCreate ? (
                          <button className="btn btn-primary" onClick={navigateToCitizenCreate} style={btn}>국민 목록 설정하기</button>
                        ) : null}
                      </div>
                      )
                )}
            </div>
    );
}