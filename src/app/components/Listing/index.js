import React from 'react';
import { connect } from 'react-redux';
import { displayError, resetError } from '../../actions/error';
import { addStations } from '../../actions/stations';
import MSG from '../../constants/messages';
import api from '../../api/apiMapper';

const mapDispatchToProps = dispatch => {
  return { 
    addStations: listStations => { dispatch(addStations(listStations)); },
    resetError: () => { dispatch(resetError()) },
    displayError: errorMessage => { dispatch(displayError(errorMessage)) },
  }; 
};

const mapStateToProps = state => {
  return { filterCities: state.cities.filterCities }
};

class Listing extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick (city) {
    this.props.onClick(true);
    await this.getStations(city);
    this.props.onClick(false);
  }

  getStations(city) {
    return api.getStations(city)
    .then((data) => {
      if (data.length > 0) {
        this.props.addStations(data);
        this.props.resetError();
      } else {
        this.props.displayError(MSG.NO_STATION);
      }
      
    })
    .catch((error) => {
      this.props.displayError(MSG.SERVER_CONNEXION_FAILED);
    });
  }

  displayCities() {
    if (this.props.filterCities !== null && this.props.filterCities.length === 0) {
       this.props.displayError(MSG.NO_CITY);
    } else {
      this.props.resetError();
    }
    return this.props.filterCities !== null ? this.props.filterCities.map(city => (<li onClick={() => this.handleClick(city)} key={city}>{city}</li>)) : null;
  }
  
  render () {
    return (
      <ul>
        {this.displayCities()}
      </ul>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Listing);