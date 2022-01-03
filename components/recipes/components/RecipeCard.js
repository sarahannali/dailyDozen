import React, {useState} from 'react';
import {Card, Col, Row, Modal, Rate, Badge, Spin} from 'antd';
import RecipeInfo from './RecipeInfo/RecipeInfo';
import { putUserRecipe } from '../requests';
import classes from './recipes.module.css';

import {
  HeartFilled,
  LoadingOutlined
} from '@ant-design/icons';

const RecipeCard = ({recipe, nutritionGoalData, updateRecipes}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState({Favorite: recipe.Favorite, Rating: recipe.Rating});
  const [loading, setLoading] = useState(false);

  const onCancel = async () => {
    if (recipeInfo.Favorite != recipe.Favorite || recipeInfo.Rating != recipe.Rating) {
      setLoading(true);

      await putUserRecipe({
        id: recipe.userRecipeID,
        Rating: recipeInfo.Rating,
        Favorite: recipeInfo.Favorite
      });
  
      updateRecipes();
    }

    setIsModalVisible(false);
    setLoading(false);
  }

  return (
    <Badge count={recipeInfo.Favorite ? <HeartFilled style={{color: '#eb2f96', fontSize:'20px'}}/> : null}>
      <Card className={classes.recipecard} onClick={() => setIsModalVisible(true)} hoverable>
        <Row>
          <Col span={12}>
            <img src={recipe.imageURL} className={classes.recipecardimg} />
          </Col>
          <Col span={12}>
            {recipe.name}
          </Col>
        </Row>
      </Card>
      <Modal
          title={
            <span>
              {recipe.name}
              <Rate 
                count={1}
                value={recipeInfo.Favorite}
                character={<HeartFilled />} 
                style={{color: '#eb2f96', marginLeft: '10px'}} 
                onChange={() => setRecipeInfo(() => {
                  return {...recipeInfo, Favorite: !recipeInfo.Favorite}
                })}
              />
            </span>
          }
          visible={isModalVisible}
          onCancel={onCancel}
          footer={null}
          style={{marginTop: '-50px'}}
          bodyStyle={{maxHeight: '600px', overflowY: 'auto', overflowX: 'none'}}
        >
          <Spin
            spinning={loading}
            indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
          >
            <RecipeInfo recipe={recipe} nutritionGoalData={nutritionGoalData} setRecipeInfo={setRecipeInfo} />
          </Spin>
        </Modal>
    </Badge>
  );
};

export default RecipeCard;
