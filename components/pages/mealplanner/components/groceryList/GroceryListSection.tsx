import React, { useEffect, useState } from 'react';
import { Button, Modal, Spin } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import type { GroceryItem } from 'utils/propTypes/db';
import { getGroceryList, postGroceryList } from 'components/requests';
import classes from 'components/css/mealPlanner.module.css';
import GroceryList from './GroceryList';
import { UpdateGroceryList } from './utils';
import type { Calendar } from '../../types';

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible]);

  useEffect(() => {
    getGroceryList()
      .then((res) => {
        if (res) setGroceryList(res);
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
        className={classes.groceryModal}
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
