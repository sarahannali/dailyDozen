import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import Fuse from 'fuse.js';
import classes from 'components/css/searchSection.module.css';

const { Search } = Input;

type SearchBarProps = {
  allData: unknown[],
  setData: React.Dispatch<React.SetStateAction<any[]>>,
  searchKeys: string[]
}

function SearchBar({ allData, setData, searchKeys }: SearchBarProps) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fuse = new Fuse(allData, {
      keys: searchKeys,
    });

    if (search === '') setData(allData);
    else {
      const foundData = fuse.search(search).map((i) => i.item);
      setData(foundData);
    }
  }, [search, allData, setData, searchKeys]);

  return (
    <Search
      onChange={(e) => setSearch(e.target.value)}
      onSearch={(e) => setSearch(e)}
      className={classes.search}
    />
  );
}

export default SearchBar;
