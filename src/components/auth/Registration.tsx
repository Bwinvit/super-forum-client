import React, { FC, useReducer, useState } from "react";
import UserReducer from "./common/UserReducer";
import {
  PasswordTestResult,
  isPasswordValid,
} from "../../common/validators/PasswordValidators";
import ReactModal from "react-modal";
import "./Registration.css";

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

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "password", payload: e.target.value });
    const passwordCheck: PasswordTestResult = isPasswordValid(e.target.value);
    if (!passwordCheck.isValid) {
      allowRegister(passwordCheck.message, true);
      return;
    }
    passwordsSame(state.passwordConfirm, e.target.value);
  };

  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "passwordConfirm", payload: e.target.value });
    passwordsSame(state.password, e.target.value);
  };

  const passwordsSame = (passwordVal: string, passwordConfirmVal: string) => {
    if (passwordVal !== passwordConfirmVal) {
      allowRegister("Password do not match", true);
      return false;
    } else {
      allowRegister("", false);
      return true;
    }
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
            <label>Password</label>
            <input
              type="password"
              value={state.password}
              onChange={onChangePassword}
              placeholder="Password"
            />
          </div>
          <div>
            <label>Password Confirm</label>
            <input
              type="password"
              value={state.passwordConfirm}
              onChange={onChangePasswordConfirm}
              placeholder="Password Confirmation"
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