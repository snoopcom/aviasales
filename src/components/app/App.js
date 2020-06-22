import React from 'react';
import Logo from './Logo';
import logo from '../../assets/Logo.png';
import Main from '../main/Main';

function App() {
  return (
    <div className="App">
      <Logo src={logo} alt="logo" />
      <Main />
    </div>
  );
}

export default App;
