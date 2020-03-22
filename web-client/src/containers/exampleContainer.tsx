import React from 'react'
import { connect, ConnectedProps } from 'react-redux';
import PropTypes from 'prop-types';
import { incrementAction, decrementAction, sumAction } from '../store/example/actions';
import { AppState } from '../store';

const mapStateToProps = (state: AppState) => ({
    example: state.exampleReducer,
});

const mapDispatch = {
    increment: incrementAction,
    decrement: decrementAction,
    sum: sumAction,
}

const connector = connect(mapStateToProps, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>


const ExampleContainer: React.FC<PropsFromRedux> = ({
    example,
    increment,
    decrement,
    sum,
}) => {
    return (
      <div>
        {example.value}
        <button type="button" onClick={increment}>Increment</button>
        <button type="button" onClick={() => sum(5)}>Add 5</button>
        <button type="button" onClick={decrement}>Decrement</button>
      </div>
    );
}

ExampleContainer.propTypes = {
    example: PropTypes.shape({
        value: PropTypes.number.isRequired,
    }).isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    sum: PropTypes.func.isRequired,
}

export default connector(ExampleContainer)
