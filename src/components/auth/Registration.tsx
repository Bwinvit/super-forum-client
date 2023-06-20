import React, { FC, useReducer, useState } from "react";
import UserReducer from "./common/UserReducer";
import ReactModal from "react-modal";
import "./Registration.css";
import PasswordComparison from "./common/PasswordComparision";

export interface RegistrationProps {
  isOpen: boolean;
  onClickToggle: (
    e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => void;
}

const initialState = {
  userName: "Jim",
  password: "",
  email: "admin@getMaxListeners.com",
  passwordConfirm: "",
  resultMsg: "",
};

const Registration: FC<RegistrationProps> = ({ isOpen, onClickToggle }) => {
  const [registerDisabled, setRegisterDisabled] = useState(true);

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const allowRegister = (msg: string, setDisable: boolean) => {
    setRegisterDisabled(setDisable);
    dispatch({ type: "resultMsg", payload: msg });
  };

  const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "userName", payload: e.target.value });
    if (!e.target.value) allowRegister("User name cannot be empty", true);
    else allowRegister("", false);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "mail", payload: e.target.value });
    if (!e.target.value) allowRegister("Mail cannot be empty", true);
    else allowRegister("", false);
  };

  const onClickRegister = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    onClickToggle(e);
  };

  const onClickCancel = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClickToggle(e);
  };

  return (
    <ReactModal
      className={"modal-menu"}
      isOpen={isOpen}
      onRequestClose={onClickToggle}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      <form>
        <div className="reg-inputs">
          <div>
            <label>User Name</label>
            <input
              type="text"
              value={state.userName}
              onChange={onChangeUserName}
            />
          </div>
          <div>
            <label>Email</label>
            <input type="text" value={state.email} onChange={onChangeEmail} />
          </div>
          <div>
            <PasswordComparison
              dispatch={dispatch}
              password={state.password}
              passwordConfirm={state.passwordConfirm}
            />
          </div>
          <div className="reg-buttons">
            <div className="reg-btn-left">
              <button
                style={{ marginLeft: ".5rem" }}
                className="action-btn"
                disabled={registerDisabled}
                onClick={onClickRegister}
              >
                Register
              </button>
              <button
                style={{ margin: ".5rem" }}
                className="cancel-btn"
                onClick={onClickCancel}
              >
                Close
              </button>
            </div>
            <span className="reg-btn-right">
              <strong>{state.resultMsg}</strong>
            </span>
          </div>
        </div>
      </form>
    </ReactModal>
  );
};

export default Registration