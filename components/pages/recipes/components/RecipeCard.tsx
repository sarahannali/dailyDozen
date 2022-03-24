import React, { useState } from 'react';
import {
  Card, Col, Row, Modal, Rate, Badge, Spin,
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
  const [userData, setUserData] = useState({
    Favorite: recipe.Favorite,
    Rating: recipe.Rating,
  });
  const [loading, setLoading] = useState(false);

  const updateUserRecipe = async () => {
    setLoading(true);

    if (recipe.userRecipeID) {
      await putUserRecipe(recipe.userRecipeID, userData);
    } else {
      await postUserRecipe({
        RecipeID: recipe.id,
        ...userData,
      });
    }

    await updateRecipes();
    setLoading(false);
  };

  const onModalClose = async () => {
    if (userData.Favorite !== recipe.Favorite || userData.Rating !== recipe.Rating) {
      await updateUserRecipe();
    }

    setIsModalVisible(false);
  };

  const updateRating = (rating: number) => setUserData({ ...userData, Rating: rating });
  const updateFavorite = (favorite: boolean) => setUserData({ ...userData, Favorite: favorite });

  return (
    <Badge count={recipe.Favorite ? <HeartFilled style={{ color: '#eb2f96', fontSize: '20px' }} /> : 0}>
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
              defaultValue={+recipe.Favorite}
              character={<HeartFilled />}
              style={{ color: '#eb2f96', marginLeft: '10px' }}
              onChange={(e) => updateFavorite(e === 1)}
            />
          </span>
          )}
        visible={isModalVisible}
        onCancel={onModalClose}
        footer={null}
        style={{ marginTop: '-50px' }}
        bodyStyle={{ maxHeight: '600px', overflowY: 'auto' }}
      >
        <Spin spinning={loading}>
          <RecipeInfo
            recipe={recipe}
            nutritionGoalData={nutritionGoalData}
            updateRating={updateRating}
          />
        </Spin>
      </Modal>
    </Badge>
  );
}

export default RecipeCard;
