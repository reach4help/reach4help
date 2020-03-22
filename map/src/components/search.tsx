import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  updateSearchInput: (input: HTMLInputElement | null) => void;
}

class Search extends React.Component<Props, {}> {

  public render() {
    const { className, updateSearchInput} = this.props;
    return (
      <input
        className={className}
        ref={updateSearchInput}
        type='text'
      />
    );
  }
}

export default styled(Search)`
`;

