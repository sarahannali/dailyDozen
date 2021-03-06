import React, { useEffect, useState } from 'react';
import {
  Card, Col, Row, Modal, Rate, Badge, Spin,
} from 'antd';
import { HeartFilled } from '@ant-design/icons';
import Image from 'next/image';
import type { NutritionGoals, Recipe } from 'utils/propTypes/db';
import { putUserRecipe, postUserRecipe } from 'components/requests';
import classes from 'components/css/recipes.module.css';
import RecipeInfo from './RecipeInfo/RecipeInfo';

type RecipeCardProps = {
  recipe: Recipe,
  nutritionGoalData: NutritionGoals,
  updateRecipes: () => Promise<void>
}

function RecipeCard({ recipe, nutritionGoalData, updateRecipes }: RecipeCardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userData, setUserData] = useState({
    Favorite: recipe.Favorite,
    Rating: recipe.Rating,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserData({
      Favorite: recipe.Favorite,
      Rating: recipe.Rating,
    });
  }, [recipe.Favorite, recipe.Rating]);

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
    <Badge count={recipe.Favorite ? <HeartFilled className={classes.favoriteHeart} /> : 0}>
      <Card className={classes.recipecard} onClick={() => setIsModalVisible(true)} hoverable>
        <Row>
          <Col span={12}>
            <Image
              width={100}
              height={100}
              src={`/images/recipes/${recipe.id}.png`}
              alt={recipe.name}
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
              className={classes.favoriteHeartModal}
              onChange={(e) => updateFavorite(e === 1)}
            />
          </span>
          )}
        visible={isModalVisible}
        onCancel={onModalClose}
        footer={null}
        className={classes.recipeModal}
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
