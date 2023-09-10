import React from "react";

export default function MainPage() {
  return (
    <div>
      <h1>메인 페이지</h1>
      <div className="d-flex">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Default radio
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            checked
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Default checked radio
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            aria-label="First name"
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            aria-label="Last name"
          />
        </div>
      </div>
    </div>
  );
}
