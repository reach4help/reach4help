import React, {lazy, ReactElement, Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
import NotFoundRoute from 'src/pages/routes/NotFoundRoute';

import LoadingWrapper from '../../../components/LoadingComponent/LoadingComponent';
import {SettingsLocation} from './routes/SettingsRoute/constants';

const SettingsRoute = lazy(() => import('./routes/SettingsRoute/SettingsRoute'));

const ContentPage = (): ReactElement => {
    return (
        <Suspense fallback={<LoadingWrapper/>}>
            <Switch>
                <Route path={SettingsLocation.path} component={SettingsRoute} exact/>
                <Route path="*" component={NotFoundRoute}/>
            </Switch>
        </Suspense>
    );
};

export default ContentPage;
