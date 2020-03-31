import React from 'react';

import { Service, SERVICES } from '../data';
import styled from '../styling';

interface Props {
  className?: string;
  services: Service[];
}

const Services = ({ className, services }: Props) => (
  <div className={className}>
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
  </div>
);

export default styled(Services)`
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
`;
