import React from 'react';
import { Row, Col, Rate } from 'antd';
import {
  HeartFilled,
} from '@ant-design/icons';
import SearchBar from './SearchBar';
import { Recipe } from '../../../../utils/propTypes';

type SearchSectionProps = {
  baseRecipes: Array<Recipe>,
  setCurrRecipes: React.Dispatch<React.SetStateAction<Recipe>>,
  showFavorites: boolean,
  setShowFavorites: React.Dispatch<React.SetStateAction<boolean>>
}

function SearchRecipeSection({
  baseRecipes, setCurrRecipes, showFavorites, setShowFavorites,
}: SearchSectionProps) {
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
        value={+showFavorites}
        character={<HeartFilled style={{ color: showFavorites ? '#eb2f96' : '#caccce' }} />}
        style={{ color: '#eb2f96', marginLeft: '10px', lineHeight: '1.3' }}
        onChange={() => setShowFavorites(!showFavorites)}
      />
    </Row>
  );
}

export default SearchRecipeSection;
