import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Label, Container, Item } from './Style';

const Sort = (props) => {
  const { onSortChange } = props;

  const renderSort = (value, id, label, sorting) => (
    <div>
      <Radio
        checked={sorting}
        value={value}
        id={id}
        name="sort"
        type="radio"
        onChange={(event) => onSortChange(event)}
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
  return (
    <Container>
      <Item>{renderSort('cheap', 'cheapId', 'Самый дешевый', true)}</Item>
      <Item>{renderSort('fast', 'fastId', 'Самый быстрый', false)}</Item>
    </Container>
  );
};

Sort.propTypes = {
  onSortChange: PropTypes.func.isRequired,
};

export default Sort;
