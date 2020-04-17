import { getCovidByCountry, getCovidGlobalInfo } from './CovidApi';
import axios from 'axios';

jest.mock('axios');

describe('tests', () => {
  test('calls the getCovidByCountry callback on fetch api', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      const res = new Promise((resolve, reject) => {
        resolve({
          status: 200,
          json: () => {
            return mockData;
          },
        });
      });
      return res;
    });

    const mockData = {
      country: 'Taiwan',
      cases: 395,
      todayCases: 2,
      deaths: 6,
      todayDeaths: 0,
      recovered: 137,
      active: 252,
      critical: 0,
      casesPerOneMillion: 17,
      deathsPerOneMillion: 0,
      totalTests: 49748,
      testsPerOneMillion: 2089,
    };

    const mockGetCountryCovidInfo = jest.fn();
    await getCovidByCountry('taiwan', mockGetCountryCovidInfo);
    expect(mockGetCountryCovidInfo).toHaveBeenCalledWith(mockData);
  });
  test('calls the getCovidGlobalInfo callback on fetch api', async () => {
    const global = { cases: 2035737, deaths: 130802, recovered: 503386 };
    const response = { data: global };
    const mockFunc = jest.fn();
    axios.get.mockResolvedValue(response);
    await getCovidGlobalInfo(mockFunc);
    expect(mockFunc).toHaveBeenCalledWith(global);
  });
});
