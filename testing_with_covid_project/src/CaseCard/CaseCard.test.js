import React from 'react';
import { mount, shallow } from 'enzyme';
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
  test('correctly renders congrats string in English by default', () => {
    const wrapper = setup({ cases: data });
    expect(wrapper.props().value).toEqual(data);
  });
});

test('renders without error', () => {
  const wrapper = setup({ cases: data });
  const component = wrapper.find('Wrapper');
  expect(component.length).toBe(1);
});

test('renders without error', () => {
  const wrapper = setup({ cases: data });
  const component = wrapper.find('CountryCardRow');
  const realLen = getCountries(data).length;
  expect(component.children().children().length).toBe(realLen);
});
