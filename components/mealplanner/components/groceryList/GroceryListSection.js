import React, {useState} from 'react';
import {Button, Modal} from 'antd';
import GroceryList from './GroceryList';
import classes from './groceryList.module.css';

import {ProfileOutlined} from '@ant-design/icons'

const GroceryListSection = ({days}) => {
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
      >
        <GroceryList days={days} />
      </Modal>
    </div>
  );
};

export default GroceryListSection;
