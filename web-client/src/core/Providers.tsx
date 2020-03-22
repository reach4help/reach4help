import { Provider } from 'react-redux';
import React, { ReactNode } from 'react'
import PropTypes from 'prop-types';
import configureStore from '../store';

interface ProvidersProps {
    children: ReactNode;
}

const Providers: React.SFC<ProvidersProps> = ({ children }) => {
    const store = configureStore()
    return <Provider store={store}>{children}</Provider>;
}

Providers.propTypes = {
    children: PropTypes.node.isRequired,
}
export default Providers
