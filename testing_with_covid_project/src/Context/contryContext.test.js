import React from 'react';
import { shallow } from 'enzyme';
import { CountryContextProvider, useCountryCase } from './contryContext';

const FunctionalComponent = () => {
  useCountryCase();
  return <div />;
};

test('useCountryCase throws error when not wrapped in CountryContextProvider', () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow('useCountryCase must be used within a CountryContextProvider');
});

test('useCountryCase does not throw error when wrapped in CountryContextProvider', () => {
  expect(() => {
    shallow(
      <CountryContextProvider>
        <FunctionalComponent />
      </CountryContextProvider>
    );
  }).not.toThrow();
});
