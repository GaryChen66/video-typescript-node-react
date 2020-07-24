import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Videos from './components/Videos';
import Video from './components/Video';

function App() {
  return (
    <Router>
      <Container className="text-center">
        <Switch>
          <Route exact path="/" component={Videos} />
          <Route exact path="/:videoId" component={Video} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
