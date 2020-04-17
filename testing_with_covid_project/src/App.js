import React from 'react';
import CaseCard from './CaseCard';
import styled from 'styled-components';
import { CountryContextProvider } from './Context/contryContext';
import CovidApi from './Api/CovidApi';
import './App.css';
import loadingGif from './loading.gif';

const Spinner = styled('div')`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function reducer(state, action) {
  switch (action.type) {
    case 'setCountryCasies':
      return { ...state, countryCase: action.payload };
    case 'setGlobalCase':
      return { ...state, globalCase: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    countryCase: null,
    globalCase: null,
  });

  const setCountryCasies = (countryCase) =>
    dispatch({ type: 'setCountryCasies', payload: countryCase });
  const setGlobalCase = (globalCase) =>
    dispatch({ type: 'setGlobalCase', payload: globalCase });

  React.useEffect(() => {
    CovidApi.getCovidCountries((cases) => setCountryCasies(cases));
    CovidApi.getCovidGlobalInfo((globalCase) => setGlobalCase(globalCase));
  }, []);

  if (!state.countryCase || !state.globalCase)
    return (
      <Spinner>
        <img src={loadingGif} alt="gif" />
      </Spinner>
    );

  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ padding: 20, marginRight: 10, fontSize: 20 }}>
          global cases: {state.globalCase.cases}{' '}
        </div>
        <div style={{ padding: 20, marginRight: 10, fontSize: 20 }}>
          global deaths: {state.globalCase.deaths}{' '}
        </div>
        <div style={{ padding: 20, marginRight: 10, fontSize: 20 }}>
          global recovered: {state.globalCase.recovered}{' '}
        </div>
      </div>
      <CountryContextProvider value={state.countryCase}>
        <CaseCard />
      </CountryContextProvider>
    </div>
  );
}

Spinner.displayName = 'Spinner';

export default App;
