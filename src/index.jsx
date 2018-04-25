import React, { Component } from 'react';

export default class SearchBar extends Component {
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
          cachedData: {}
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
    const serializedState = JSON.stringify({ ...this.state, searchTerm: '' });
    try {
      localStorage.setItem('SearchBarState', serializedState);
    } catch (err) {
      console.log(err);
    }
  };

  updateCachedData = data => {
    this.setState(
      {
        cachedData: {
          ...this.state.cachedData,
          [this.state.searchTerm]: data.city
        }
      },
      () => {
        this.saveState();
        this.props.handleDataToRender(
          this.state.cachedData[this.state.searchTerm]
        );
      }
    );
  };

  render() {
    let { cachedData, searchTerm } = this.state;

    return (
      <div>
        <input
          type="text"
          onChange={e => {
            this.setState({ searchTerm: e.target.value });
          }}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              if (!(searchTerm in cachedData)) {
                this.props.onSearch(this.state.searchTerm);
              } else {
                this.props.handleDataToRender(cachedData[searchTerm]);
              }
            }
          }}
        />
        {/* <button onClick={this.handleSearch}>OK</button> */}
      </div>
    );
  }
}
