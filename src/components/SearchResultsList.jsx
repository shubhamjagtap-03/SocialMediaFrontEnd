import React from 'react';
import '../css/SearchResultsList.css';
import SearchResult from './SearchResult';

function SearchResultsList({ results, onResultClick }) {
  return (
    <div className='results-list'>
      
      {results.map((result) => (
        <SearchResult
          key={result.id}
          user={result}
          onClick={() => onResultClick(result)} // Pass result to onResultClick
        />
      ))}
    </div>
  );
}

export default SearchResultsList;
