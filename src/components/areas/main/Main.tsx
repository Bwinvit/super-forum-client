import React from "react";
import getTimePassIfLessThanDay from "../../../common/dates";

const Main = () => {

    const test = getTimePassIfLessThanDay(new Date("2023-05-25T12:50:00"))
    console.log(test)
  
    return (
        <main className="content">
            <div>Main</div>
        </main>
    )
};

export default Main;
