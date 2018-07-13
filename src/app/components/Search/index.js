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
    filterCities: keyWord => { dispatch(filterCities(keyWord)); },
    resetError: () => { dispatch(resetError()) },
    displayError: errorMessage => { dispatch(displayError(errorMessage)) },
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
  }

  handleChange(e) {
    this.setState({inputValue: e.target.value});
  }

  async handleClick() {
    if (this.props.listCities === null) {
      this.setState({isLoading: true});
      await this.fetchCities();
      this.setState({isLoading: false});
    }
    this.props.filterCities(this.state.inputValue);
  }

  fetchCities() {
    return api.getCities()
    .then((data) => {
      if (data.length > 0) {
        this.props.addCitiesList(data);
        this.props.resetError();
      } else {
        this.props.displayError(MSG.NO_CITY);
      }
    })
    .catch((error) => {
      this.props.displayError(MSG.SERVER_CONNEXION_FAILED);
    }); 
  }

  render() {
    const loading = this.state.isLoading ? <Loader/> : null;
    return (
      <div className="search">
        <label>Enter a place: </label><br/>
        <input onChange={this.handleChange} className="search__input" type="text"/>
        <button onClick={this.handleClick} className="search__button">SEARCH</button>
        <div className="search__loader">{loading}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

import style from './index.scss';