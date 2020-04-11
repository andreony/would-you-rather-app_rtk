import React, { useEffect, Fragment } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './features/auth/Login';
import { handleInitialData } from './features/shared';
import Nav from './app/Nav';
import Dashboard from './features/questions/Dashboard';
import QuestionView from './features/questions/QuestionView';
import PollResult from './features/questions/PollResult';
import NewQuestion from './features/questions/NewQuestion';
import LeaderBoard from './features/users/LeaderBoard';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {    
    dispatch(handleInitialData())
  },[dispatch]);

  return (
      <Router>
        
        <Fragment>
          <Nav />
            <div className="container">
              <div>
                <Route path="/" exact component={Dashboard}/>
                <Route path="/login" exact component={Login} />
                <Route path="/add" exact component={NewQuestion} />
                <Route path="/question/:id" exact component={QuestionView} />
                <Route path="/question/:id/answer" exact component={PollResult} />
                <Route path="/leader-board" exact component={LeaderBoard} />

              </div>
            </div>
        </Fragment>
      </Router>
    )}

export default App;
