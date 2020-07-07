import React from 'react';
import _ from 'lodash';
import { getData, getSearchId } from '../../api/DataRequest';
import { cutArray } from '../../api/Utils';
import Ticket from '../ticket/Ticket';
import Sort from '../sort/Sort';
import Filter from '../filter/Filter';
import { BlockСontrol, BlockSort, List } from './Style';

const initState = {
  arrTickets: [],
  allStops: true,
  noStops: true,
  oneStop: true,
  twoStops: true,
  threeStops: true,
};

export default class Tickets extends React.Component {
  constructor(props) {
    super(props);
    this.state = initState;

    /* загружаем страницу */
    this.onLoadPage = async () => {
      const serchId = await getSearchId();
      await this.onLoadTickets(serchId);
    };

    /* загружаем пачку тикетов */
    this.onLoadTickets = async (serchId) => {
      const { arrTickets } = this.state;
      let stop;
      try {
        const response = await getData(serchId);
        stop = response.data.stop;

        const allTickets = response.data.tickets;
        this.setState({
          arrTickets: [...arrTickets, ...allTickets],
        });
        if (!stop) {
          await this.onLoadTickets(serchId);
        }
      } catch (event) {
        await this.onLoadTickets(serchId); // попрежнему выполняем запрос если !stop
      }
    };

    /* сортировка на самый быстрый/дешевый */
    this.onSortChange = (event) => {
      if (event.target.value === 'fast') {
        this.setState((prevState) => ({
          arrTickets: prevState.arrTickets.sort(
            (first, second) =>
              first.segments[0].duration +
              first.segments[1].duration -
              (second.segments[0].duration + second.segments[1].duration)
          ),
        }));
      } else {
        this.setState((prevState) => ({
          arrTickets: prevState.arrTickets.sort((first, second) => first.price - second.price),
        }));
      }
    };

    /* филтруем по чексбоксам */
    this.onFilterCheck = (evt, stops) => {
      if (stops === 'allStops') {
        this.setState((prevState) => ({
          noStops: !prevState.allStops,
          oneStop: !prevState.allStops,
          twoStops: !prevState.allStops,
          threeStops: !prevState.allStops,
          allStops: !prevState.allStops,
        }));
      } else {
        this.setState((prevState) => ({
          [stops]: !prevState[stops],
        }));
      }
    };

    /* фильтруем по пересадкам */
    this.filterTikets = () => {
      const { noStops, oneStop, twoStops, threeStops, arrTickets } = this.state;
      const checkedStops = [noStops, oneStop, twoStops, threeStops];
      const filtered = arrTickets.filter((ticket) => {
        const { stops } = ticket.segments[0];
        return checkedStops[stops.length];
      });
      return filtered; // вернули отфильтрованный массив
    };
  }

  componentDidMount() {
    this.onLoadPage();
  }

  render() {
    const { noStops, oneStop, twoStops, threeStops, allStops } = this.state;
    const firstFiveTickets = cutArray(this.filterTikets(), 5); // первых пять билетов

    /* список билетов */
    const ticketsList = firstFiveTickets.map((ticket) => (
      <Ticket
        key={_.uniqueId()}
        segments={ticket.segments}
        price={ticket.price}
        carrier={ticket.carrier}
      />
    ));
    return (
      <BlockСontrol>
        <Filter
          allStops={allStops}
          noStops={noStops}
          oneStop={oneStop}
          twoStops={twoStops}
          threeStops={threeStops}
          onFilterCheck={this.onFilterCheck}
        />
        <BlockSort>
          <Sort onSortChange={this.onSortChange} />
          <List>{ticketsList}</List>
        </BlockSort>
      </BlockСontrol>
    );
  }
}
