import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './src/index';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('SearchBar without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <SearchBar
      onSearch={() => {}}
      apiData={{}}
      handleDataToRender={() => {}}
      styles={{}}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('always renders a `input bar`', () => {
  const searchbar = shallow(
    <SearchBar
      onSearch={() => {}}
      apiData={{}}
      handleDataToRender={() => {}}
      styles={{}}
    />
  );
  expect(searchbar.find('input').length).toBe(1);
});

it('always renders a `button `', () => {
  const searchbar = shallow(
    <SearchBar
      onSearch={() => {}}
      apiData={{}}
      handleDataToRender={() => {}}
      styles={{}}
    />
  );
  expect(searchbar.find('button').length).toBe(1);
});
