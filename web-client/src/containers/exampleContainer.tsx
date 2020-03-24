import { Button } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

  return (
    <div>
      {value}
      <Button type="primary" color="#0F0" onClick={increment}>Increment</Button>
      <Button type="primary" onClick={incrementAsync}>Increment with Delay</Button>
      <Button type="primary" onClick={() => sum(5)}>Add 5</Button>
      <Button type="primary" color="#F00" onClick={decrement}>Decrement</Button>
    </div>
  );
};

ExampleContainer.propTypes = {
};

export default ExampleContainer;
