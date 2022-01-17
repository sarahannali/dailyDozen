import React, { useState, useEffect, ReactElement } from 'react';
import moment from 'moment';
import {
  SyncOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from '@ant-design/icons';
import {
  DatePickerSection,
  GroceryListSection,
  DraggableAreas,
} from './components';
import {
  PopulateCalendar,
} from './utils';
import {
  GroceryItem, MealEventResponse, NutritionGoalsWithMacros, Recipe,
} from '../../utils/propTypes';
import { Calendar } from './utils/_populateCalendar';

interface MealPlannerProps {
  allRecipeData: Recipe[],
  currentWeekMealEvents: MealEventResponse[],
  nutritionGoalData: NutritionGoalsWithMacros,
  groceryList: GroceryItem[]
}

function MealPlanner({
  allRecipeData, currentWeekMealEvents, nutritionGoalData, groceryList,
}: MealPlannerProps) {
  const [days, setDays] = useState<Calendar>([]);
  const [loadingSymbol, setLoadingSymbol] = useState<ReactElement | null>(null);

  useEffect(() => {
    setDays(PopulateCalendar(currentWeekMealEvents, moment().toDate()));
  }, [currentWeekMealEvents]);

  const performRequest = async (request: (x: any) => Promise<boolean>, body: unknown) => {
    let result = false;
    setLoadingSymbol(<SyncOutlined spin style={{ color: 'gray' }} />);

    try {
      result = await request(body);
      setLoadingSymbol(<CheckCircleTwoTone twoToneColor="#52c41a" />);
    } catch (err) {
      setLoadingSymbol(<CloseCircleTwoTone twoToneColor="#eb2f3c" />);
    } finally {
      setTimeout(() => setLoadingSymbol(null), 2000);
    }

    return result;
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <DatePickerSection setDays={setDays} />
        <span style={{ margin: '3px 0px 0px 10px', fontSize: '20px' }}>{loadingSymbol}</span>
      </div>
      <DraggableAreas
        allRecipeData={allRecipeData}
        nutritionGoalData={nutritionGoalData}
        days={days}
        performRequest={performRequest}
        setDays={setDays}
      />
      <GroceryListSection days={days} originalGroceryList={groceryList} />
    </div>
  );
}

export default MealPlanner;
