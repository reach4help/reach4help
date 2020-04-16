import React from 'react';

import { MARKER_TYPES, MarkerType, SERVICES } from '../data';
import styled from '../styling';

interface Props {
  className?: string;
  type: MarkerType;
}

const MarkerTypeDisplay = ({ className, type }: Props) => {
  const services = type.type === 'org' ? type.services : false;
  return (
    <div className={`${className} ${services ? 'services' : ''}`}>
      <span
        style={{
          backgroundColor: MARKER_TYPES[type.type].color,
        }}
      >
        <span className="label">{MARKER_TYPES[type.type].label}</span>
        {services && (
          <span className="services">
            {services.map(service => (
              <span
                key={service}
                style={{
                  backgroundColor: SERVICES[service].color,
                }}
              >
                {SERVICES[service].label}
              </span>
            ))}
          </span>
        )}
      </span>
    </div>
  );
};

export default styled(MarkerTypeDisplay)`
  display: flex;
  flex-wrap: wrap;
  margin: ${p => p.theme.spacingPx / 2}px -${p => p.theme.spacingPx / 4}px -${p =>
      p.theme.spacingPx / 2}px;

  > span {
    margin: ${p => p.theme.spacingPx / 4}px;
    padding: 3px 5px;
    color: #fff;
    border-radius: 3px;
    font-size: 0.8rem;
    font-weight: 600;
    opacity: 0.8;
  }

  &.services {
    > span {
      display: flex;
      flex-direction: column;
      padding: 3px 2px;

      > .label {
        padding: ${p => p.theme.spacingPx / 4}px;
      }
      .services {
        display: inline-flex;
        flex-wrap: wrap;
        span {
          margin: ${p => p.theme.spacingPx / 4}px;
          padding: 3px 5px;
          color: #fff;
          border-radius: 3px;
          font-size: 0.8rem;
          font-weight: 600;
          border: 2px solid #fff;
        }
      }
    }
  }
`;
