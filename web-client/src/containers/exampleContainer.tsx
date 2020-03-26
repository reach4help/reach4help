import { Button } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { decrementAction, fetchUsersAction, incrementAction, sumAction } from '../ducks/example';
import { AppState } from '../store';

const ExampleContainer: React.FC = () => {
  const value = useSelector((state: AppState) => state.example.value);
  const users = useSelector((state: AppState) => state.example.users);
  const dispatch = useDispatch();

  const increment = useCallback(
    () => dispatch(incrementAction()),
    [dispatch],
  );

  const fetchUsers = useCallback(
    () => dispatch(fetchUsersAction()),
    [dispatch],
  );

  const decrement = useCallback(
    () => dispatch(decrementAction()),
    [dispatch],
  );

  const sum = useCallback(
    val => dispatch(sumAction(val)),
    [dispatch],
  );

  return (
    <div>
      {value}
      <button type="button" style={{ backgroundColor: '#0F0' }} onClick={increment}>Increment</button>
      <button type="button" onClick={fetchUsers}>Fetch users</button>
      <button type="button" onClick={() => sum(5)}>Add 5</button>
      <button type="button" style={{ backgroundColor: '#F00' }} onClick={decrement}>Decrement</button>
      <Button type="primary" color="#F00" onClick={decrement}>Some button</Button>
      {users.map((user: any) => user.email)}
    </div>
  );
};

ExampleContainer.propTypes = {
};

export default ExampleContainer;
