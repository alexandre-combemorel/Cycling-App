import React from 'react';
import { connect } from 'react-redux';
import { displayError, resetError } from '../../actions/error';
import { addStations } from '../../actions/stations';
import MSG from '../../constants/messages';
import api from '../../api/apiMapper';

const mapDispatchToProps = dispatch => {
  return { 
    addStations: listStations => { dispatch(addStations(listStations)); },
    resetError: (provider) => { dispatch(resetError(provider)) },
    displayError: (provider, message) => { dispatch(displayError(provider, message)) },
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
    // RESET ERROR before display any new one
    this.props.resetError('STATION');
    return api.getStations(city)
    .then((data) => {
      if (data.length > 0) {
        this.props.addStations(data);
      } else {
        this.props.displayError('STATION', MSG.NO_STATION);
      }
    })
    .catch((error) => {
      this.props.displayError('STATION', MSG.SERVER_CONNEXION_FAILED);
    });
  }

  displayCities() {
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