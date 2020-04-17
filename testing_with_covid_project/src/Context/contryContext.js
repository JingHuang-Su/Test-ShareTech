import React from 'react';

const countryContext = React.createContext();

export function useCountryCase() {
  const context = React.useContext(countryContext);

  if (!context) {
    throw new Error(
      'useCountryCase must be used within a CountryContextProvider'
    );
  }

  return context;
}

export function CountryContextProvider(props) {
  return <countryContext.Provider value={props.value} {...props} />;
}
