const URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchApi = () => (
  fetch(URL)
    .then((response) => response.json())
);

export default fetchApi;
