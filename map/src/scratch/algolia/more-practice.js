const TEMP_ALGOLIA_SEARCH_KEY = '64cbbb13b660c14d05c65214d63b1ea8';
const ALGOLIA_APP_ID = 'F7OG87T3T6';
import algoliasearch from 'algoliasearch';
import fs from 'fs';

const client = algoliasearch(ALGOLIA_APP_ID, TEMP_ALGOLIA_SEARCH_KEY);
const index = client.initIndex('contacts');

// Search for a first name
index.search('jimmie').then(({ hits }) => {
  console.log(hits);
});

// Search for a first name with typo
index.search('jimie').then(({ hits }) => {
  console.log(hits);
});

// Search for a company
index.search('california paint').then(({ hits }) => {
  console.log(hits);
});

// Search for a first name and a company
index.search('jimmie paint').then(({ hits }) => {
  console.log(hits);
});
