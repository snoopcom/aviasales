import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Label, Container, Item } from './Style';

const Sort = (props) => {
  const { onSortChange } = props;

  const SortButton = (value, id, label) => (
    <div>
      <Radio
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
      <Item>{SortButton('cheap', 'cheapId', 'Самый дешевый')}</Item>
      <Item>{SortButton('fast', 'fastId', 'Самый быстрый')}</Item>
    </Container>
  );
};

Sort.propTypes = {
  onSortChange: PropTypes.func.isRequired,
};

export default Sort;
