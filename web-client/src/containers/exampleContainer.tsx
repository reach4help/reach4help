import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'src/components/Button/Buttons';
import { NOTIFICATION_TYPE, showNotification } from 'src/utils/notifications';

import { AppState } from '../store';
import { decrementAction, incrementAction, incrementAsyncAction, sumAction } from '../store/example/actions';

const ExampleContainer: React.FC = () => {
  const value = useSelector((state: AppState) => state.exampleReducer.value);
  const dispatch = useDispatch();

  const increment = useCallback(
    () => dispatch(incrementAction),
    [dispatch],
  );

  const incrementAsync = useCallback(
    () => dispatch(incrementAsyncAction()),
    [dispatch],
  );

  const decrement = useCallback(
    () => dispatch(decrementAction),
    [dispatch],
  );

  const sum = useCallback(
    val => dispatch(sumAction(val)),
    [dispatch],
  );

  const TestToast = () => <div>
    Test
    <button type="button">Test</button>
  </div>;

  return (
    <div>
      {value}
      <Button type="button" color="#0F0" onClick={increment}>Increment</Button>
      <Button type="button" onClick={incrementAsync}>Increment with Delay</Button>
      <Button type="button" onClick={() => sum(5)}>Add 5</Button>
      <Button type="button" color="#F00" onClick={decrement}>Decrement</Button>
      <Button type="button" onClick={() => showNotification(NOTIFICATION_TYPE.ERROR, 'test', <TestToast />)}>Toast</Button>
    </div>
  );
};

ExampleContainer.propTypes = {
};

export default ExampleContainer;
