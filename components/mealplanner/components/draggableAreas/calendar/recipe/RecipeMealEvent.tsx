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
import { Meal } from '../../../../utils/_populateCalendar';

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
      <Paragraph style={{ marginBottom: '0px', height: '90px', width: '90px' }} ellipsis={{ rows: 3 }}>
        {name}
      </Paragraph>
      <Button
        className={classes.leftServingArrow}
        onClick={() => servings > 0 && setServings(servings - 1)}
        style={{ color: servings <= 0 ? 'gray' : 'black', zIndex: '1' }}
      >
        <CaretLeftOutlined />
      </Button>
      <Tooltip title="Servings">
        <div className={classes.servingSize}>{servings}</div>
      </Tooltip>
      <Button
        className={classes.rightServingArrow}
        onClick={() => setServings(servings + 1)}
        style={{ zIndex: '1' }}
      >
        <CaretRightOutlined />
      </Button>
    </>
  );
}

export default RecipeMealEvent;
