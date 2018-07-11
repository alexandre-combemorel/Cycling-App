import React from "react";
import { connect } from 'react-redux';
import api from '../../api/apiMapper';
import GoogleMap from '../GoogleMap';
import Loader from '../Loader';
import { addStations } from '../../actions/stations'

const mapDispatchToProps = dispatch => {
  return { 
    addStations: listStations => { dispatch(addStations(listStations)); },
  }; 
};

const mapStateToProps = state => {
  return { filterCities: state.cities.filterCities }
};

class Content extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick (city) {
    this.setState({isLoading: true});
    await this.getStations(city);
    this.setState({isLoading: false});
  }

  getStations(city) {
    return api.getStations(city)
    .then((data) => {
      this.props.addStations(data);
    })
    .catch((error) => {
      // display error
    });
  }

  render() {
    const displayList = this.props.filterCities !== null ? this.props.filterCities.map(city => (<li onClick={() => this.handleClick(city)} key={city}>{city}</li>)) : '';
    const loading = this.state.isLoading ? <Loader/> : null;
    return (
      <div className="content">
        <div className="content__listing">
          <ul>
            {displayList}
          </ul>
        </div>
        <div className="content__map">
          {loading}
          <GoogleMap/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);

import style from './index.scss';