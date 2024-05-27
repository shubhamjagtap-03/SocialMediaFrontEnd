import React from 'react';
import '../css/SearchResult.css';

function SearchResult({ user, onClick }) {
  return (
    <div onClick={onClick} className='search-result'>
      <h3>{user.userName} </h3>
      {/* Add more user information here */}
    </div>
  );
}

export default SearchResult;
