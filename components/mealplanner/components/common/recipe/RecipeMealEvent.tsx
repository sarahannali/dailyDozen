import React from 'react';
import {
  Button, Popconfirm, Typography, Tooltip,
} from 'antd';
import {
  CloseOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';
import classes from './recipe.module.css';

const { Paragraph } = Typography;

type RecipeMealEventProps = {
  name: string,
  index: number,
  listName: string,
  meal: ,
  deleteMealEvent: ,
  servings: number,
  setServings: React.Dispatch<React.SetStateAction<number>>
}

function RecipeMealEvent({
  name, index, listName, meal, deleteMealEvent, servings, setServings,
}: RecipeMealEventProps) {
  return (
    <>
      <Popconfirm
        title="Are you sure to delete this meal event?"
        onConfirm={() => deleteMealEvent(meal.id, listName, index)}
        okText="Yes"
        cancelText="No"
        placement="leftTop"
      >
        <Button className={classes.deleteButton} type="primary" danger>
          <CloseOutlined />
        </Button>
      </Popconfirm>
      <Paragraph style={{ marginBottom: '0px', height: '90px', width: '90px' }} ellipsis={{ rows: 3 }}>
        {name}
      </Paragraph>
      <span
        className={classes.leftServingArrow}
        onClick={() => servings > 0 && setServings(servings - 1)}
        style={{ color: servings <= 0 ? 'gray' : 'black', zIndex: '1' }}
      >
        <CaretLeftOutlined />
      </span>
      <Tooltip title="Servings">
        <div className={classes.servingSize}>{servings}</div>
      </Tooltip>
      <span
        className={classes.rightServingArrow}
        onClick={() => setServings(servings + 1)}
        style={{ zIndex: '1' }}
      >
        <CaretRightOutlined />
      </span>
    </>
  );
}

export default RecipeMealEvent;
