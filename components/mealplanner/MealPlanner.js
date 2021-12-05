import React, {useState, useEffect} from 'react';
import {Button, DatePicker, Modal, notification} from 'antd';
import RecipeBox from './recipeBox/RecipeBox';
import {DragDropContext} from 'react-beautiful-dnd';
import Calendar from './Calendar';
import GroceryList from './groceryList/GroceryList';
import classes from '../css/mealplanner.module.css';
import {ReorderMeals, PopulateCalendar, DeleteMeal, UpdateMeal} from './utils';
import axios from 'axios';
import moment from 'moment';

import {LeftOutlined, RightOutlined, ProfileOutlined} from '@ant-design/icons'

const MealPlanner = ({allRecipeData, currentWeekMealEvents, allNutritionData}) => {
  const [draggingRecipe, setDraggingRecipe] = useState(false);
  const [recipes] = useState(allRecipeData);
  const [days, setDays] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)

  const showModal = () => setIsModalVisible(true)
  const handleCancel = () => setIsModalVisible(false)

  useEffect(() => {
    setDays(PopulateCalendar(currentWeekMealEvents, moment().toDate()));
  }, []);

  const onDragEnd = (result) => {
    setDraggingRecipe(false);

    // dropped outside the list or back in recipes
    if (!result.destination || result.destination.droppableId == 'Recipes') {
      return;
    }

    const [newDays, movedObj] = ReorderMeals(
      result.source,
      result.destination,
      recipes,
      days
    )

    setDays(newDays);

    if (result.source.droppableId == 'Recipes') {
      axios.post(`/api/mealPlanner/`, movedObj)
      .then(function (response) {
        const destCodes = result.destination.droppableId.split(':');
        const daysClone = Array.from(days);
        daysClone
          .find((d) => d.id === destCodes[0])
          .meals[destCodes[1]][result.destination.index].id = response.data;
        setDays(daysClone); //TODO: clean upppp

        notification['success']({
          message: 'Changes Saved', // TODO update to the next.js loading symbol thing
        });
      })
      .catch(function (error) {
        notification['error']({
          message: 'Error',
        });
      });
    } else {
      axios.post(`/api/mealPlanner/${movedObj.id}`, movedObj)
        .then(function (response) {
          const destCodes = result.destination.droppableId.split(':');
          const daysClone = Array.from(days);
          daysClone
            .find((d) => d.id === destCodes[0])
            .meals[destCodes[1]][result.destination.index].id = response.data;
          setDays(daysClone); //TODO: clean upppp

          notification['success']({
            message: 'Changes Saved', // TODO update to the next.js loading symbol thing
          });
        })
        .catch(function (error) {
          notification['error']({
            message: 'Error',
          });
        });
    }
  };

  const updateServings = (mealEventID, key, servings, sourceIdx) => {
    axios.post(`/api/mealPlanner/${mealEventID}`, {Servings: servings})
    .then(function (response) {
      notification['success']({
        message: 'Changes Saved', // TODO update to the next.js loading symbol thing
      });
    })
    .catch(function (error) {
      notification['error']({
        message: 'Error',
      });
    });

    const destCodes = key.split(':');
    const newDays = UpdateMeal(destCodes, sourceIdx, days, servings);// TODO clean this up

    setDays([...newDays]);
  }

  const deleteMealEvent = (mealEventID, key, sourceIdx) => {
    axios.delete(`/api/mealPlanner/${mealEventID}`)
      .then(function (response) {
        notification['success']({
          message: 'Changes Saved', // TODO update to the next.js loading symbol thing
        });
      })
      .catch(function (error) {
        notification['error']({
          message: 'Error',
        });
      });
  
      const destCodes = key.split(':');
      const [_, newDays] = DeleteMeal(destCodes, sourceIdx, days);// TODO clean this up

      setDays([...newDays]);
  }

  const onDragStart = (result) => {
    if (result.source.droppableId == 'Recipes') setDraggingRecipe(true);
  };

  const handleDateChange = (dateStr) => {
    axios.get('/api/mealPlanner', { params: { date: dateStr } })
      .then(function (response) {
        setDays(PopulateCalendar(response.data, moment(dateStr).toDate()));
      })
      .catch(function (error) {
        console.log(error);
      });
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
        <DatePicker defaultValue={moment()} onBlur={(e) => handleDateChange(e.target.value)}/>
      </div>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Calendar days={days} allNutritionData={allNutritionData} deleteMealEvent={deleteMealEvent} updateServings={updateServings}/>
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
        <GroceryList days={days} />
      </Modal>
    </div>
  );
};

export default MealPlanner;
