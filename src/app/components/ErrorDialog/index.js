import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { errorMessage: state.error.errorMessage };
}

class ErrorDialog extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  displayError() {
    return this.props.errorMessage.length > 0 ? this.props.errorMessage.map(error => <div className="error-dialog" key={error.provider}>{error.message}</div>) : null;
  }

  render() {
    // console.log('render error', this.props.errorMessage);
    return (this.displayError());
  }
  
}

export default connect(mapStateToProps)(ErrorDialog);

import style from './index.scss';
