import React, { useEffect, useState } from 'react';
import { Button, Modal, Spin } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import GroceryList from './GroceryList';
import classes from './groceryList.module.css';
import { GroceryItem } from 'utils/propTypes/db';
import { Calendar } from '../../utils/_populateCalendar';
import { UpdateGroceryList } from './utils';
import { getGroceryList, postGroceryList } from '../../../../requests';

type GroceryListSectionProps = {
  days: Calendar
}

function GroceryListSection({ days }: GroceryListSectionProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);

  const updateAndPostGroceryList = (updatedGroceryList: GroceryItem[]) => {
    setGroceryList(updatedGroceryList);
    postGroceryList(updatedGroceryList);
  };

  useEffect(() => {
    if (isModalVisible && groceryList) {
      const updatedGroceryList = UpdateGroceryList(groceryList, days);
      updateAndPostGroceryList(updatedGroceryList);
    }
  }, [isModalVisible]);

  useEffect(() => {
    getGroceryList()
      .then((res) => {
        setGroceryList(res);
        setLoading(false);
      });
  }, []);

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
        <Spin spinning={loading}>
          {groceryList && (
          <GroceryList
            groceryList={groceryList}
            updateAndPostGroceryList={updateAndPostGroceryList}
          />
          )}
        </Spin>
      </Modal>
    </div>
  );
}

export default GroceryListSection;
