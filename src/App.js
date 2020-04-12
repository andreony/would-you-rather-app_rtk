import React, { useEffect, Fragment } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './features/auth/Login';
import { handleInitialData } from './features/shared';
import Nav from './app/Nav';
import Dashboard from './features/questions/Dashboard';
import QuestionView from './features/questions/QuestionView';
import NewQuestion from './features/questions/NewQuestion';
import LeaderBoard from './features/users/LeaderBoard';
import NotFound from './app/NotFound';
import LoadingBar from 'react-redux-loading-bar'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {    
    dispatch(handleInitialData())
  },[dispatch]);

  return (
      <Router>
        
        <Fragment>
          <Nav />
            <LoadingBar />
            <div className="container mt-5">
              <Switch>
                <Route path="/" exact component={Dashboard}/>
                <Route path="/login" exact component={Login} />
                <Route path="/add" exact component={NewQuestion} />
                <Route path="/question/:id" exact component={QuestionView} />
                <Route path="/leaderboard" exact component={LeaderBoard} />
                <Route component={NotFound} />
              </Switch>
            </div>
        </Fragment>
      </Router>
    )}

export default App;
