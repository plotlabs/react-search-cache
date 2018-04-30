/**
 *
 *
 * @File: Main Module
 * @Author: Utkarsh Kandpal
 * @Organisation: PlotLabs Technologies
 * @Website: https://www.plotlabs.io/
 * @License: The MIT License (MIT)
 *
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onSearch: PropTypes.func.isRequired,
  handleDataToRender: PropTypes.func.isRequired,
  apiData: PropTypes.object.isRequired,
  styles: PropTypes.object
};

/**
 *
 * Type: Function.
 * Searchbar component that renders an input and button.
 *
 */
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      cachedData: {},
      searchTermLowerCase: ''
    };
    this.loadState();
  }

  /**
   *
   * Type: Function.
   * Load the initail state of the app from the localstorage.
   *
   */
  loadState = () => {
    try {
      const serializedState = localStorage.getItem('SearchBarState');
      if (serializedState != null) {
        this.state = JSON.parse(serializedState);
      } else {
        this.state = {
          searchTerm: '',
          cachedData: {},
          searchTermLowerCase: ''
        };
      }
    } catch (err) {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.apiData !== this.props.apiData) {
      this.updateCachedData(nextProps.apiData);
    }
  }

  /**
   *
   * Type: Function.
   * Saves the current local state of the component to local storage.
   *
   */
  saveState = () => {
    const serializedState = JSON.stringify({
      ...this.state,
      searchTerm: '',
      searchTermLowerCase: ''
    });
    try {
      localStorage.setItem('SearchBarState', serializedState);
    } catch (err) {}
  };

  /**
   *
   * Type: Function.
   * Updates the cached data.
   *
   */
  updateCachedData = data => {
    this.setState(
      {
        cachedData: {
          ...this.state.cachedData,
          [this.state.searchTermLowerCase]: data.city
        }
      },
      () => {
        this.saveState();
        this.props.handleDataToRender(
          this.state.cachedData[this.state.searchTermLowerCase]
        );
      }
    );
  };

  /**
   *
   * Type: Function.
   * Updates the searchTerm in the state.
   *
   */
  handleInputChange = e => {
    this.setState({
      searchTerm: e.target.value,
      searchTermLowerCase: e.target.value.toLowerCase()
    });
  };

  /**
   *
   * Type: Function.
   * Calls the api to retrieve search data.
   *
   */
  handleInputKeyPress = e => {
    if (e.key === 'Enter') {
      if (!(searchTermLowerCase in cachedData)) {
        this.props.onSearch(this.state.searchTermLowerCase);
      } else {
        this.props.handleDataToRender(cachedData[searchTermLowerCase]);
      }
    }
  };

  /**
   *
   * Type: Function.
   * Calls the api to retrieve search data.
   *
   */
  handleButtonClick = () => {
    if (!(searchTermLowerCase in cachedData)) {
      this.props.onSearch(this.state.searchTermLowerCase);
    } else {
      this.props.handleDataToRender(cachedData[searchTermLowerCase]);
    }
  };

  render() {
    const { cachedData, searchTerm, searchTermLowerCase } = this.state;
    const styles = this.props.styles || {};

    return (
      <div>
        <input
          type="text"
          style={styles.input}
          onChange={this.handleInputChange}
          onKeyPress={this.handleInputKeyPress}
        />
        <button style={styles.button} onClick={this.handleButtonClick}>
          Search
        </button>
      </div>
    );
  }
}
const defaultProps = {
  styles: {
    input: {
      background: 'transparent',
      borderWidth: '1px',
      lineHeight: '1.5',
      height: '43px',
      width: '500px',
      borderRadius: '5px',
      fontSize: '17px'
    },
    button: {
      fontSize: '19px',
      paddingTop: '0px',
      paddingBottom: '0px',
      color: '#ffffff',
      paddingLeft: '18px',
      paddingRight: '18px',
      borderRadius: '4px',
      border: '0px',
      background: '#FF5A5F',
      height: '45px',
      textAlign: 'center',
      display: 'inline-block',
      whiteSpace: 'nowrap',
      marginLeft: '7px'
    }
  }
};

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default SearchBar;
