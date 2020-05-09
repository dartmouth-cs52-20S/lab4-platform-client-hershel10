/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import marked from 'marked';
import { withRouter, Link } from 'react-router-dom';
import { fetchPosts, fetchPost, filterPosts } from '../actions';


class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  toggleFilter = (event) => {
    this.props.filterPosts(event.currentTarget.value);
  }

  displayPost = (post) => {
    let tags;
    if (post.tags) {
      tags = post.tags.split(' ').map((tag) => <Button onClick={this.toggleFilter} variant="contained" value={tag}>{tag}</Button>);
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
  }


  renderPosts() {
    return this.props.posts.map((post) => {
      if (this.props.filter === '') {
        return this.displayPost(post);
      } else if (post.tags.toLowerCase().includes(this.props.filter.toLowerCase())) {
        return this.displayPost(post);
      } else return null;
    });
  }

  render() {
    if (this.props.posts == null) {
      return (<div />);
    } else {
      return (
        <div>
          <div className="displayposts">
            {this.renderPosts()}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (reduxState) => ({
  posts: reduxState.posts.all,
  filter: reduxState.posts.filter,
});

export default withRouter(connect(mapStateToProps, { fetchPosts, fetchPost, filterPosts })(Posts));
