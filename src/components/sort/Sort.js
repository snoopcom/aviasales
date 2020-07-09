import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Label, Container, Item } from './Style';

const Sort = (props) => {
  const { onSortChange, cheapChecked, fastChecked } = props;
  const renderSort = (value, id, label, background) => (
    <div>
      <Radio
        value={value}
        id={id}
        type="radio"
        name="sort"
        onChange={(event) => onSortChange(event)}
        checked={background}
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
  return (
    <Container>
      <Item>{renderSort('cheap', 'cheapId', 'Самый дешевый', cheapChecked)}</Item>
      <Item>{renderSort('fast', 'fastId', 'Самый быстрый', fastChecked)}</Item>
    </Container>
  );
};

Sort.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  cheapChecked: PropTypes.bool.isRequired,
  fastChecked: PropTypes.bool.isRequired,
};

export default Sort;
