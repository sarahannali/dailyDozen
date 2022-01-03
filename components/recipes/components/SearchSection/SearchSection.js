import React from 'react';
import {Row, Col, Rate} from 'antd';
import { SearchBar } from '../../../common';

import {
  HeartFilled
} from '@ant-design/icons';

const SearchSection = ({baseRecipes, showFavorites, setShowFavorites, setCurrRecipes}) => {
  return (
    <Row>
      <Col span={3}></Col>
      <Col>
        <SearchBar 
          allData={baseRecipes}
          setData={setCurrRecipes}
          searchKeys={['name']}
        />
      </Col>
      <Col span={12}></Col>
      <Rate 
        count={1}
        value={showFavorites}
        character={<HeartFilled style={{color: showFavorites ? "#eb2f96" : "#caccce"}} />} 
        style={{color: '#eb2f96'}} 
        onChange={() => setShowFavorites(!showFavorites)}
      />
    </Row>
  );
};

export default SearchSection;
