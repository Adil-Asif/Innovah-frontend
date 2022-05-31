import React from "react";
import "./Input.scss";


const Input = (props) => {
  const onChange = (event) => {
    props.parentCallback(event.target.value);
  };

  return (
    <div className="form">
      <input
        type={props.type || "text"}
        id={props.id || ""}
        onChange={onChange}
        // eslint-disable-next-line no-useless-escape
        pattern={props.pattern}
        className="form__input"
        autoComplete="off"
        placeholder=" "
      />

      <label for={props.id || ""} className="form__label">
        {props.label || ""}
      </label>
    </div>
  );
};

export default Input;
