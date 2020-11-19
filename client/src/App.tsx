import React from 'react';
import { UserContextProvider } from './components/contexts/userContext';
import { BrowserRouter as Rounter, Route, Switch } from 'react-router-dom';

//components
import Navbar from './components/navbar';
import Login from './components/login/login';
import Register from './components/login/register';
import {LegoContainer as Home} from './components/home/legoContainer';

const App = () => {



  return(
    <UserContextProvider>
      <Rounter>
      
        <Navbar />

        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/:post_id' component={Login} />
        </Switch>
      
      </Rounter>
    </UserContextProvider>      
  )
}

export default App;
