import React from 'react';
import { UserContextProvider } from './components/contexts/userContext';

//react router
import { BrowserRouter as Rounter, Route, Switch } from 'react-router-dom';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';


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
     
        
        <Route render={({location}) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={450}
              classNames="fade"
            >
              
              <Switch location={location}>
                <Route exact path='/' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/set/:id' component={Login} />
                <Route path='/set/:id' component={Login} />
              </Switch>

            </CSSTransition>
          </TransitionGroup>
        )} />
      </Rounter>
    </UserContextProvider>      
  )
}

export default App;
