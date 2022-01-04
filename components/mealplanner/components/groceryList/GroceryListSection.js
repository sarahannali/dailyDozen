import React, {useState} from 'react';
import {Button, Modal} from 'antd';
import GroceryList from './GroceryList';
import classes from './groceryList.module.css';

import {ProfileOutlined} from '@ant-design/icons'

const GroceryListSection = ({days, groceryList}) => {
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
        style={{marginTop: '-50px'}}
        bodyStyle={{maxHeight: '600px', overflowY: 'auto', overflowX: 'none'}}
      >
        <GroceryList days={days} originalGroceryList={groceryList} />
      </Modal>
    </div>
  );
};

export default GroceryListSection;
