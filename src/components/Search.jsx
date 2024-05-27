import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchResultsList from './SearchResultsList';
import axios from 'axios';


function Search({setProgress}) {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() =>{
    setProgress(30);
    setTimeout(() => {
        setProgress(100);
    },1000)
  },[])

  useEffect(() => {
    if (!loading) {
      return;
    }

    const fetchData = async (value) => {
      try {
        const response = await axios.get(`http://localhost:3001/users/search?query=${value}`);
        setResults(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (loading) {
      fetchData(selectedResult);
    }
  }, [loading, selectedResult]);

  const handleResultClick = (result) => {
    setSelectedResult(result);
    setLoading(true); // Start fetching data when a result is clicked
  };

  return (
    <div className='main-container'>
      <div className='searchBar-container'>
        <SearchBar selectedResult={selectedResult} onSearch={setSelectedResult} />
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {!loading && !error && (
          <SearchResultsList results={results} onResultClick={handleResultClick} />
        )}
      </div>
    </div>
  );
}

export default Search;
