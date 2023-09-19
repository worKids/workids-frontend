import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";  
 
export default function TeacherNation(){ 
    const nationInfoMenu = ["나라 정보", "나라 정보 수정", "학급번호 연결"];
    const [state, setState] = useState(0);//버튼 클릭
    const userData = useRecoilValue(userState);  


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
    // 학생 정보를 저장할 상태 변수
    const [students, setStudents] = useState([
        { id: 1, citizenNumber: '', studentName: '', birthdate: '' },
    ]);

    // 학생 정보를 추가하는 함수
    const addStudent = () => {
        const newStudent = { id: students.length + 1, citizenNumber: '', studentName: '', birthdate: '' };
        setStudents([...students, newStudent]);
    };

    // 학생 정보를 변경하는 함수
    const handleChange = (e, id, field) => {
        const updatedStudents = students.map((student) => {
        if (student.id === id) {
            return { ...student, [field]: e.target.value };
        }
        return student;
        });
        setStudents(updatedStudents);
    };

    const handleSaveChanges = () => {
        // 변경된 내용을 저장하는 로직을 추가
        const token = userData.accessToken;
        if (!token) {
          navigate("/");
          return;
        }
    
        axBase(token)({
          method: "patch",
          url: "/teacher/citizen", // 변경 내용 저장 엔드포인트
          data: { 
            // 변경된 내용을 서버로 전송
            nationNum: userData.nationNum,
            citizenNumber: students.citizenNumber,
            name: students.name,
            birthDate: students.birthDate, 
          },
        })
          .then((response) => {
            console.log("변경된 내용이 성공적으로 저장되었습니다.");
            alert("국민목록이 등록되었습니다.");
          })
          .catch((err) => {
            console.log("변경된 내용 저장 중 오류가 발생했습니다.", err.response.data.message);
          });
      };

    return(
        
        <div style={divStyle} className="border border-dark  border-3 p-3">
            
        <div className="d-flex justify-content-between">
            <div className="d-flex">{menu}</div>

            </div>

        <div className="border border-dark  border-3 m-5 p-5 bg-warning" style={borderRound}> 
        
        <table>
        <thead>
            <tr>
            <th>학급번호</th> 
            <th>학생이름</th>
            <th>생년월일</th>
            </tr>
        </thead>
        <tbody>
            {students.map((student) => (
            <tr key={student.id}>
                <td>
                <input
                    type="text"
                    value={student.studentNumber}
                    onChange={(e) => handleChange(e, student.id, 'citizenNumber')}
                />
                </td>
                <td>
                <input
                    type="text"
                    value={student.studentName}
                    onChange={(e) => handleChange(e, student.id, 'studentName')}
                />
                </td>
                <td>
                <input
                    type="text"
                    value={student.birthdate}
                    onChange={(e) => handleChange(e, student.id, 'birthdate')}
                />
                </td>
            </tr>
            ))}
        </tbody>
        </table>
        <button onClick={addStudent}>추가</button>
    </div>
    </div> 
    )
}