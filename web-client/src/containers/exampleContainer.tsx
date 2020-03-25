import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'src/components/Button/Buttons';

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
      <Button type="button" color="#0F0" onClick={increment}>Increment</Button>
      <Button type="button" onClick={fetchUsers}>Fetch users</Button>
      <Button type="button" onClick={() => sum(5)}>Add 5</Button>
      <Button type="button" color="#F00" onClick={decrement}>Decrement</Button>
      {users.map((user: any) => user.email)}
    </div>
  );
};

ExampleContainer.propTypes = {
};

export default ExampleContainer;
