/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createPost } from '../actions';


class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tags: '',
      content: '',
      coverUrl: '',
      valid: true,
      errors: {
        title: false,
        tags: false,
        content: false,
        coverUrl: false,
      },
    };
  }

  onHandleChange = (event) => {
    event.preventDefault();
    const { name } = event.target;
    this.setState({ [name]: event.target.value });
  }

  onSubmitform = () => {
    const errors = {};
    errors.title = (this.state.title == '');
    errors.tags = (this.state.tags == '');
    errors.content = (this.state.content == '');
    errors.coverUrl = (this.state.coverUrl == '');

    if (errors.title || errors.tag || errors.content || errors.coverUrl) {
      console.log(errors);
      this.setState({ valid: false, errors });
    } else {
      console.log('starting');
      this.props.createPost({
        title: this.state.title,
        tags: this.state.tags,
        content: this.state.content,
        coverUrl: this.state.coverUrl,
      }, this.props.history);
    }
  }

  render() {
    return (
      <div id="NewPosts">
        <h2>Create New Post</h2>
        <em>{this.state.valid ? '' : 'Looks like you left some of the fields empty'}</em>
        <h2>Title:</h2>
        <input
          id="title"
          type="text"
          name="title"
          className={this.state.errors.title ? 'error' : 'regular'}
          onChange={this.onHandleChange}
          value={this.state.title}
        />
        <h2>Tags:</h2>
        <input
          id="tags"
          type="text"
          name="tags"
          className={this.state.errors.tags ? 'error' : 'regular'}
          onChange={this.onHandleChange}
          value={this.state.tags}
        />
        <h2>Content:</h2>
        <textarea
          id="content"
          type="text"
          name="content"
          className={this.state.errors.content ? 'error' : 'regular'}
          onChange={this.onHandleChange}
          value={this.state.content}
        />
        <h2>URL:</h2>
        <input
          id="coverUrl"
          type="text"
          name="coverUrl"
          className={this.state.errors.coverUrl ? 'error' : 'regular'}
          onChange={this.onHandleChange}
          value={this.state.coverUrl}
        />
        <br />
        <Button variant="contained" color="primary" type="submit" onClick={this.onSubmitform}>
          Submit!
        </Button>
      </div>
    );
  }
}

export default withRouter(connect(null, { createPost })(NewPost));
