import React, {useState} from 'react';
import {Card, Col, Row, Modal} from 'antd';
import RecipeInfo from './RecipeInfo';
import classes from '../css/recipes.module.css';

const RecipeCard = ({recipe}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true)
  const handleCancel = () => setIsModalVisible(false)

  return (
    <div>
    <Card className={classes.recipecard} onClick={showModal} hoverable>
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
        title={recipe.name}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        bodyStyle={{overflowY: 'scroll', overflowX: 'hidden', marginBottom: '20px'}}
      >
        <RecipeInfo recipe={recipe} />
      </Modal>
    </div>
  );
};

export default RecipeCard;
