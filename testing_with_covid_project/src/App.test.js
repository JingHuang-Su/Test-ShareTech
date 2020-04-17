import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import CovidApi from './Api/CovidApi';
import { data } from './CaseCard/config';
const add = (a, b) => a + b;

test('test example', () => {
  const fourPlusTwo = add(2, 4);
  expect(fourPlusTwo).toBe(6);
});

const mockGetGlobalInfo = jest.fn();
// const mockGetCountryCovid = jest.fn();
const globalCases = { cases: 2182197, deaths: 145521, recovered: 547295 };

const setup = (globalCases, countryCases = data) => {
  mockGetGlobalInfo.mockClear();

  CovidApi.getCovidGlobalInfo = mockGetGlobalInfo;
  // CovidApi.getCovidCountries = mockGetCountryCovid;
  const mockUseReducer = jest
    .fn()
    .mockReturnValue([
      { globalCase: globalCases, countryCase: countryCases },
      jest.fn(),
    ]);

  React.useReducer = mockUseReducer;

  return mount(<App />);
};

test('App renders without error', () => {
  const wrapper = setup(globalCases);
  const component = wrapper.find('.App');
  expect(component.length).toBe(1);
});

describe('mockGetGlobalInfo calls', () => {
  test('mockGetGlobalInfo gets called on App mount', () => {
    setup(globalCases, data);

    expect(mockGetGlobalInfo).toHaveBeenCalled();
    // expect(mockGetCountryCovid).toHaveBeenCalled();
  });
  test('getCovidGlobalInfo does not update on App update', () => {
    const wrapper = setup(null, null);
    mockGetGlobalInfo.mockClear();
    // mockGetCountryCovid.mockClear();
    // wrapper.update() doesn't trigger update
    // (issue forked from https://github.com/airbnb/enzyme/issues/2091)
    wrapper.setProps();

    expect(mockGetGlobalInfo).not.toHaveBeenCalled();
    // expect(mockGetCountryCovid).not.toHaveBeenCalled();
  });
});

describe('globalCase is not null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(globalCases, data);
  });

  test('renders app when globalCase is not null', () => {
    const appComponent = wrapper.find('.App');
    expect(appComponent.exists()).toBe(true);
  });
  test('does not render spinner when globalCase is not null', () => {
    const spinnerComponent = wrapper.find('Spinner');
    expect(spinnerComponent.exists()).toBe(false);
  });
});

describe('globalCase is null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });

  test('does not render app when globalCase is null', () => {
    const appComponent = wrapper.find('.App');
    expect(appComponent.exists()).toBe(false);
  });
  test('renders spinner when globalCase is null', () => {
    const spinnerComponent = wrapper.find('Spinner');
    expect(spinnerComponent.exists()).toBe(true);
  });
});
