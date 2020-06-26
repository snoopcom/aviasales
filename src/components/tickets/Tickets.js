import React from 'react';
import Sort from '../sort/Sort';
import TicketsItem from './TicketsItem';

const initState = {};

export default class Tickets extends React.Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  render() {
    return (
      <div>
        <Sort />
        <TicketsItem />
      </div>
    );
  }
}
