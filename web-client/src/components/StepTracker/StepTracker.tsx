import React from 'react';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

const StepTracker: React.FC<IStepTracker> = ({
  stepTitles,
  currentStep,
  colors = {
    backgroundGradient: [COLORS.primaryDark, COLORS.primary],
    active: COLORS.primaryOrange,
    waiting: '#ab57a4',
    finished: '#cc9bc7',
  },
}) => {
  const getStatus = (idx, current) => {
    if (idx === current) {
      return 'active';
    }
    if (idx > current) {
      return 'waiting';
    }
    return 'finished';
  };

  const StepColumn = styled.div`
    display: flex;
    flex-direction: row;
  `;

  const StepBox = ({ idx, current, stepsQty, title }) => {
    const status = getStatus(idx, current);

    return (
      <StepBoxWrapper stepsQty={stepsQty}>
        <ProgressDiv>
          <ProgressDot status={status} />
          {idx >= 1 && (
            <ProgressConnector stepsQty={stepsQty} status={status} />
          )}
        </ProgressDiv>
        <StepTitle status={status}>{title}</StepTitle>
      </StepBoxWrapper>
    );
  };

  const StepBoxWrapper = styled('div')<IStepBoxWrapper>`
    height: 98px;
    width: ${props => `${100 / props.stepsQty}%`};
    background: radial-gradient(
      ${colors.backgroundGradient[0]},
      ${colors.backgroundGradient[1]}
    );
  `;

  const StepTitle = styled('div')<IStepTitle>`
    z-index: 100;
    position: relative;
    top: 50%;
    text-align: center;

    color: ${props =>
      props.status === 'active' ? COLORS.white : colors.finished}};
  `;

  const ProgressDiv = styled.div`
    position: relative;
    top: 50%;
    left: 50%;
    margin-left: -5px;
  `;

  const ProgressDot = styled('span')<IProgressDot>`
    width: 10px;
    height: 10px;
    z-index: 100;
    border-radius: 50%;
    position: absolute;
    bottom: 5px;

    background: ${props => {
      switch (props.status) {
        case 'active':
          return colors.active;
        case 'waiting':
          return colors.waiting;
        case 'finished':
          return COLORS.white;
        default:
          return colors.waiting;
      }
    }};
  `;

  const ProgressConnector = styled('span')<IProgressConnector>`
    position: absolute;
    bottom: 10px;
    z-index: 100;
    height: 1px;

    width: ${props => `${(100 * (props.stepsQty - 1)) / props.stepsQty}%`};
    margin-left: ${props =>
      `-${(100 * (props.stepsQty - 1) + 100 / (props.stepsQty - 1)) /
        props.stepsQty}%`};
    background: ${props => {
      switch (props.status) {
        case 'active':
          return colors.finished;
        case 'waiting':
          return colors.waiting;
        case 'finished':
          return colors.finished;
        default:
          return colors.waiting;
      }
    }};
  `;
  return (
    <StepColumn>
      {stepTitles.map((title, idx) => (
        <StepBox
          key={idx}
          idx={idx}
          stepsQty={stepTitles.length}
          current={currentStep}
          title={title}
        />
      ))}
    </StepColumn>
  );

  interface IStepBoxWrapper {
    stepsQty: number;
  }

  interface IStepTitle {
    status: 'active' | 'waiting' | 'finished';
  }

  interface IProgressDot {
    status: 'active' | 'waiting' | 'finished';
  }

  interface IProgressConnector {
    status: 'active' | 'waiting' | 'finished';
    stepsQty: number;
  }
};

export interface IStepTracker {
  stepTitles: string[];
  currentStep: number;
  colors?: {
    backgroundGradient: string[];
    active: string;
    waiting: string;
    finished: string;
  };
}

export default StepTracker;
