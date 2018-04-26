import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onSearch: PropTypes.func.isRequired,
  handleDataToRender: PropTypes.func.isRequired,
  apiData: PropTypes.object.isRequired,
  styles: PropTypes.object
};

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.loadState();
  }

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
    } catch (err) {
      console.log(err);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.apiData !== this.props.apiData) {
      this.updateCachedData(nextProps.apiData);
    }
  }

  saveState = () => {
    const serializedState = JSON.stringify({
      ...this.state,
      searchTerm: '',
      searchTermLowerCase: ''
    });
    try {
      localStorage.setItem('SearchBarState', serializedState);
    } catch (err) {
      console.log(err);
    }
  };

  updateCachedData = data => {
    console.log(data);
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

  render() {
    const { cachedData, searchTerm, searchTermLowerCase } = this.state;
    const styles = this.props.styles || {};

    return (
      <div>
        <input
          type="text"
          style={styles.input}
          onChange={e => {
            this.setState({
              searchTerm: e.target.value,
              searchTermLowerCase: e.target.value.toLowerCase()
            });
          }}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              if (!(searchTermLowerCase in cachedData)) {
                this.props.onSearch(this.state.searchTermLowerCase);
              } else {
                this.props.handleDataToRender(cachedData[searchTermLowerCase]);
              }
            }
          }}
        />
        <button
          style={styles.button}
          onClick={() => {
            console.log('here');
            if (!(searchTermLowerCase in cachedData)) {
              this.props.onSearch(this.state.searchTermLowerCase);
            } else {
              this.props.handleDataToRender(cachedData[searchTermLowerCase]);
            }
          }}
        >
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
