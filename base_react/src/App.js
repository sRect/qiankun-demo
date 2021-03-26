import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';

const About = lazy(() => import('./pages/About'));
const ModelShow = lazy(() => import('./pages/ModelShow'));

function App() {
  return (
    <Router>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/baseAbout" exact component={About} />
          <Route path="/modelShow" component={ModelShow} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
