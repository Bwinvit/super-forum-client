import { useState } from "react";
import { useAppSelector } from "../../../store/hooks";
// import { setUserProfile } from "../../../store/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRegistered,
    faSignInAlt,
    faSignOutAlt,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./SideBarMenus.css";
// import { Link } from "react-router-dom";
import Registration from "../../auth/Registration";
import Login from "../../auth/Login";
import Logout from "../../auth/Logout";
import { Link } from "react-router-dom";

const SideBarMenus = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const user = useAppSelector((state) => state.user);

    const onClickToggleRegister = () => {
        setShowRegister(!showRegister);
    };

    const onClickToggleLogin = () => {
        setShowLogin(!showLogin);
    };

    const onClickToggleLogout = () => {
        setShowLogout(!showLogout);
    };

    return (
        <>
            <ul>
                {user.userName ? (
                    <li>
                        <FontAwesomeIcon icon={faUser} />
                        <span className="menu-name">
                            <Link
                                to={`/userprofile/${user?.id}`}
                                style={{ textDecoration: "none" }}
                            >
                                {user?.userName}
                            </Link>
                        </span>
                    </li>
                ) : null}

                {user.userName ? null : (
                    <li>
                        <FontAwesomeIcon icon={faRegistered} />
                        <span
                            onClick={onClickToggleRegister}
                            className="menu-name"
                        >
                            register
                        </span>
                        <Registration
                            isOpen={showRegister}
                            onClickToggle={onClickToggleRegister}
                        />
                    </li>
                )}

                {user.userName ? null : (
                    <li>
                        <FontAwesomeIcon icon={faSignInAlt} />
                        <span
                            onClick={onClickToggleLogin}
                            className="menu-name"
                        >
                            login
                        </span>
                        <Login
                            isOpen={showLogin}
                            onClickToggle={onClickToggleLogin}
                        />
                    </li>
                )}

                {user.userName ? (
                    <li>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span
                            onClick={onClickToggleLogout}
                            className="menu-name"
                        >
                            logout
                        </span>
                        <Logout
                            isOpen={showLogout}
                            onClickToggle={onClickToggleLogout}
                        />
                    </li>
                ) : null}
            </ul>
        </>
    );
};

export default SideBarMenus;
