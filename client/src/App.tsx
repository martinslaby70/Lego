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
import Sales from './components/routes/sales/sales';
import {LegoContainer as Home} from './components/routes/home/legoContainer';
import RegisterForm from './components/routes/login/registerForm';
import LoginForm from './components/routes/login/loginForm';

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
                <Route path='/sales' component={Sales} />
                <Route path='/login' component={LoginForm} />
                <Route path='/register' component={RegisterForm} />
                {/* <Route path='/set/:id' component={} /> */}
              </Switch>

            </CSSTransition>
          </TransitionGroup>
        )} />
      </Rounter>
    </UserContextProvider>      
  )
}

export default App;
