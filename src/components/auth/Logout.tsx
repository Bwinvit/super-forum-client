import React, { FC } from "react";
import ReactModal from "react-modal";
import ModalProps from "../types/ModalProps";
import "./Logout.css";
import { useAppSelector } from "../../store/hooks";
import { useMutation, gql } from "@apollo/client";
import useRefreshReduxMe, { Me } from "../../hook/useRefreshReduxMe";

const LogoutMutation = gql`
    mutation Logout($userName: String!) {
        logout(userName: $userName)
    }
`;

const Logout: FC<ModalProps> = ({ isOpen, onClickToggle }) => {
    const user = useAppSelector((state) => state.user);
    const [execLogout] = useMutation(LogoutMutation, {
        refetchQueries: [
            {
                query: Me,
            },
        ],
    });
    const { deleteMe } = useRefreshReduxMe();

    const onClickLogin = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        onClickToggle(e);
        await execLogout({
            variables: {
                userName: user.userName ?? "",
            },
        });
        deleteMe();
    };

    const onClickCancel = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        onClickToggle(e);
    };

    return (
        <ReactModal
            className="modal-menu"
            isOpen={isOpen}
            onRequestClose={onClickToggle}
            shouldCloseOnOverlayClick={true}
            ariaHideApp={false}
        >
            <form>
                <div className="logout-inputs">
                    Are you sure you want to logout?
                </div>
                <div className="form-buttons form-buttons-sm">
                    <div className="form-btn-left">
                        <button
                            style={{ marginLeft: ".5em" }}
                            className="action-btn"
                            onClick={onClickLogin}
                        >
                            Logout
                        </button>
                        <button
                            style={{ marginLeft: ".5em" }}
                            className="cancel-btn"
                            onClick={onClickCancel}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </form>
        </ReactModal>
    );
};

export default Logout;
