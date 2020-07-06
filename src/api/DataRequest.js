import axios from 'axios';

axios.defaults.baseURL = 'https://front-test.beta.aviasales.ru/';

// получили id поиска
const getSearchId = async () => {
  const response = await axios.get('/search');
  const { searchId } = response.data;
  return searchId;
};

// получили пачки билетов
const getData = async (searchId) => {
  const response = await axios.get(`tickets?searchId=${searchId}`);
  return response;
};

export { getSearchId, getData };
