import React from 'react';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

const StepTracker: React.FC<IStepTracker> = ({ stepTitles, currentStep }) => (
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

const getStatus = (idx, current) => {
  if (idx === current) {
    return 'active';
  }
  if (idx > current) {
    return 'waiting';
  }
  return 'finished';
};

const StepBox = ({ idx, current, stepsQty, title }) => {
  const status = getStatus(idx, current);

  return (
    <StepBoxWrapper stepsQty={stepsQty}>
      <ProgressDiv>
        <ProgressDot status={status} />
        {idx >= 1 && <ProgressConnector stepsQty={stepsQty} status={status} />}
      </ProgressDiv>
      <StepTitle status={status}>{title}</StepTitle>
    </StepBoxWrapper>
  );
};

const StepColumn = styled.div`
  display: flex;
  flex-direction: row;
`;

const StepBoxWrapper = styled('div')<IStepBoxWrapper>`
  height: 98px;
  width: ${props => `${100 / props.stepsQty}%`};
  background: radial-gradient(${COLORS.primaryDark}, ${COLORS.primary});
`;

const StepTitle = styled('div')<IStepTitle>`
  z-index: 100;
  position: relative;
  top: 50%;
  text-align: center;
  color: ${props =>
    props.status === 'active' ? COLORS.white : COLORS.lightPrimary}};
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
        return COLORS.primaryOrange;
      case 'waiting':
        return COLORS.fadedPrimary;
      case 'finished':
        return COLORS.white;
      default:
        return COLORS.fadedPrimary;
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
        return COLORS.lightPrimary;
      case 'waiting':
        return COLORS.fadedPrimary;
      case 'finished':
        return COLORS.lightPrimary;
      default:
        return COLORS.fadedPrimary;
    }
  }};
`;

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

export interface IStepTracker {
  stepTitles: string[];
  currentStep: number;
}

export default StepTracker;
