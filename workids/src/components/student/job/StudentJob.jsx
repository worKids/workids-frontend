import React from "react";


export default function StudentJob(props) {

  const divStyle = {
    width: "80%",
    borderRadius: "40px",
  };
  const heightStyle = {
    height: "100%",
    borderRadius: "40px",
  };

  

  return (
    <div className="border border-dark  border-3 p-3 h-100" style={divStyle}>
      {props.state === 0 ? (
        <div className="h-100">
          <div className="border border-dark  border-3 p-3" style={heightStyle}>
            
          </div>
        </div>
      ) : (
        <div className="h-100">
          <div className="border border-dark  border-3 p-5" style={heightStyle}>
            
          </div>
        </div>
      )}
    </div>
  );
}
