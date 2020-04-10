import React, { useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './features/auth/Login';
import { handleInitialData } from './features/shared';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {    
    dispatch(handleInitialData())
  },[dispatch]);

  return (
    <Router>
      <div className="container">
        <h3>Main App.js</h3>
        <div>
          <Route path="/Login" exact component={Login} />

        </div>
      </div>
    </Router>
  );
}

export default App;
