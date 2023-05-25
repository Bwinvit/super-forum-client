import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setUserProfile } from "../../../store/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRegistered, faUser } from "@fortawesome/free-solid-svg-icons";
import "./SideBarMenus.css";

const SideBarMenus = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setUserProfile({
        userId: 1,
        userName: "testUser",
      })
    );
  }, [dispatch]);

  return (
    <>
      <ul>
        <li>
          <FontAwesomeIcon icon={faUser} />
          <span className="menu-name">{user?.userName}</span>
        </li>
        <li>
            <FontAwesomeIcon icon={faRegistered} />
            <span className="menu-name">register</span>
        </li>
      </ul>
    </>
  );
};

export default SideBarMenus;
