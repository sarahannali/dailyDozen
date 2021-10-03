import React, {useState} from 'react';
import {Draggable} from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import {Card} from 'antd';
import styled from 'styled-components';
import {Typography} from 'antd';

const {Paragraph} = Typography;

const grid = 8;

const Image = styled.img`
  max-width: 90px;
  height: 90px;
  object-fit: cover;
`;

const StyledCard = styled(Card)`
  width: 138px;
  height: 138px;
`;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  margin: `0 ${grid}px 0 0`,
  backgroundColor: 'white',
  overflow: 'none',
  ...draggableStyle,
});

const Recipe = ({image, name, index, listName}) => {
  const [hover, setHover] = useState(false);
  return (
    <Draggable key={name} draggableId={name + listName + index} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style,
          )}
        >
          <Card
            className={classes.card}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {hover ?
            <Paragraph ellipsis={{rows: 3}}>
              {name}
            </Paragraph > :
            <img src={image} className={classes.recipeImg} />
            }
          </Card>
        </div>
      )}
    </Draggable>
  );
};

Recipe.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  index: Number,
  listName: PropTypes.string,
};

export default Recipe;
