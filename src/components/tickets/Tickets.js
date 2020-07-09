import React from 'react';
import _ from 'lodash';
import { getData, getSearchId } from '../../api/DataRequest';
import { cutArray } from '../../api/Utils';
import Ticket from '../ticket/Ticket';
import Sort from '../sort/Sort';
import Filter from '../filter/Filter';
import { Wrapper, Container, List } from './Style';

const initState = {
  arrTickets: [],
  allStops: true,
  noStops: true,
  oneStop: true,
  twoStops: true,
  threeStops: true,
  sorting: true,
  cheapChecked: true,
  fastChecked: false,
};

export default class Tickets extends React.Component {
  constructor(props) {
    super(props);
    this.state = initState;

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
          cheapChecked: false,
          fastChecked: true,
        }));
      } else {
        this.setState((prevState) => ({
          arrTickets: prevState.arrTickets.sort((first, second) => first.price - second.price),
          cheapChecked: true,
          fastChecked: false,
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

        const { state } = this;
        const { noStops, oneStop, twoStops, threeStops } = state;

        const prevCheckboxStatus = {
          noStops,
          oneStop,
          twoStops,
          threeStops,
        };
        const currentCheckBoxesStatus = {
          ...prevCheckboxStatus,
          [stops]: !state[stops],
        };

        const trueAllChecked = !Object.values(currentCheckBoxesStatus).includes(false);

        if (trueAllChecked) {
          this.setState({
            allStops: true,
          });
        } else {
          this.setState({
            allStops: false,
          });
        }
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

  /* сразу загружаем самые дешевые */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.arrTickets.length === 0) {
      const event = {
        target: {
          value: null,
        },
      };
      this.onSortChange(event);
    }
  }

  /* загружаем страницу */
  onLoadPage = async () => {
    const serchId = await getSearchId();
    await this.onLoadTickets(serchId);
  };

  /* загружаем пачку тикетов */
  onLoadTickets = async (serchId) => {
    const { arrTickets } = this.state;
    let stop;
    try {
      const response = await getData(serchId);
      stop = response.data.stop;

      const allTickets = response.data.tickets.map((ticket) => ({ ...ticket, id: _.uniqueId() }));
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

  render() {
    const {
      noStops,
      oneStop,
      twoStops,
      threeStops,
      allStops,
      cheapChecked,
      fastChecked,
    } = this.state;
    const firstFiveTickets = cutArray(this.filterTikets(), 5); // первых пять билетов

    /* список билетов */
    const renderTickets = firstFiveTickets.map((ticket) => (
      <Ticket
        id={ticket.id}
        key={ticket.id}
        price={ticket.price}
        carrier={ticket.carrier}
        segments={ticket.segments}
      />
    ));
    return (
      <Wrapper>
        <Filter
          allStops={allStops}
          noStops={noStops}
          oneStop={oneStop}
          twoStops={twoStops}
          threeStops={threeStops}
          onFilterCheck={this.onFilterCheck}
        />
        <Container>
          <Sort
            cheapChecked={cheapChecked}
            fastChecked={fastChecked}
            onSortChange={this.onSortChange}
          />
          <List>{renderTickets}</List>
        </Container>
      </Wrapper>
    );
  }
}
