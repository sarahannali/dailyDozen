import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import GroceryList from './GroceryList';
import classes from './groceryList.module.css';
import { GroceryItem } from '../../../../utils/propTypes';
import { Calendar } from '../../utils/_populateCalendar';
import { UpdateGroceryList } from './utils';
import { postGroceryList } from './requests/post';

type GroceryListSectionProps = {
  days: Calendar,
  originalGroceryList: GroceryItem[]
}

function GroceryListSection({ days, originalGroceryList }: GroceryListSectionProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [groceryList, setGroceryList] = useState(originalGroceryList);

  const updateAndPostGroceryList = (updatedGroceryList: GroceryItem[]) => {
    setGroceryList(updatedGroceryList);
    postGroceryList(updatedGroceryList);
  };

  useEffect(() => {
    if (isModalVisible) {
      const updatedGroceryList = UpdateGroceryList(groceryList, days);
      updateAndPostGroceryList(updatedGroceryList);
    }
  }, [isModalVisible]);

  return (
    <div>
      <Button
        className={classes.groceryButton}
        onClick={() => setIsModalVisible(true)}
      >
        <ProfileOutlined />
      </Button>
      <Modal
        title="Grocery List"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        style={{ marginTop: '-50px' }}
        bodyStyle={{ maxHeight: '600px', overflowY: 'auto' }}
      >
        <GroceryList
          groceryList={groceryList}
          updateAndPostGroceryList={updateAndPostGroceryList}
        />
      </Modal>
    </div>
  );
}

export default GroceryListSection;
