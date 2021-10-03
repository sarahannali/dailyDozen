import React, {useState, useEffect} from 'react';
import {Button, DatePicker} from 'antd';
import RecipeBox from './RecipeBox/RecipeBox';
import {DragDropContext} from 'react-beautiful-dnd';
import Recipes from './RecipeBox/Recipes.json';
import Calendar from './Calendar/Calendar';
import classes from '../css/mealplanner.module.css';

import {LeftOutlined, RightOutlined, ProfileOutlined} from '@ant-design/icons';

const reorderMeals =
  (source, destination, recipes, days) => {
    let removed;
    const daysClone = Array.from(days);

    if (source.droppableId == 'Recipes') {
      removed = recipes[source.index];
    } else {
      const sourceCodes = source.droppableId.split(':');

      [removed] = daysClone
          .find((d) => d.id === sourceCodes[0])
          .meals
          .find((m) => m.id == sourceCodes[1])
          .recipes
          .splice(source.index, 1);
    }

    const destCodes = destination.droppableId.split(':');

    daysClone
        .find((d) => d.id === destCodes[0])
        .meals
        .find((m) => m.id == destCodes[1])
        .recipes
        .splice(destination.index, 0, removed);

    return daysClone;
  };

// api for fetching this weeks meals
const getDays = () => {
  return [
    {
      id: 'Sunday',
      date: '09/12',
      meals: [
        {
          id: 'breakfast',
          recipes: [],
        },
        {
          id: 'lunch',
          recipes: [],
        },
        {
          id: 'dinner',
          recipes: [],
        },
      ],
    },
    {
      id: 'Monday',
      date: '09/13',
      meals: [
        {
          id: 'breakfast',
          recipes: [],
        },
        {
          id: 'lunch',
          recipes: [],
        },
        {
          id: 'dinner',
          recipes: [],
        },
      ],
    },
    {
      id: 'Tuesday',
      date: '09/14',
      meals: [
        {
          id: 'breakfast',
          recipes: [],
        },
        {
          id: 'lunch',
          recipes: [],
        },
        {
          id: 'dinner',
          recipes: [],
        },
      ],
    },
    {
      id: 'Wednesday',
      date: '09/15',
      meals: [
        {
          id: 'breakfast',
          recipes: [],
        },
        {
          id: 'lunch',
          recipes: [],
        },
        {
          id: 'dinner',
          recipes: [],
        },
      ],
    },
    {
      id: 'Thursday',
      date: '09/16',
      meals: [
        {
          id: 'breakfast',
          recipes: [],
        },
        {
          id: 'lunch',
          recipes: [],
        },
        {
          id: 'dinner',
          recipes: [],
        },
      ],
    },
    {
      id: 'Friday',
      date: '09/17',
      meals: [
        {
          id: 'breakfast',
          recipes: [],
        },
        {
          id: 'lunch',
          recipes: [],
        },
        {
          id: 'dinner',
          recipes: [],
        },
      ],
    },
    {
      id: 'Saturday',
      date: '09/18',
      meals: [
        {
          id: 'breakfast',
          recipes: [],
        },
        {
          id: 'lunch',
          recipes: [],
        },
        {
          id: 'dinner',
          recipes: [],
        },
      ],
    },
  ];
};

const MealPlanner = () => {
  const [draggingRecipe, setDraggingRecipe] = useState(false);
  const [recipes] = useState(Recipes);
  const [days, setDays] = useState([]);

  useEffect(() => {
    setDays(getDays());
  }, []);

  const onDragEnd = (result) => {
    setDraggingRecipe(false);

    // dropped outside the list or back in recipes
    if (!result.destination || result.destination.droppableId == 'Recipes') {
      return;
    }

    setDays(reorderMeals(
        result.source,
        result.destination,
        recipes,
        days,
    ));
  };

  const onDragStart = (result) => {
    if (result.source.droppableId == 'Recipes') setDraggingRecipe(true);
  };

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  return (
    <div>
      <div className={classes.infoDiv}>
        <Button className={classes.weekButtons}>
          <LeftOutlined />
        </Button>
        <Button className={classes.weekButtons}>
          <RightOutlined />
        </Button>
        <DatePicker onChange={onChange} />
      </div>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Calendar days={days}/>
        <RecipeBox
          items={recipes}
          droppableId="Recipes"
          isDragging={draggingRecipe}
        />
      </DragDropContext>
      <Button className={classes.groceryButton}>
        <ProfileOutlined />
      </Button>
    </div>
  );
};

export default MealPlanner;
