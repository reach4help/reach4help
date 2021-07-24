import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import { useAuth0 } from "./Auth/react-auth0-spa";

import HomeComponent from './components/HomeComponent';
import ProgramListComponent from './components/program/ProgramListComponent';
import RequestListComponent from './components/request/RequestListComponent';
import RequestCreateComponent from './components/request/RequestCreateComponent';
import StageListComponent from './components/stage/StageListComponent';

import './globals.css';
import { NavBarFunc } from './NavBarFunc';
import ProgramRequestSelection from './components/request/RequestProgramSelection';
import { WebSocketLink } from "@apollo/client/link/ws";

const createApolloClient = (authToken: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:8080/v1/graphql',
      // headers: {
      //   Authorization: `Bearer ${authToken}`
      // }
    }),
    cache: new InMemoryCache(),
  });
};

function App({ idToken }: { idToken: string }) {
  // function App() {
  const { loading, logout } = useAuth0();
  if (loading) {
    return <div>Loading...</div>;
  }
  const client = createApolloClient(idToken);
  const NavBar = NavBarFunc();

  // TODO: rethink lines for request/list with multiple parameters - combine?
  return (
    <ApolloProvider client={client}>
      <div>
        <nav className="navbar">
          <NavBar />
        </nav>
        <div>
          <ProgramListComponent />
        </div>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/" component={HomeComponent}></Route>
            <Route path="/request/list/:programCode/:stageCode" component={RequestListComponent} />
            <Route path="/request/list/:programCode" component={RequestListComponent} />
            <Route exact path="/request/list" component={ProgramRequestSelection} />
            <Route exact path="/request/create" component={RequestCreateComponent} />
            <Route exact path="/program/list" component={ProgramListComponent} />
            <Route exact path="/stage/list" component={StageListComponent} />
            <Route component={HomeComponent} />
          </Switch>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;

