import React from 'react';
import {Row, Col, Rate} from 'antd';
import SearchBar from './SearchBar';

import {
  HeartFilled
} from '@ant-design/icons';

const SearchSection = ({baseRecipes, setCurrRecipes, showFavorites, setShowFavorites}) => {
  return (
    <Row>
      <Col>
        <SearchBar 
          allData={baseRecipes}
          setData={setCurrRecipes}
          searchKeys={['name']}
        />
      </Col>
      <Rate 
        count={1}
        value={showFavorites}
        character={<HeartFilled style={{color: showFavorites ? "#eb2f96" : "#caccce"}} />} 
        style={{color: '#eb2f96', marginLeft: '10px', lineHeight: '1.3'}} 
        onChange={() => setShowFavorites(!showFavorites)}
      />
    </Row>
  );
};

export default SearchSection;
