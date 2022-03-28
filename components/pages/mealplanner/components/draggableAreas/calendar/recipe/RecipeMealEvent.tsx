import React from 'react';
import {
  Button, Popconfirm, Typography, Tooltip,
} from 'antd';
import {
  CloseOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';
import classes from 'components/css/mealPlanner.module.css';
import type { Meal } from 'components/pages/mealplanner/types';

const { Paragraph } = Typography;

type RecipeMealEventProps = {
  name: string,
  index: number,
  listName: string,
  meal: Meal,
  deleteMealEvent: (mealEventID: string, codes: string, sourceIdx: number) => Promise<void>,
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
        onConfirm={() => meal.id && deleteMealEvent(meal.id, listName, index)}
        okText="Yes"
        cancelText="No"
        placement="leftTop"
      >
        <Button className={classes.deleteButton} type="primary" danger>
          <CloseOutlined />
        </Button>
      </Popconfirm>
      <Paragraph
        style={{ marginBottom: '0px' }}
        className={classes.recipeMealEventName}
        ellipsis={{ rows: 3 }}
      >
        {name}
      </Paragraph>
      <Button
        onClick={() => servings > 0 && setServings(servings - 1)}
        className={`${classes.recipeServingButtons} ${classes.leftServingArrow}`}
        style={{ color: servings <= 0 ? 'gray' : 'black' }}
      >
        <CaretLeftOutlined />
      </Button>
      <Tooltip title="Servings">
        <div className={classes.servingSize}>{servings}</div>
      </Tooltip>
      <Button
        onClick={() => setServings(servings + 1)}
        className={`${classes.recipeServingButtons} ${classes.rightServingArrow}`}
      >
        <CaretRightOutlined />
      </Button>
    </>
  );
}

export default RecipeMealEvent;
