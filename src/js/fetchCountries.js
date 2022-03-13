import { Notify } from 'notiflix/build/notiflix-notify-aio';
const BASE_URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}?fields=name,capital,languages,flags,population`)
  .then(
    response => {
      if (response.status === 404) {
        Notify.failure('Oops, there is no country with that name');
      }
      return response.json();
    },
  );
}
 