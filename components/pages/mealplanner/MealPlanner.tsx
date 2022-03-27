import React, { useState, ReactElement } from 'react';
import {
  SyncOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from '@ant-design/icons';
import type { Recipe } from 'utils/propTypes/db';
import classes from 'components/css/mealPlanner.module.css';
import {
  DatePickerSection,
  GroceryListSection,
  DraggableAreas,
} from './components';
import type { Calendar } from './types';

interface MealPlannerProps {
  allRecipeData: Recipe[]
}

function MealPlanner({
  allRecipeData,
}: MealPlannerProps) {
  const [days, setDays] = useState<Calendar>([]);
  const [loadingSymbol, setLoadingSymbol] = useState<ReactElement | null>(null);

  const performRequest = async (request: (...args: any[]) => Promise<any>, body: unknown) => {
    let result = false;
    setLoadingSymbol(<SyncOutlined spin color="gray" />);

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
    <div className={classes.mealPlannerDiv}>
      <div className={classes.datePicker}>
        <DatePickerSection setDays={setDays} />
        <span className={classes.loadingSymbol}>{loadingSymbol}</span>
      </div>
      <DraggableAreas
        allRecipeData={allRecipeData}
        days={days}
        performRequest={performRequest}
        setDays={setDays}
      />
      <GroceryListSection days={days} />
    </div>
  );
}

export default MealPlanner;
