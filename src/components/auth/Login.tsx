import { FC, useReducer } from "react";
import ModalProps from "../types/ModalProps";
import userReducer from "./common/UserReducer";
// import { UserProfileSetType } from "../../store/user/Reducer";
import { allowSubmit } from "./common/Helpers";
import ReactModal from "react-modal";
import { gql, useMutation } from "@apollo/client";
import useRefreshReduxMe, { Me } from "../../hook/useRefreshReduxMe";
// import { setUserProfile } from "../../store/user/userSlice";

const LoginMutation = gql`
       mutation Login($userName: String!, $password: String!) {
              login(userName: $userName, password: $password) 
       }
`

const Login: FC<ModalProps> = ({ isOpen, onClickToggle }) => {
       const [ execLogin ] = useMutation(LoginMutation, {
              refetchQueries: [
                     {
                            query: Me
                     }
              ]
       })

       const [
              { userName, password, resultMsg, isSubmitDisabled },
              dispatch
       ] = useReducer(userReducer, {
              userName: "tester",
              password: "Test123!@#",
              resultMsg: "",
              isSubmitDisabled: false,
       })

       const { execMe, updateMe } = useRefreshReduxMe()

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

       const onClickLogin = async (
              e: React.MouseEvent<HTMLButtonElement, MouseEvent>
       ) => {
              e.preventDefault();
              onClickToggle(e);
              const result = await execLogin({
                     variables: {
                            userName,
                            password
                     }
              })
              console.log("Login", result)
              execMe()
              updateMe()
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
                                                 value={userName}
                                                 onChange={onChangeUserName}
                                          />
                                   </div>
                                   <div>
                                          <label>Password</label>
                                          <input
                                                 type="password"
                                                 value={password}
                                                 onChange={onChangePassword}
                                          />
                                   </div>
                            </div>
                            <div className="form-buttons form-buttons-sm">
                                   <div className="form-btn-left">
                                          <button
                                                 style={{ marginLeft: ".5em" }}
                                                 className="action-btn"
                                                 disabled={isSubmitDisabled}
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
                                          <strong>{resultMsg}</strong>
                                   </span>
                            </div>
                     </form>
              </ReactModal>
       );
};

export default Login;
