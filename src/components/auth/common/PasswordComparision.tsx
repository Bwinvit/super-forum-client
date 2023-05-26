import React from "react";
import { allowSubmit } from "./Helpers";
import {
  isPasswordValid,
  PasswordTestResult,
} from "../../../common/validators/PasswordValidators";
import { Dispatch } from "redux";

interface PasswordComparisonProps {
  dispatch: Dispatch<any>;
  password: string;
  passwordConfirm: string;
}

const PasswordComparison: React.FC<PasswordComparisonProps> = ({
  dispatch,
  password,
  passwordConfirm,
}) => {
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "password", payload: e.target.value });
    const passwordCheck: PasswordTestResult = isPasswordValid(e.target.value);

    if (!passwordCheck.isValid) {
      allowSubmit(dispatch, passwordCheck.message, true);
      return;
    }
    passwordSame(passwordConfirm, e.target.value);
  };

  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "passwordConfirm", payload: e.target.value });
    passwordSame(passwordConfirm, e.target.value);
  };

  const passwordSame = (passwordVal: string, passwordConfirmVal: string) => {
    if (passwordVal !== passwordConfirmVal) {
      allowSubmit(dispatch, "Password do not match", true);
      return false;
    } else {
      allowSubmit(dispatch, "", false);
      return true;
    }
  };

  return (
    <>
      <div>
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div>
        <label>Password Confirmation</label>
        <input
          type="password"
          placeholder="Password Confirmation"
          value={passwordConfirm}
          onChange={onChangePasswordConfirm}
        />
      </div>
    </>
  );
};

export default PasswordComparison