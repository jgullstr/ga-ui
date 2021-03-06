
import React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) =>
  <li>{value}</li>
);

const SortableList = SortableContainer(({items, disabled}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem disabled={disabled} key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

export default SortableList;