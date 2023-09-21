import React, { useState } from "react";

export default function AuctionSeat() {
  const [rows, setRows] = useState(8);
  const [cols, setCols] = useState(4);
  const [seats, setSeats] = useState([]);
  const totalseat = 26;
  const generateSeats = () => {
    // rows와 cols에 따라 자리 생성 로직을 작성하세요.
    // 예를 들어, 2줄 3열의 자리를 만드는 로직을 추가합니다.
    const generatedSeats = [];
    let seatNum = 1;
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        if (seatNum <= totalseat) {
          row.push(seatNum);
          seatNum += 1;
        } else row.push(null);
      }
      generatedSeats.push(row);
    }

    setSeats(generatedSeats);
  };

  return (
    <div>
      <div className="border">
        <div className="d-flex w-50 border justify-content-center">칠판</div>
        <br />
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="d-flex justify-content-around">
            {row.map((seat, colIndex) => (
              <div key={colIndex} className="d-flex w-25 justify-content-center mx-3 border">
                {seat}{" "}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <label>Rows:</label>
        <input type="number" value={rows} onChange={(e) => setRows(e.target.value)} />
      </div>
      <div>
        <label>Columns:</label>
        <input type="number" value={cols} onChange={(e) => setCols(e.target.value)} />
      </div>
      <button onClick={generateSeats}>Generate Seats</button>
    </div>
  );
}
