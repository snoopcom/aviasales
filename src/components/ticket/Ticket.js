import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { formatDuration, formatInterval, formatPrice } from '../../api/Utils';
import {
  Item,
  Price,
  CarrierLogo,
  Header,
  ListSegment,
  ItemSegment,
  HeaderSegment,
  DataSegment,
} from './Style';

const Ticket = (props) => {
  const { price, carrier, segments } = props;

  /* количество пересадок */
  const quantityStops = (stops) => {
    if (stops === 3) {
      return <div>3 пересадки</div>;
    }
    if (stops === 2) {
      return <div>2 пересадки</div>;
    }
    if (stops === 1) {
      return <div>1 пересадка</div>;
    }
    if (stops === 0) {
      return <div>Без пересадок</div>;
    }
    return true;
  };

  const renderList = segments.map((segment) => (
    <ListSegment key={_.uniqueId()}>
      <ItemSegment>
        <HeaderSegment>{`${segment.origin} - ${segment.destination}`}</HeaderSegment>
        <DataSegment>{formatInterval(segment.date, segment.duration)}</DataSegment>
      </ItemSegment>
      <ItemSegment>
        <HeaderSegment>В пути</HeaderSegment>
        <DataSegment>{formatDuration(segment.duration)}</DataSegment>
      </ItemSegment>
      <ItemSegment>
        <HeaderSegment>{quantityStops(segment.stops.length)}</HeaderSegment>
        <DataSegment>{segment.stops.join(', ')}</DataSegment>
      </ItemSegment>
    </ListSegment>
  ));

  return (
    <Item>
      <Header>
        <Price>{formatPrice(price)}</Price>
        <CarrierLogo>
          <img src={`//pics.avs.io/99/36/${carrier}.png`} alt={`${carrier}`} />
        </CarrierLogo>
      </Header>
      {renderList}
    </Item>
  );
};

Ticket.propTypes = {
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,
  segments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Ticket;
