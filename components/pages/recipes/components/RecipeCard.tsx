import React, { useState } from 'react';
import {
  Card, Col, Row, Modal, Rate, Badge,
} from 'antd';
import { HeartFilled } from '@ant-design/icons';
import Image from 'next/image';
import RecipeInfo from '../../../common/components/RecipeInfo/RecipeInfo';
import classes from './recipes.module.css';
import { NutritionGoals, Recipe } from '../../../../utils/propTypes';
import { putUserRecipe } from '../../../requests/userRecipes/put';
import { postUserRecipe } from '../../../requests/userRecipes/post';

type RecipeCardProps = {
  recipe: Recipe,
  nutritionGoalData: NutritionGoals,
  updateRecipes: () => void
}

function RecipeCard({ recipe, nutritionGoalData, updateRecipes }: RecipeCardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [localUserData, setLocalUserData] = useState({
    Rating: recipe.Rating,
    Favorite: recipe.Favorite,
  });

  const updateUserRecipe = async (favorite: boolean, rating: number) => {
    const newUserRecipe = {
      Rating: rating,
      Favorite: favorite,
    };

    if (recipe.userRecipeID) {
      await putUserRecipe(recipe.userRecipeID, newUserRecipe);
    } else {
      await postUserRecipe({
        RecipeID: recipe.id,
        ...newUserRecipe,
      });
    }

    setLocalUserData(newUserRecipe);
    updateRecipes();
  };

  return (
    <Badge count={localUserData.Favorite ? <HeartFilled style={{ color: '#eb2f96', fontSize: '20px' }} /> : 0}>
      <Card className={classes.recipecard} onClick={() => setIsModalVisible(true)} hoverable>
        <Row>
          <Col span={12}>
            <Image
              loader={() => recipe.imageURL}
              width={100}
              height={100}
              src={recipe.imageURL}
              className={classes.recipecardimg}
            />
          </Col>
          <Col span={12}>
            {recipe.name}
          </Col>
        </Row>
      </Card>
      <Modal
        title={(
          <span>
            {recipe.name}
            <Rate
              count={1}
              value={+localUserData.Favorite}
              character={<HeartFilled />}
              style={{ color: '#eb2f96', marginLeft: '10px' }}
              onChange={() => updateUserRecipe(!localUserData.Favorite, localUserData.Rating)}
            />
          </span>
          )}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        style={{ marginTop: '-50px' }}
        bodyStyle={{ maxHeight: '600px', overflowY: 'auto' }}
      >
        <RecipeInfo
          recipe={recipe}
          nutritionGoalData={nutritionGoalData}
          updateUserRecipe={updateUserRecipe}
          localUserData={localUserData}
        />
      </Modal>
    </Badge>
  );
}

export default RecipeCard;
