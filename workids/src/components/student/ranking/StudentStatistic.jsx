import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userAtoms";
import { useNavigate } from "react-router-dom";
import { axBase } from "../../../apis/axiosInstance";
import "../../../index.css";
export default function StudentStatistic() {
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();
  const [monthData, setMonthData] = useState([]);
  const [selectMonth, setSelectMonth] = useState("");
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [asset, setAsset] = useState([]);
  const [expend, setExpend] = useState([]);
  const [assetState, setAssetState] = useState({
    series: [],
    options: {
      chart: {
        fontFamily: "KCC-Ganpan",
        type: "pie",
      },
      labels: [],
      title: {
        text: "자산 비율",
        align: "center",
      },
    },
  });
  const [expendState, setExpendState] = useState({
    series: [],
    options: {
      chart: {
        type: "pie",
      },
      labels: [],
      title: {
        text: "자산 비율",
        align: "center",
      },
    },
  });

  // 화면 첫 렌더링
  useEffect(() => {
    console.log("1실행");
    const token = userData.accessToken;
    if (!token) {
      navigate("/");
      return;
    }
    axBase(token)({
      method: "post",
      url: "/student/statistic",
      data: {
        nationStudentNum: userData.nationStudentNum,
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setAsset(response.data.data.asset);
        setExpend(response.data.data.expend);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

    axBase(token)({
      method: "post",
      url: "/nation/month",
      data: {
        nationNum: userData.nationNum,
      },
    })
      .then((response) => {
        console.log(response.data.data.month);
        setMonthData(response.data.data.month);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    console.log("assetPercent", asset);
    if (!loading && asset) {
      console.log("2실행");
      const assetUpdate = {
        series: asset.percent,
        options: {
          chart: {
            type: "pie",
          },
          labels: asset.menu,
          title: {
            text: "자산 비율",
            align: "center",
          },
        },
      };
      const expendUpdate = {
        series: expend.percent,
        options: {
          chart: {
            type: "pie",
          },
          labels: expend.menu,
          title: {
            text: "자산 비율",
            align: "center",
          },
        },
      };
      setAssetState(assetUpdate);
      setExpendState(expendUpdate);
      setLoading2(false);
    }
  }, [loading, asset]);
  const handleChange = (e) => {
    setSelectMonth(e.target.value);
  };
  return (
    <div>
      {loading2 ? (
        <div>로딩 중</div>
      ) : (
        <div>
          <div className="row">
            <div className="col-2 d-flex flex-row-reverse">
              <select
                className="form-select "
                aria-label="Default select example"
                value={selectMonth}
                onChange={handleChange}
              >
                <option value="" selected>
                  선택
                </option>
                {monthData.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row m-auto">
            <div className="col-3 w-25" style={{ height: "500px" }}>
              <Chart
                options={assetState.options}
                series={assetState.series}
                type="pie"
                width="300"
              />
            </div>
            <div className="col-3">
              <Chart
                options={expendState.options}
                series={expendState.series}
                type="pie"
                width="300"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
