import Link from 'next/link'
import React from 'react';
import {Card, Col, Row} from 'antd';
import classes from '../css/recipes.module.css';

const RecipeCard = ({id, image, name}) => {
  return (
    <Link href={`recipes/${id}`}>
      <div>
      <Card className={classes.recipecard} hoverable>
        <Row>
          <Col span={12}>
            <img src={image} className={classes.recipecardimg} />
          </Col>
          <Col span={12}>
            {name}
          </Col>
        </Row>
      </Card>
      </div>
    </Link>
  );
};

export default RecipeCard;
