/* eslint-disable react/button-has-type */
/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
// eslint-disable-next-line object-curly-newline
import { deletePost, updatePost, fetchPost, filterPosts } from '../actions';


class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      title: props.post.title,
      tags: props.post.tags,
      content: props.post.content,
      coverUrl: props.post.coverUrl,
      valid: true,
      errors: {
        title: false,
        tags: false,
        content: false,
        coverUrl: false,
      },
    };
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }

  delete = () => {
    this.props.deletePost(this.props.match.params.id, this.props.history);
  }

  handleFilter = (event) => {
    this.props.filterPosts(event.currentTarget.value);
    this.props.history.push('/');
  }

  onHandleChange = (event) => {
    const name = event.target.getAttribute('name');
    this.setState({ [name]: event.target.value });
  }

  submitChanges = () => {
    if (this.state.isEditing) {
      const errors = {};
      errors.title = (this.state.title === '');
      errors.tags = (this.state.tags === '');
      errors.content = (this.state.content === '');
      errors.coverUrl = (this.state.coverUrl === '');
      console.log(errors);
      if (errors.title || errors.tags || errors.content || errors.coverUrl) {
        this.setState({ valid: false, errors });
      } else {
        this.props.updatePost(this.props.match.params.id, {
          title: this.state.title,
          tags: this.state.tags,
          content: this.state.content,
          coverUrl: this.state.coverUrl,
        });
        this.setState({ isEditing: false, valid: true });
      }
    } else {
      // eslint-disable-next-line object-curly-newline
      this.setState({ isEditing: true, title: this.props.post.title, tags: this.props.post.tags, content: this.props.post.content, coverUrl: this.props.post.coverUrl });
    }
  }

  renderPost = () => {
    let tags;
    if (this.props.post.tags) {
      tags = this.props.post.tags.split(' ').map((tag) => <Button onClick={this.handleFilter} variant="contained" value={tag}>{tag}</Button>);
    } else {
      tags = [];
    }
    console.log(tags);
    if (this.state.isEditing) {
      return (
        <div className="editPost">
          <em>{this.state.valid ? 'Edit your Post!' : 'Looks like you left some of the fields empty'}</em>
          <h2>Title:</h2>
          <input type="text" name="title" className={this.state.errors.title ? 'error' : 'regular'} onChange={this.onHandleChange} value={this.state.title} />
          <h2>Tags:</h2>
          <input type="text" name="tags" className={this.state.errors.tags ? 'error' : 'regular'} onChange={this.onHandleChange} value={this.state.tags} />
          <h2>Content:</h2>
          <textarea type="text" name="content" className={this.state.errors.content ? 'error' : 'regular'} onChange={this.onHandleChange} value={this.state.content} />
          <h2>URL:</h2>
          <input type="text" name="coverUrl" className={this.state.errors.coverUrl ? 'error' : 'regular'} onChange={this.onHandleChange} value={this.state.coverUrl} />
        </div>
      );
    } else {
      return (
        <div className="noneditpost">
          <div className="title-post">{this.props.post.title}</div>
          <div className="author-post">Author: {this.props.post.author}</div>
          <div className="post-image" dangerouslySetInnerHTML={{ __html: marked(`![](${this.props.post.coverUrl})` || '') }} />
          <div className="content">{this.props.post.content}</div>
          {tags}
        </div>
      );
    }
  }

  renderbuttons = () => {
    if (this.props.auth.authenticated) {
      return (
        <header>
          <Button variant="contained" color="primary" className="postbutton" onClick={this.submitChanges}>{this.state.isEditing ? 'Finish' : 'Edit'}</Button>
          <Button variant="contained" color="primary" className="postbutton" onClick={this.delete}>Delete</Button>
        </header>
      );
    } else {
      return (null);
    }
  }

  render() {
    return (
      <div className="SpecificPost">
        {this.renderbuttons()}
        {this.renderPost()}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  post: reduxState.posts.current,
  auth: reduxState.auth,
});

// eslint-disable-next-line object-curly-newline
export default withRouter(connect(mapStateToProps, { fetchPost, deletePost, updatePost, filterPosts })(Post));
