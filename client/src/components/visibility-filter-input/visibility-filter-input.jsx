import React from 'react';
import PropTypes from 'prop-types';
// Redux import
import { connect } from 'react-redux';
// React-bootstrap import
import Form from 'react-bootstrap/Form';
// Action import
import { setFilter } from '../../actions/actions';

import './visibility-filter-input.scss';

function VisibilityFilterInput(props) {
  return <div className="search-div">
    <Form.Control
      className="filter-form"
      onChange={e => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder="Filter Movies"
    />
  </div>;
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);