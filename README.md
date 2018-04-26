# React Search Cache 💾

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/plotlabs/react-search-cache/blob/master/LICENSE.txt) [![Build Status](https://travis-ci.org/plotlabs/react-search-cache.svg?branch=master)](https://travis-ci.org/plotlabs/react-search-cache) [![CodeFactor](https://www.codefactor.io/repository/github/plotlabs/react-search-cache/badge)](https://www.codefactor.io/repository/github/plotlabs/react-search-cache) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://www.plotlabs.io/) [![npm](https://img.shields.io/npm/v/react-search-cache.svg)](https://www.npmjs.com/package/react-search-cache)

A smart search component which caches your searched data in localstorage.The searched data can be retrived even there is no network connection.

Ideal for saving expensive network requests and for offline Webapps.

# Basic Usage

Just import the `<Searchbar >` component and pass it the data you want it to persist. It renders two elements input element and a search button.

```js
import React, { Component } from 'react';
import Searchbar from 'react-search-cache';
import axios from 'axios';
import SearchResults from './SearchResults';

class App extends Component {
  state = {
    apiData: {},
    dataToRender: {}
  };

  handleSearch = searchTerm => {
    const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=a3cb99e4a46d3c130772308d454ee522`;
    const url = `${ROOT_URL}&q=${searchTerm}`;
    axios
      .get(url)
      .then(response => {
        if (response && response.data) {
          this.setState({ apiData: response.data });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleDataToRender = data => {
    this.setState({ dataToRender: data });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Searchbar
            onSearch={this.handleSearch}
            apiData={this.state.apiData}
            handleDataToRender={this.handleDataToRender}
            styles={CustomStyles}
          />
          <SearchResults data={this.state.dataToRender} />
        </header>
      </div>
    );
  }
}

const CustomStyles = {
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
};

export default App;
```

### Props

Only a few of them!

* `onSearch: function`: You have to handle this function to fetch data from the api, you will receive searchterm in the argument of this function.The data received from the api should be passed in the local state
  of the component you are including the search bar.
* `apiData: object`: Pass the data received from the api into this object.
* `handleDataToRender: function`: You will receive the actual data to render corresponding the searchterm inside this function , handle this in a function to update local state with the new data.
* `styles: object`: (optional) You can optionally pass the custom styles to override the default styles.

## Author

* Utkarsh kandpal [@utkarshkpal](https://www.linkedin.com/in/utkarsh-kandpal-52310691/)
