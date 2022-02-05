import React, { useState } from 'react';
import {
  Card, Col, Row, Modal, Rate, Badge, Spin,
} from 'antd';
import {
  HeartFilled,
  LoadingOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import RecipeInfo from '../../../common/components/RecipeInfo/RecipeInfo';
import classes from './recipes.module.css';
import { NutritionGoals, Recipe, UserRecipe } from '../../../../utils/propTypes';
import { putUserRecipe } from '../../../requests/userRecipes/put';
import { postUserRecipe } from '../../../requests/userRecipes/post';

type RecipeCardProps = {
  recipe: Recipe,
  nutritionGoalData: NutritionGoals,
  updateRecipes: () => void
}

function RecipeCard({ recipe, nutritionGoalData, updateRecipes }: RecipeCardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userRecipeInfo, setUserRecipeInfo] = useState<UserRecipe>({
    id: recipe.userRecipeID,
    Favorite: recipe.Favorite,
    Rating: recipe.Rating,
  });
  const [loading, setLoading] = useState(false);

  const onCancel = async () => {
    if (userRecipeInfo.Favorite !== recipe.Favorite || userRecipeInfo.Rating !== recipe.Rating) {
      setLoading(true);

      if (userRecipeInfo.id) {
        await putUserRecipe(userRecipeInfo.id, {
          Rating: userRecipeInfo.Rating,
          Favorite: userRecipeInfo.Favorite,
        });
      } else {
        const id = await postUserRecipe({
          RecipeID: recipe.id,
          Rating: userRecipeInfo.Rating,
          Favorite: userRecipeInfo.Favorite,
        });

        setUserRecipeInfo({ ...userRecipeInfo, id });
      }

      updateRecipes();
    }

    setIsModalVisible(false);
    setLoading(false);
  };

  return (
    <Badge count={userRecipeInfo.Favorite ? <HeartFilled style={{ color: '#eb2f96', fontSize: '20px' }} /> : 0}>
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
              value={+userRecipeInfo.Favorite}
              character={<HeartFilled />}
              style={{ color: '#eb2f96', marginLeft: '10px' }}
              onChange={() => setUserRecipeInfo(() => ({
                ...userRecipeInfo,
                Favorite: !userRecipeInfo.Favorite,
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
          setUserRecipeInfo={setUserRecipeInfo}
        />
      </Modal>
    </Badge>
  );
}

export default RecipeCard;
