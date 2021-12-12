import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {
  DatePickerSection,
  GroceryListSection,
  DraggableAreas
} from './components';
import {
  PopulateCalendar
} from './utils';

import {
  SyncOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone
} from '@ant-design/icons';

const MealPlanner = ({allRecipeData, currentWeekMealEvents, nutritionGoalData}) => {
  const [days, setDays] = useState([]);
  const [loadingSymbol, setLoadingSymbol] = useState(null);

  useEffect(() => {
    setDays(PopulateCalendar(currentWeekMealEvents, moment().toDate()));
  }, []);

  const performRequest = async (request, body) => {
    let result;
    setLoadingSymbol(<SyncOutlined spin style={{color: "gray"}} />);

    try {
      result = await request(body);
      setLoadingSymbol(<CheckCircleTwoTone twoToneColor="#52c41a" />);
    }
    catch (err) {
      setLoadingSymbol(<CloseCircleTwoTone twoToneColor="#eb2f3c" />);
      console.log("ERROR: ", err)
    }
    finally {
      setTimeout(() => setLoadingSymbol(null), 2000);
    }

    return result;
  }

  return (
    <div>
      <div style={{display: 'flex'}}>
        <DatePickerSection setDays={setDays} />
        <span style={{margin: '3px 0px 0px 10px', fontSize: '20px'}}>{loadingSymbol}</span>
      </div>
      <DraggableAreas
        allRecipeData={allRecipeData}
        nutritionGoalData={nutritionGoalData}
        days={days}
        performRequest={performRequest}
        setDays={setDays}
      />
      <GroceryListSection days={days} />
    </div>
  );
};

export default MealPlanner;
