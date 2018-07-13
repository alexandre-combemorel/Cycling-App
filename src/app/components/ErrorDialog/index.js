import React from 'react';
import { connect } from 'react-redux';

const mapStateToPros = state => {
  return { errorMessage: state.error.errorMessage };
}

class ErrorDialog extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
  const errorDialog = this.props.errorMessage !== null ? <div className="error-dialog">{this.props.errorMessage}</div> : null;
    return errorDialog;
  }
  
}

export default connect(mapStateToPros)(ErrorDialog);

import style from './index.scss';