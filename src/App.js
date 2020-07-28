import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AppHeader from './components/AppHeader';
import Home from './pages/Home';
import Alarms from './pages/Alarms';
import { useSelector } from 'react-redux';
import Loading from './components/Loading';
import './App.scss';

function App() {
  const isLoading = useSelector(store => store.Loading);

  return (
    <main className="app">
      <Router>
        <AppHeader />
        <section className="app-body">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/Home">
              <Home />
            </Route>
            <Route exact path="/Alarms">
              <Alarms />
            </Route>
          </Switch>
        </section>
      </Router>
      { isLoading && <Loading />}
    </main>
  );
}

export default App;
