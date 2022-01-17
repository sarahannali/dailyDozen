import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import Fuse from 'fuse.js';

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
  }, [search]);

  return (
    <Search
      onChange={(e) => setSearch(e.target.value)}
      onSearch={(e) => setSearch(e)}
      style={{ width: '250px' }}
    />
  );
}

export default SearchBar;
