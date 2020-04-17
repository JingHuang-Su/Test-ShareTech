import React from 'react';
import { mount } from 'enzyme';
import CaseCard, { getCountries } from './';
import { data } from './config';
import { CountryContextProvider } from '../Context/contryContext';

const setup = ({ cases }) => {
  return mount(
    <CountryContextProvider value={cases}>
      <CaseCard />
    </CountryContextProvider>
  );
};

describe('case card', () => {
  test('case card data correctly', () => {
    const wrapper = setup({ cases: data });
    expect(wrapper.props().value).toEqual(data);
  });
});

test('renders without error', () => {
  const wrapper = setup({ cases: data });
  const component = wrapper.find('Wrapper');
  expect(component.length).toBe(1);
});

test('renders CountryCardRow without error and correct length', () => {
  const wrapper = setup({ cases: data });
  const component = wrapper.find('CountryCardRow');
  const realLen = getCountries(data).length;
  expect(component.children().children().length).toBe(realLen);
});
