import React, { useState } from 'react';
import {
  Card, Col, Row, Modal, Rate, Badge, Spin,
} from 'antd';
import {
  HeartFilled,
  LoadingOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import RecipeInfo from './RecipeInfo/RecipeInfo';
import { putUserRecipe } from '../requests';
import classes from './recipes.module.css';
import { NutritionGoals, Recipe } from '../../../utils/propTypes';

type RecipeCardProps = {
  recipe: Recipe,
  nutritionGoalData: NutritionGoals,
  updateRecipes: () => void
}

function RecipeCard({ recipe, nutritionGoalData, updateRecipes }: RecipeCardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState({
    Favorite: recipe.Favorite,
    Rating: recipe.Rating,
  });
  const [loading, setLoading] = useState(false);

  const onCancel = async () => {
    if (recipeInfo.Favorite !== recipe.Favorite || recipeInfo.Rating !== recipe.Rating) {
      setLoading(true);

      await putUserRecipe({
        id: recipe.userRecipeID,
        Rating: recipeInfo.Rating,
        Favorite: recipeInfo.Favorite,
      });

      updateRecipes();
    }

    setIsModalVisible(false);
    setLoading(false);
  };

  return (
    <Badge count={recipeInfo.Favorite ? <HeartFilled style={{ color: '#eb2f96', fontSize: '20px' }} /> : 0}>
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
              value={+recipeInfo.Favorite}
              character={<HeartFilled />}
              style={{ color: '#eb2f96', marginLeft: '10px' }}
              onChange={() => setRecipeInfo(() => ({
                ...recipeInfo,
                Favorite: !recipeInfo.Favorite,
              }))}
            />
            <Spin
              spinning={loading}
              indicator={<LoadingOutlined style={{ fontSize: 10, marginLeft: '10px' }} spin />}
            />
          </span>
          )}
        visible={isModalVisible}
        onCancel={onCancel}
        footer={null}
        style={{ marginTop: '-50px' }}
        bodyStyle={{ maxHeight: '600px', overflowY: 'auto' }}
      >
        <RecipeInfo
          recipe={recipe}
          nutritionGoalData={nutritionGoalData}
          setRecipeInfo={setRecipeInfo}
        />
      </Modal>
    </Badge>
  );
}

export default RecipeCard;
