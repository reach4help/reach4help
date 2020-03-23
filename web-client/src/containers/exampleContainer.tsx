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
      <button type="button" onClick={increment}>Increment</button>
      <button type="button" onClick={incrementAsync}>Increment with Delay</button>
      <button type="button" onClick={() => sum(5)}>Add 5</button>
      <button type="button" onClick={decrement}>Decrement</button>
    </div>
  );
};

ExampleContainer.propTypes = {
};

export default ExampleContainer;
