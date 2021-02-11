import React, { useState } from "react";
import { Route, Switch, BrowserRouter, withRouter } from 'react-router-dom';
import { gql, useMutation, useQuery, useApolloClient} from '@apollo/client';

import Home from './screens/Home';
import Redirect from './screens/Redirect';

const GET_LINK_QUERY = gql`
  query GetLink ( $hash: String! ) {
    link (hash: $hash) {
      hash
      longUrl
    }
  }
`;

const CREATE_LINK_MUTATION = gql`
  mutation CreateLink(
    $longUrl: String!
  ) {
    createLink(longUrl: $longUrl ) {
      hash
      longUrl
    }
  }
`;

const App = () => {

 const routes = (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/:hash" exact component={Redirect} />
  </Switch>
 )
 

  return (<BrowserRouter> 
            {routes}   
          </BrowserRouter> ); 
}

export default App;
