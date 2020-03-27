import React from 'react';
import { MdClose } from 'react-icons/md';

import styled from '../styling';

interface Props {
  className?: string;
  open: boolean;
  setAddInstructionsOpen: (open: boolean) => void;
}

class AddInstructions extends React.Component<Props, {}> {
  private close = () => {
    const { setAddInstructionsOpen } = this.props;
    setAddInstructionsOpen(false);
  };

  public render() {
    const { className, open } = this.props;
    return (
      <div className={`${className} ${open ? 'open' : ''}`}>
        <div className="shadow" onClick={this.close} />
        <div className="box">
          <div className="top">
            <h2>Add information to this map</h2>
            <button onClick={this.close} type="button">
              <MdClose size={24} />
            </button>
          </div>
          <p>
            We rely on volunteer contributors to keep the information on this
            map as complete and up-to-date as possible. If you would like to
            help us by contributing information, either adding new projects or
            correcting information, there are a couple of different ways you may
            do so:
          </p>
          <ul>
            <li>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSd4rbN_UPk3RW3a_9sIbBmdv6pH30jqzWKv8Hem9YDRr-uAfQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fill out our information form
              </a>
            </li>
            <li>
              <a
                href="https://github.com/reach4help/reach4help/tree/master/map/src/data"
                target="_blank"
                rel="noopener noreferrer"
              >
                Update the information yourself on GitHub
              </a>
            </li>
          </ul>
          <p>
            If you have any questions, you can reach us as at{' '}
            <a
              href="mailto:map@reach4help.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              map@reach4help.org
            </a>
            .
          </p>
        </div>
      </div>
    );
  }
}

export default styled(AddInstructions)`
  z-index: 1000;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;

  &.open {
    opacity: 1;
    pointer-events: all;
  }

  > .shadow {
    z-index: 1000;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  > .box {
    z-index: 1100;
    margin: ${p => p.theme.spacingPx}px;
    max-width: 600px;
    max-height: 100%;
    max-height: calc(100% - ${p => p.theme.spacingPx * 4}px);
    background: #fff;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.5) 0 1px 6px -1px;
    background: #fff;
    padding: ${p => p.theme.spacingPx}px;
    overflow-y: auto;

    .top {
      display: flex;
      align-items: start;

      h2 {
        margin: 0;
        padding: 0;
        flex-grow: 1;
        flex-basis: 0;
      }

      button {
        padding: 0;
        margin: 0;
        border: 0;
        background: 0;
        cursor: pointer;
        color: ${p => p.theme.textColor};

        &:hover {
          color: ${p => p.theme.textColorLight};
        }
      }
    }
  }
`;
