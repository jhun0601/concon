import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";
class CommentFeed extends Component {
  render() {
    //do structure and take the post out of the props
    const { comments, postId } = this.props;
    //map for the comment
    return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} postId={postId} />
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};

export default CommentFeed;
