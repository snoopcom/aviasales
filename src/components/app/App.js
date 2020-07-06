import React from 'react';
import { Main, Logo } from './Style';
import logo from '../../assets/Logo.png';
import Tickets from '../tickets/Tickets';

const App = () => {
  return (
    <div>
      <Logo src={logo} alt="logo" />
      <Main>
        <Tickets />
      </Main>
    </div>
  );
};

export default App;
