import { Provider } from 'react-redux';
import React, { ReactNode } from 'react'
import { createStore } from 'redux';
import PropTypes from 'prop-types';
import rootReducer from './core/rootReducer';


interface ProvidersProps {
    children: ReactNode;
}

const Providers: React.SFC<ProvidersProps> = ({ children }) => {
    const store = createStore(rootReducer)
    return <Provider store={store}>{children}</Provider>;
}

Providers.propTypes = {
    children: PropTypes.node.isRequired,
}
export default Providers
