import { FC, useEffect, useReducer } from "react";
import ModalProps from "../types/ModalProps";
import userReducer from "./common/UserReducer";
import { useDispatch } from "react-redux";
import { UserProfileSetType } from "../../store/user/Reducer";
import { allowSubmit } from "./common/Helpers";
import ReactModal from "react-modal";

const Login: FC<ModalProps> = ({ isOpen, onClickToggle }) => {
       const initialState = {
              userName: "",
              password: "",
              resultMsg: "",
              isSubmitDisabled: true,
       };

       const [state, dispatch] = useReducer(userReducer, initialState);

       const reduxDispatch = useDispatch();

       useEffect(() => {
              reduxDispatch({
                     type: UserProfileSetType,
                     payload: { id: 1, userName: "testUser" },
              });
       }, [reduxDispatch]);

       const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: "userName", payload: e.target.value });
              if (!e.target.value)
                     allowSubmit(dispatch, "User name cannot be empty", true);
              else allowSubmit(dispatch, "", false);
       };

       const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: "password", payload: e.target.value });
              if (!e.target.value)
                     allowSubmit(dispatch, "Password cannot be empty", true);
              else allowSubmit(dispatch, "", false);
       };

       const onClickLogin = (
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
                                          <label>Password</label>
                                          <input
                                                 type="password"
                                                 value={state.password}
                                                 onChange={onChangePassword}
                                          />
                                   </div>
                            </div>
                            <div className="form-buttons form-buttons-sm">
                                   <div className="form-btn-left">
                                          <button
                                                 style={{ marginLeft: ".5em" }}
                                                 className="action-btn"
                                                 disabled={state.isSubmitDisabled}
                                                 onClick={onClickLogin}
                                          >
                                                 Login
                                          </button>
                                          <button
                                                 style={{ marginLeft: ".5em" }}
                                                 className="cancel-btn"
                                                 onClick={onClickCancel}
                                          >
                                                 Close
                                          </button>
                                   </div>

                                   <span className="form-btn-left">
                                          <strong>{state.resultMsg}</strong>
                                   </span>
                            </div>
                     </form>
              </ReactModal>
       );
};

export default Login;
