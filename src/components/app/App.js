import React from 'react';
import Logo from './Logo';
import logo from '../../assets/Logo.png';
import Main from './Main';
import BlockFilter from '../filter/BlockFilter';
import Tickets from '../tickets/Tickets';
import Filter from '../filter/Filter';
import BlockTickets from '../tickets/BlockTickets';

function App() {
  return (
    <div>
      <Logo src={logo} alt="logo" />
      <Main>
        <BlockFilter>
          <Filter />
        </BlockFilter>
        <BlockTickets>
          <Tickets />
        </BlockTickets>
      </Main>
    </div>
  );
}

export default App;
