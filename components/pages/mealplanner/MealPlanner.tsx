import React, { useState, ReactElement } from 'react';
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
import { Recipe } from '../../../utils/propTypes';
import { Calendar } from './utils/_populateCalendar';

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
    <div style={{ overflowX: 'scroll', minHeight: '100vh' }}>
      <div style={{ display: 'flex' }}>
        <DatePickerSection setDays={setDays} />
        <span style={{ margin: '3px 0px 0px 10px', fontSize: '20px' }}>{loadingSymbol}</span>
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
