import React from 'react'
import '../css/SearchBar.css'
import { useState,useEffect } from 'react'
import {FaSearch} from 'react-icons/fa'


function SearchBar({selectedResult,onSearch}) {
    const[input,setInput]=useState('');

    useEffect(() => {
      console.log('selectedResult:', selectedResult);
      if (selectedResult) {
        setInput(selectedResult.userName);
        
      } else {
        setInput('');
      }
    }, [selectedResult]);

const handleChange = (value) => {
  console.log('Input value:', value);
  setInput(value);
  onSearch(value);
};
    
  return (
       
    <div className='input-wrapper'>
        <FaSearch id='search-icon'></FaSearch>
        <input placeholder='type to search user....'
        value={input}
        onChange={(e)=>handleChange(e.target.value)}
        ></input>
    
       
      
    </div>
    
  )
}

export default SearchBar;
