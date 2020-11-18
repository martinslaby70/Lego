import React from 'react';
import { UserContextProvider } from './components/contexts/userContext';
import Navbar from './components/navbar';


const App = () => {



  return(
    <UserContextProvider>
      <Navbar />
    </UserContextProvider>      
  )
}

export default App;
