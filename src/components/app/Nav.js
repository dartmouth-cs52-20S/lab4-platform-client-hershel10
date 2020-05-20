
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fade, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { filterPosts, signoutUser } from '../../actions';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  accountButton: {
    marginLeft: 'auto',
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
});

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  open = () => {
    return Boolean(this.state.anchorEl);
  }

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onHome = () => {
    this.props.filterPosts('');
  }

  handlefilter = (event) => {
    this.props.filterPosts(event.target.value);
  }

  onSignOut = () => {
    this.props.signoutUser(this.props.history);
  }

  rendersignin = () => {
    if (this.props.auth.authenticated) {
      return (
        <MenuItem onClick={this.onSignOut}>Sign Out</MenuItem>
      );
    } else {
      return (
        <div className="navright">
          <MenuItem onClick={this.handleClose}><NavLink className="link" to="/signup">Sign Up</NavLink></MenuItem>
          <MenuItem onClick={this.handleClose}><NavLink className="link" to="/signin">Sign In</NavLink></MenuItem>
        </div>
      );
    }
  }

  rendernewpost = () => {
    const { classes } = this.props;
    if (this.props.auth.authenticated) {
      return (
        <IconButton edge="start" className={classes.menuButton} fontSize="large" color="primary" aria-label="menu">
          <NavLink to="/posts/new"><AddIcon fontSize="large" /></NavLink>
        </IconButton>
      );
    } else {
      return null;
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="secondary" aria-label="menu">
              <NavLink to="/" exact><HomeIcon onClick={this.onHome} fontSize="large" /></NavLink>
            </IconButton>
            {this.rendernewpost()}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Filter…"
                onChange={this.handlefilter}
                value={this.props.filter}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>

            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
              className={classes.accountButton}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={this.state.anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={this.open()}
              onClose={this.handleClose}
            >
              {this.rendersignin()}
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

function mapStateToProps(Reduxstate) {
  return {
    filter: Reduxstate.posts.filter,
    auth: Reduxstate.auth,
  };
}

export default connect(mapStateToProps, { filterPosts, signoutUser })(withStyles(styles)(Nav));
