import React from 'react';
import './App.css';
import Nav from './components/areas/Nav/Nav';
import SideBar from './components/areas/SideBar/SideBar';
import LeftMenu from './components/areas/LeftMenu/LeftMenu';
import Main from './components/areas/main/Main';
import RightMenu from './components/areas/rightMenu/RightMenu';

function App() {
  return (
    <div className="App">
      <Nav />
      <SideBar />
      <LeftMenu />
      <Main />
      <RightMenu />
    </div>
  );
}

export default App;
