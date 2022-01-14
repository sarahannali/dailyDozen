import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import GroceryList from './GroceryList';
import classes from './groceryList.module.css';
import { GroceryItem } from '../../../../utils/propTypes';
import { Calendar } from '../../utils/_populateCalendar';

type GroceryListSectionProps = {
  days: Calendar,
  groceryList: GroceryItem[]
}

function GroceryListSection({ days, groceryList }: GroceryListSectionProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        <GroceryList days={days} originalGroceryList={groceryList} />
      </Modal>
    </div>
  );
}

export default GroceryListSection;
