import React, { useState, useEffect } from 'react';
import {Input} from 'antd';
import Fuse from 'fuse.js';

const {Search} = Input;

const SearchBar = ({allData, setData, searchKeys}) => {
  const [search, setSearch] = useState("");

  const fuse = new Fuse(allData, {
    keys: searchKeys
  });

  useEffect(() => {
    if (search == "") setData(allData);
    else {
      const foundData = fuse.search(search).map(i => i.item);
      setData(foundData);
    }
  }, [search])

  return (
    <Search 
      onChange={(e) => setSearch(e.target.value)} 
      onSearch={(e) => setSearch(e)}
      style={{width: '250px'}}
    />
  );
};

export default SearchBar;
