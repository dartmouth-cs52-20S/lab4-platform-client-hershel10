import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, NavLink,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import Particles from 'react-particles-js';
import NewPost from '../NewPost';
import Post from '../Post';
import Posts from '../Posts';


const Nav = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="secondary" aria-label="menu">
            <NavLink to="/" exact><HomeIcon fontSize="large" /></NavLink>
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} fontSize="large" color="inherit" aria-label="menu">
            <NavLink to="/posts/new"><AddIcon /></NavLink>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

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
                value: 75,
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
            <Route component={FallBack} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
