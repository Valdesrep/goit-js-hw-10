import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
import countryMurkupTmp from './js/templates/country.hbs';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  inputSerach: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputSerach.addEventListener('input', debounce(onSerachInput, DEBOUNCE_DELAY));

function onSerachInput(event) {
  clearMurkup();

  const countryToFind  = event.target.value.trim();
  if (countryToFind ) {
    fetchCountries(countryToFind )
      .then(countries => renderMurkup(countries))
      .catch(error => {
        console.log(error);
      });
  }
}

function renderMurkup(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }

  if (countries.length === 1) {
    refs.countryInfo.innerHTML = countryMurkupTmp(countries[0]);
  }

  if (countries.length <= 10 && countries.length >= 2) {
    refs.countryList.innerHTML = countries
      .map(country => {
        return `<p><img src="${country.flags.svg}" alt="flag" width="20px"> ${country.name.official}</p>`;
      })
      .join('');
  }
}

function clearMurkup() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
