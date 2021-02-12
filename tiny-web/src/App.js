import React, { useState } from "react";
import { Route, Switch, BrowserRouter, withRouter } from 'react-router-dom';
import { gql, useMutation, useQuery, useApolloClient} from '@apollo/client';

import Home from './screens/Home/Home';
import Redirect from './screens/Redirect/Redirect';

const App = () => {

 const routes = (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/:hash" exact component={Redirect} />
  </Switch>
 );
 

  return (<BrowserRouter> 
            {routes}   
          </BrowserRouter> ); 
}

export default App;
