import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { signinUser } from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      valid: true,
      errors: {
        email: false,
        password: false,
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
    if (errors.email || errors.password) {
      console.log(errors);
      this.setState({ valid: false, errors });
    } else {
      const user = { email: this.state.email, password: this.state.password };
      this.props.signinUser(user, this.props.history);
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
        <Button variant="contained" color="primary" type="submit" onClick={this.onSubmitClicked}>
          Login!
        </Button>
      </div>
    );
  }
}

export default withRouter(connect(null, { signinUser })(SignIn));
