import React, {useState} from 'react';
import {Card, Col, Row, Modal, Rate, Badge} from 'antd';
import RecipeInfo from './RecipeInfo/RecipeInfo';
import classes from './recipes.module.css';

import {
  HeartFilled 
} from '@ant-design/icons';

const RecipeCard = ({recipe, nutritionGoalData}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [favorite, setFavorite] = useState(true);

  return (
    <Badge count={<HeartFilled style={{color: '#eb2f96', fontSize:'20px'}}/>}>
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
                character={<HeartFilled />} 
                style={{color: '#eb2f96', marginLeft: '10px'}} 
              />
            </span>
          }
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          bodyStyle={{overflowY: 'scroll', overflowX: 'hidden', marginBottom: '20px'}}
        >
          <RecipeInfo recipe={recipe} nutritionGoalData={nutritionGoalData} />
        </Modal>
    </Badge>
  );
};

export default RecipeCard;
