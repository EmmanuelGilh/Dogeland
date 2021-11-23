import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Views/Home/Home.jsx'
import LandingPage from './Views/LandingPage/LandingPage.jsx';

function App() {
  return (
    <Router>
      <div className="App">

        <Switch>
          <Route exact path='/'>          
            <LandingPage/>
          </Route>

          <Route path='/home'>
            <Home/>
          </Route>
      
      </Switch>
      </div>
    </Router>
  );
}

export default App;
