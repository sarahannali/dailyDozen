/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Draggable, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import { Badge } from 'antd';
import {
  HeartFilled,
} from '@ant-design/icons';
import RecipeCard from './RecipeCard';
import { Meal } from '../../../utils/_populateCalendar';
import { MealEvent } from '../../../../../utils/propTypes';

const getItemStyle = (draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
  userSelect: 'none',
  margin: '0 8px 0 0',
  backgroundColor: 'white',
  overflow: 'none',
  ...draggableStyle,
});

type RecipeProps = {
  isMealEvent?: boolean,
  recipeInfo: {
    imageURL: string;
    name: string;
  },
  index: number,
  listName: string,
  favorite?: boolean,
  meal?: Meal,
  deleteMealEvent?: (mealEventID: string, codes: string, sourceIdx: number) => Promise<void>,
  updateMealEvent?: (movedObj: MealEvent, codes: string, sourceIdx: number) => Promise<void>,
  givenServings?: number
}

const defaultProps = {
  isMealEvent: false,
  favorite: false,
  meal: null,
  deleteMealEvent: null,
  updateMealEvent: null,
  givenServings: 1,
};

function Recipe({
  isMealEvent,
  recipeInfo,
  index,
  listName,
  favorite,
  meal,
  deleteMealEvent = () => {},
  updateMealEvent = () => {},
  givenServings,
}: RecipeProps) {
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
                <RecipeCard
                  isMealEvent={isMealEvent}
                  recipeInfo={recipeInfo}
                  index={index}
                  listName={listName}
                  meal={meal}
                  deleteMealEvent={deleteMealEvent}
                  updateMealEvent={updateMealEvent}
                  givenServings={givenServings}
                />
              </Badge>
            )
            : (
              <RecipeCard
                isMealEvent={isMealEvent}
                recipeInfo={recipeInfo}
                index={index}
                listName={listName}
                meal={meal}
                deleteMealEvent={deleteMealEvent}
                updateMealEvent={updateMealEvent}
                givenServings={givenServings}
              />
            )
        }
        </div>
      )}
    </Draggable>
  );
}

Recipe.defaultProps = defaultProps;

export default Recipe;
