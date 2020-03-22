import React from 'react'
import { connect } from 'react-redux';
import { increment } from '../store/example/actions';
import { AppState } from '../store';


const mapStateToProps = (state: AppState) => ({
    example: state.exampleReducer,
});

const mapDispatchToProps = (dispatch: Function) => ({
    increment: () => dispatch(increment())
  })
  


const Providers: React.SFC = () => {
    return <>{null}</>;
}

Providers.propTypes = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Providers)
