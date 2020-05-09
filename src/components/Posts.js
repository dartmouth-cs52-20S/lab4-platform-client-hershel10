/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import marked from 'marked';
import { withRouter, Link } from 'react-router-dom';
import { fetchPosts, fetchPost } from '../actions';


class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return this.props.posts.map((post) => {
      let tags;
      if (post.tags) {
        tags = post.tags.split(' ').map((tag) => <Button variant="contained">{tag}</Button>);
      } else {
        tags = [];
      }
      return (
        <div className="postgen">
          <Link to={`/posts/${post.id}`} className="linkpost" key={post.id}>
            <div className="display-image" dangerouslySetInnerHTML={{ __html: marked(`![](${post.coverUrl})` || '') }} />
            <h3 className="title">{post.title}</h3>
          </Link>
          {tags}
        </div>

      );
    });
  }

  render() {
    if (this.props.posts == null) {
      return (<div />);
    } else {
      return (
        <div className="displayposts">
          {this.renderPosts()}
        </div>
      );
    }
  }
}

const mapStateToProps = (reduxState) => ({
  posts: reduxState.posts.all,
});

export default withRouter(connect(mapStateToProps, { fetchPosts, fetchPost })(Posts));
