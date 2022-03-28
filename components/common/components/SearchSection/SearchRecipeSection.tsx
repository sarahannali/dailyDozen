import React from 'react';
import { Row, Col, Rate } from 'antd';
import {
  HeartFilled,
} from '@ant-design/icons';
import type { Recipe } from 'utils/propTypes/db';
import classes from 'components/css/searchSection.module.css';
import SearchBar from './SearchBar';

type SearchSectionProps = {
  baseRecipes: Recipe[],
  setCurrRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>,
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
        className={classes.favoriteHeart}
        onChange={() => setShowFavorites(!showFavorites)}
      />
    </Row>
  );
}

export default SearchRecipeSection;
