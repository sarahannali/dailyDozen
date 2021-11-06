import React, {useState, useEffect} from 'react';
import {Button, DatePicker, Modal} from 'antd';
import RecipeBox from './recipeBox/RecipeBox';
import {DragDropContext} from 'react-beautiful-dnd';
import Calendar from './Calendar';
import GroceryList from './groceryList/GroceryList';
import classes from '../css/mealplanner.module.css';
import {ReorderMeals, PopulatedCalendar} from './utils/index';

import {LeftOutlined, RightOutlined, ProfileOutlined} from '@ant-design/icons'

const MealPlanner = ({allRecipeData, currentWeekMealEvents, allIngredientData}) => {
  const [draggingRecipe, setDraggingRecipe] = useState(false);
  const [recipes] = useState(allRecipeData);
  const [days, setDays] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true)
  const handleCancel = () => setIsModalVisible(false)

  useEffect(() => {
    setDays(PopulatedCalendar(allRecipeData, currentWeekMealEvents));
  }, []);

  const onDragEnd = (result) => {
    setDraggingRecipe(false);

    // dropped outside the list or back in recipes
    if (!result.destination || result.destination.droppableId == 'Recipes') {
      return;
    }

    setDays(ReorderMeals(
        result.source,
        result.destination,
        recipes,
        days,
    ));
  };

  const onDragStart = (result) => {
    if (result.source.droppableId == 'Recipes') setDraggingRecipe(true);
  };

  return (
    <div>
      <div className={classes.infoDiv}>
        <Button className={classes.weekButtons}>
          <LeftOutlined />
        </Button>
        <Button className={classes.weekButtons}>
          <RightOutlined />
        </Button>
        <DatePicker />
      </div>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Calendar days={days}/>
        <RecipeBox
          items={recipes}
          droppableId="Recipes"
          isDragging={draggingRecipe}
        />
      </DragDropContext>
      <Button
        className={classes.groceryButton}
        onClick={showModal}
      >
        <ProfileOutlined />
      </Button>
      <Modal
        title="Grocery List"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <GroceryList days={days} allIngredientData={allIngredientData} />
      </Modal>
    </div>
  );
};

export default MealPlanner;
