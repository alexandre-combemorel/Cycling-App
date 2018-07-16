import React from "react";
import GoogleMap from '../GoogleMap';
import Loader from '../Loader';
import Listing from '../Listing';


export default class Content extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      isLoading: false,
    };

    this.displayLoading = this.displayLoading.bind(this);
  }

  displayLoading(state) {
    this.setState({isLoading: state});
  }

  render() {
    const loading = this.state.isLoading ? <Loader/> : null;
    return (
      <div className="content">
        <div className="content__listing">
          <Listing onClick={(state) => this.displayLoading(state)}/>
        </div>
        <div className="content__map">
          {loading}
          <GoogleMap/>
        </div>
      </div>
    );
  }
}

import style from './index.scss';