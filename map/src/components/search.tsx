import React from 'react';
import styled from '../styling';

interface Props {
  className?: string;
  updateSearchInput: (input: HTMLInputElement | null) => void;
}

class Search extends React.Component<Props, {}> {
  public render() {
    const { className, updateSearchInput } = this.props;
    return (
      <div className={className}>
        <input
          ref={updateSearchInput}
          type="text"
          placeholder="Jump to a location on the map..."
        />
      </div>
    );
  }
}

export default styled(Search)`
  input {
    color: #333;
    box-sizing: border-box;
    width: 500px;
    max-width: 100%;
    flex-grow: 1;
    background: #fff;
    border: 0;
    outline: none;
    font-size: 16px;
    padding: 11px 10px;
    border-radius: 2px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  }
`;
