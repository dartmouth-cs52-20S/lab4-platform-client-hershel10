import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Particles from 'react-particles-js';
import Nav from './Nav';
import NewPost from '../NewPost';
import Post from '../Post';
import Posts from '../Posts';
import SignIn from '../signin';
import SignUp from '../signup';


const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

const App = (props) => {
  return (
    <Router>
      <div className="app">
        <Particles canvasClassName="example"
          height="100%"
          width="100%"
          params={{
            particles: {
              number: {
                value: 100,
                density: {
                  enable: true,
                  value_area: 1000,
                },
              },
            },
          }}
        />
        <div className="wrapper">
          <Nav />
          <Switch>
            <Route exact path="/" component={Posts} />
            <Route path="/posts/new" component={NewPost} />
            <Route path="/posts/:id" component={Post} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route component={FallBack} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
