import React from 'react';
import { Filter } from 'src/data';
import styled from '../styling';

import Filters, { FilterMutator } from './filters';

interface Props {
  className?: string;
  filter: Filter;
  updateFilter: (mutator: FilterMutator) => void;
}

const Header = (props: Props) => {
  const { className, filter, updateFilter } = props;
  return (
    <header className={className}>
      <h1>Reach4Help Map</h1>
      <p>
        This map is part of <a href="https://reach4help.org">reach4help.org</a>.
        It aims to list and detail all of the organizations, groups and
        companies around the world that are available to help those in need
        during the COVID-19 crisis.
      </p>
      <p>
        This project is open source and can be{' '}
        <a href="https://github.com/reach4help/reach4help/tree/master/map">
          found on GitHub
        </a>
        . For any enquiries, or to add an organization or group to this map, you
        can reach us as at{' '}
        <a href="mailto:map@reach4help.org">map@reach4help.org</a>.
      </p>
      <Filters
        className="filters"
        filter={filter}
        updateFilter={updateFilter}
      />
    </header>
  );
};

export default styled(Header)`
  color: #333;
  padding: ${p => p.theme.spacingPx}px;

  > h1 {
    margin: 0;
    padding: 0 0 ${p => p.theme.spacingPx}px;
  }

  > p {
    margin: 0;
    padding: 0 0 ${p => p.theme.spacingPx}px;
  }
`;
