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
      <h1>Reach4Help Map </h1>
      <p>
        This map is part of <a href="https://reach4help.org">reach4help.org</a>.
        The project is open source and can be{' '}
        <a href="https://github.com/reach4help/reach4help/tree/master/map">
          found on GitHub
        </a>
        . For any enquiries, or to add an organization or group to this map, you
        can reach us as at{' '}
        <a href="mailto:map@reach4help.org">map@reach4help.org</a>.
      </p>
      <p>
        In hopes of helping folks find and join in a mutual aid effort where
        they live, offering inspiration to start your own, and/or simply lifting
        your spirits, below is a growing list of mutual aid pandemic disaster
        care (with the acknowledgment that place-names are a colonial
        imposition). Note: Each project is autonomous and self-organized; they
        all use public links, so be wary of putting info on these links that you
        don’t want to be public too.
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
