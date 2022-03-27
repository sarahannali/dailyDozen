/* eslint-disable react/jsx-props-no-spreading */
import React, { CSSProperties, useState } from 'react';
import { Draggable, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import { Badge, Card, Typography } from 'antd';
import {
  HeartFilled,
} from '@ant-design/icons';
import Image from 'next/image';
import classes from 'components/css/mealPlanner.module.css';

const { Paragraph } = Typography;

const getItemStyle = (
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
): CSSProperties => ({
  userSelect: 'none',
  margin: '0 8px 0 0',
  backgroundColor: 'white',
  overflow: 'none',
  ...draggableStyle,
});

type RecipeProps = {
  recipeInfo: {
    id: string;
    name: string;
  },
  favorite: boolean,
  index: number,
  listName: string,
}

function Recipe({
  recipeInfo, index, listName, favorite,
}: RecipeProps) {
  const [hover, setHover] = useState(false);

  const onHoverImg = (
    <Paragraph className={classes.hoverImg} ellipsis={{ rows: 3 }}>
      {recipeInfo.name}
    </Paragraph>
  );

  return (
    <Draggable
      key={recipeInfo.name}
      draggableId={recipeInfo.name + listName + index}
      index={index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(provided.draggableProps.style)}
        >
          <Badge count={favorite ? <HeartFilled className={classes.heart} /> : 0}>
            <Card
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className={classes.card}
            >
              {hover
                ? onHoverImg
                : (
                  <Image
                    width={200}
                    height={200}
                    src={`/images/recipes/${recipeInfo.id}.png`}
                    alt={recipeInfo.name}
                    className={classes.recipeImg}
                  />
                )}
            </Card>
          </Badge>
        </div>
      )}
    </Draggable>
  );
}

export default Recipe;
