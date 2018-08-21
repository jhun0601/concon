import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions";
class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        {/* <td>{edu.fieldofstudy}</td> */}
        <td>
          <Moment format="YYYY/MM">{edu.from}</Moment> -
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, edu._id)}
            className="btn btn-danger"
          >
            <i className="fa fa-trash" />
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <div className="table-responsive-sm">
          <table className="table table-hover table-bordered">
            <thead>
              <tr className="thead-dark">
                <th>School</th>
                <th>Degree</th>
                {/* <th>Field of Study</th> */}
                <th>Years</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{education}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
