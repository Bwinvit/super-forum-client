import { useState } from "react";
import "./RedierctPage.css";
import { useLocation, useNavigate } from "react-router-dom";

const RedirectPage = () => {
    let [timerBack, setTimerBack] = useState(3);
    const navigate = useNavigate();

    console.log(useLocation())

    const Redirect = () => {
        navigate(-1);
    };

    const checkTimer = () => {
        if (timerBack > 0) {
            setTimerBack((timerBack -= 1));
        } else {
            Redirect();
        }
    };

    const Timer = () => {
        setInterval(checkTimer, 1000);
    };

    Timer();

    return (
        <div className="wrong-url">
            <h1>Wrong URL</h1>
            <div className="wrong-notation">
                You will be back in <strong>{timerBack}</strong>
            </div>
        </div>
    );
};

export default RedirectPage;
