
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { signupUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      username: '',
      valid: true,
      errors: {
        email: false,
        password: false,
        username: false,
      },
    };
  }

  onHandleChange = (event) => {
    event.preventDefault();
    const { name } = event.target;
    this.setState({ [name]: event.target.value });
  }

  onSubmitClicked = (event) => {
    const errors = {};
    errors.email = (this.state.email === '');
    errors.password = (this.state.password === '');
    errors.username = (this.state.username === '');

    if (errors.email || errors.password || errors.username) {
      console.log(errors);
      this.setState({ valid: false, errors });
    } else {
      const user = { email: this.state.email, password: this.state.password, username: this.state.username };
      this.props.signupUser(user, this.props.history);
    }
  }

  render() {
    return (
      <div id="NewPosts">
        <em>{this.state.valid ? '' : 'Looks like you left some of the fields empty'}</em>
        <h2>Email:</h2>
        <input
          id="email"
          type="text"
          name="email"
          className={this.state.errors.email ? 'error' : 'regular'}
          onChange={this.onHandleChange}
          value={this.state.email}
        />
        <h2>Password:</h2>
        <input
          id="password"
          type="text"
          name="password"
          className={this.state.errors.password ? 'error' : 'regular'}
          onChange={this.onHandleChange}
          value={this.state.password}
        />
        <h2>Username:</h2>
        <input
          id="username"
          type="text"
          name="username"
          className={this.state.errors.username ? 'error' : 'regular'}
          onChange={this.onHandleChange}
          value={this.state.username}
        />
        <Button variant="contained" color="primary" type="submit" onClick={this.onSubmitClicked}>
          Signup!
        </Button>
      </div>
    );
  }
}

export default withRouter(connect(null, { signupUser })(SignUp));
