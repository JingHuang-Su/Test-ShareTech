import React from 'react';
import styled from 'styled-components';
import { useCountryCase } from '../Context/contryContext';

const StateCardWrapper = styled('div')`
  width: 270px;
  min-height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 10px;

  background-color: #0beef9;
  background-image: linear-gradient(315deg, #0beef9 0%, #48a9fe 74%);
`;

const CountryCardWrapper = styled('div')`
  width: 200px;
  min-height: 270px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 10px;

  background-color: #f6f6f6;
  background-image: linear-gradient(315deg, #f6f6f6 0%, #d7e1ec 74%);
`;

const StateCardRow = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
const CountryCardRow = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const StateCardContainer = styled('div')`
  width: 100%;
  padding: 15px;
`;

const Name = styled('div')`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${(props) =>
    props.location === 'state' ? '#f5f5fa' : 'rgba(0, 0, 0, 0.7)'};
`;

const Text = styled('div')`
  font-size: 14px;
  font-weight: 500;
  margin-top: 5px;
  color: rgba(0, 0, 0, 0.5);
`;

const StateTotalCase = styled('div')`
  font-size: 12px;
  font-weight: 600;
  margin-top: 5px;
`;

const StateTextRow = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-top: solid 1px rgba(0, 0, 0, 0.2);
`;

const Container = styled('div')`
  max-width: 900px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 auto;
`;

const Wrapper = styled('div')``;

export const getState = (data) => data.slice(0, 6);
export const getCountries = (data) => data.slice(8, data.length - 7);

const CaseCard = () => {
  const cases = useCountryCase();
  const countriesInfo = getCountries(cases);
  const stateInfo = getState(cases);
  let collCountry = [];
  let collState = [];

  stateInfo.forEach((d, i) => {
    const state = (
      <StateCardWrapper key={i}>
        <StateCardContainer>
          <Name location="state">{d.country}</Name>
          <StateTextRow>
            <div>
              <Text style={{ color: '#0075c9' }}>Total</Text>
              <StateTotalCase>{d.cases}</StateTotalCase>
            </div>
            <div>
              <Text>Today</Text>
              <StateTotalCase>{d.todayCases}</StateTotalCase>
            </div>
            <div>
              <Text style={{ color: '#933A16' }}>Death</Text>
              <StateTotalCase>{d.deaths}</StateTotalCase>
            </div>
          </StateTextRow>
        </StateCardContainer>
      </StateCardWrapper>
    );
    collState.push(state);
  });

  countriesInfo.forEach((d, i) => {
    const el = (
      <CountryCardWrapper key={i + 1000}>
        <StateCardContainer>
          <Name location="country">{d.country}</Name>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <Text style={{ color: '#0075c9', marginRight: 10, fontSize: 20 }}>
              Total
            </Text>
            <StateTotalCase
              style={{ color: '#0075c9', marginRight: 10, fontSize: 16 }}
            >
              {d.cases}
            </StateTotalCase>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ marginRight: 10, fontSize: 20 }}>Today</Text>
            <StateTotalCase
              style={{ color: '#0075c9', marginRight: 10, fontSize: 16 }}
            >
              {d.todayCases}
            </StateTotalCase>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#933A16', marginRight: 10, fontSize: 20 }}>
              Death
            </Text>
            <StateTotalCase
              style={{ color: '#0075c9', marginRight: 10, fontSize: 16 }}
            >
              {d.deaths}
            </StateTotalCase>
          </div>
        </StateCardContainer>
      </CountryCardWrapper>
    );
    collCountry.push(el);
  });

  const mapState = [...collState];
  const mapData = [...collCountry];

  return (
    <Wrapper>
      <Container>
        <StateCardRow>{mapState}</StateCardRow>
      </Container>
      <CountryCardRow>{mapData}</CountryCardRow>
    </Wrapper>
  );
};

Wrapper.displayName = 'Wrapper';
CountryCardRow.displayName = 'CountryCardRow';
StateCardRow.displayName = 'StateCardRow';
export default CaseCard;
