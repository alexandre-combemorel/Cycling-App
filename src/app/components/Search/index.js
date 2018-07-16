import React from "react";
import { connect } from "react-redux";
import { fetchCities, filterCities } from '../../actions/cities';
import { resetError, displayError } from '../../actions/error';
import api from '../../api/apiMapper';
import Loader from '../Loader';
import MSG from '../../constants/messages';

const mapDispatchToProps = dispatch => {
  return { 
    addCitiesList: citiesList => { dispatch(fetchCities(citiesList)); },
    filterCities: filteredCities => { dispatch(filterCities(filteredCities)); },
    resetError: (provider) => { dispatch(resetError(provider)) },
    displayError: (provider, message) => { dispatch(displayError(provider, message)) },
  }; 
};

const mapStateToProps = state => {
  return { listCities: state.cities.listCities };
};

class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      isLoading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e) {
    this.setState({inputValue: e.target.value});
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleClick();
    }
  }

  async handleClick() {
    // We first make sure we have API called the list of the cities once
    if (this.props.listCities === null) {
      this.setState({isLoading: true});
      await this.fetchCities();
      this.setState({isLoading: false});
    }
    // Once the list of cities is filled we can filter according to the keyword search
    if (this.props.listCities !== null) this.filterCities(this.state.inputValue);
  }

  filterCities(keyWordParam) {
    // we compare and reduce the cities according to the keywords
    const keyWord = keyWordParam.toLowerCase();
    const filterListCities = this.props.listCities.filter(city => city.toLowerCase().includes(keyWord));
    
    // RESET ERROR before display any new one
    this.props.resetError('CITY');
    // if the filtered list has no element we display an error as no cities were found
    if (filterListCities.length === 0) {
      this.props.displayError('CITY', MSG.NO_CITY);
    }
    // We store the list of city filtered, which will trigger the re rendering of the listing component
    this.props.filterCities(filterListCities);
  }

  fetchCities() {
    // RESET ERROR before display any new one
    this.props.resetError('SEARCH');
    return api.getCities()
    .then((data) => {
      if (data.length > 0) {
        this.props.addCitiesList(data);
      } else {
        this.props.displayError('SEARCH', MSG.NO_CITY);
      }
    })
    .catch((error) => {
      this.props.displayError('SEARCH', MSG.SERVER_CONNEXION_FAILED);
    }); 
  }

  render() {
    const loading = this.state.isLoading ? <Loader/> : null;
    return (
      <div className="search">
        <label>Enter a place: </label><br/>
        <input onChange={this.handleChange} onKeyPress={this.handleKeyPress} className="search__input" type="text"/>
        <button onClick={this.handleClick} className="search__button">SEARCH</button>
        <div className="search__loader">{loading}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

import style from './index.scss';