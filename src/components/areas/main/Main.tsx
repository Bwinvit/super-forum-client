import React, { useState } from "react";
import Registration from "../../auth/Registration";

const Main = () => {
  const [showRegister, setShowRegister] = useState(true);

  const onClickToggleRegister = () => {
    setShowRegister(!showRegister);
  };

  return (
    <main className="content">
      <div>Main</div>
      <Registration
        isOpen={showRegister}
        onClickToggle={onClickToggleRegister}
      />
    </main>
  );
};

export default Main;
