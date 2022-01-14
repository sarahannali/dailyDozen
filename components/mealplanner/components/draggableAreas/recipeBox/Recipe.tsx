/* eslint-disable react/jsx-props-no-spreading */
import React, { CSSProperties, useState } from 'react';
import { Draggable, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import { Badge, Card, Typography } from 'antd';
import {
  HeartFilled,
} from '@ant-design/icons';
import Image from 'next/image';
import classes from './recipeBox.module.css';

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
    imageURL: string;
    name: string;
  },
  favorite: boolean,
  index: number,
  listName: string,
}

function Recipe({
  recipeInfo,
  index,
  listName,
  favorite,
}: RecipeProps) {
  const [hover, setHover] = useState(false);

  const onHoverImg = (
    <Paragraph style={{ marginBottom: '0px', height: '90px', width: '90px' }} ellipsis={{ rows: 3 }}>
      {recipeInfo.name}
    </Paragraph>
  );

  return (
    <Draggable key={recipeInfo.name} draggableId={recipeInfo.name + listName + index} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            provided.draggableProps.style,
          )}
        >
          {
          favorite
            ? (
              <Badge count={<HeartFilled style={{ color: '#eb2f96', fontSize: '20px' }} />}>
                <Card
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  className={classes.card}
                >
                  {hover
                    ? onHoverImg
                    : <Image src={recipeInfo.imageURL} className={classes.recipeImg} />}
                </Card>
              </Badge>
            )
            : (
              <Card
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className={classes.card}
              >
                {hover
                  ? onHoverImg
                  : <Image src={recipeInfo.imageURL} className={classes.recipeImg} />}
              </Card>
            )
        }
        </div>
      )}
    </Draggable>
  );
}

export default Recipe;
