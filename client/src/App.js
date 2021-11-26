import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Views/Home/Home.jsx'
import LandingPage from './Views/LandingPage/LandingPage.jsx';
import DetailsDogs from './Views/DetailsDogs/DetailsDogs.jsx'
import DogCreator from './Views/DogCreator/DogCreator.jsx'

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

          <Route path='/dogs'>
            <DetailsDogs/>
          </Route>

          <Route path='/dogcreator'>
            <DogCreator/>
          </Route>
      
      
      </Switch>
      </div>
    </Router>
  );
}

export default App;
