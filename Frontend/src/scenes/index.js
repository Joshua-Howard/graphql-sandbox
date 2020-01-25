import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions/actions';

const mapStateToProps = state => ({
  placeholder: state.interface.placeholder
});

const mapDispatchToProps = dispatch => ({
  // Functions that dispatch action creators
  incrementPlaceholder: value => dispatch(actions.incrementPlaceholder(value))
});

const Scenes = props => {
  const { placeholder } = props;
  console.log(placeholder, 'This is the value of the placeholder state');

  return <div>Hey, I am React!</div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(Scenes);
