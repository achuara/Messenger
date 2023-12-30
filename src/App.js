import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/NavBar/Navbar';
import Auth from './components/Auth/Auth';
import Messenger from './components/Messenger/Messenger';


const App = () => {

return(
 <BrowserRouter>
   <Container maxWidth="lg">
     <Navbar/>
     <Routes>
      <Route path="/" exact element = {<Auth/>} />
      <Route path="/auth" exact element = {<Auth/>} />
      <Route path="/messenger" exact element = {<Messenger/>} />
     </Routes>
    
    </Container>
 </BrowserRouter>
);
};

export default App;