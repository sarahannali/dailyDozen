import {
  Button, Row, Spin, Typography,
} from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import { GroceryItem } from 'utils/propTypes/db';
import { getGroceryList, postGroceryList } from '../../requests';
import GroceryList from '../mealplanner/components/groceryList/GroceryList';
import classes from '../login/login.module.css';
import { AuthContext } from '../../contexts/AuthContext';
import { auth } from '../../../firebase/clientApp';

const { Title } = Typography;

function MobileGroceryList() {
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(AuthContext);

  const handleLogOut = (): void => {
    signOut(auth).then(() => {
      if (setUser) setUser(null);
    });
  };

  const updateAndPostGroceryList = (updatedGroceryList: GroceryItem[]) => {
    setGroceryList(updatedGroceryList);
    postGroceryList(updatedGroceryList);
  };

  useEffect(() => {
    setLoading(true);

    getGroceryList()
      .then((res) => {
        setGroceryList(res);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{
      height: '100vh', overflow: 'hidden', position: 'relative', backgroundColor: '#f2f9ff',
    }}
    >
      <Spin spinning={loading} size="large" style={{ marginTop: '170px' }}>
        <div className={classes.fullScreen}>
          <div className={classes.loginModal} style={{ overflowY: 'scroll', width: '80%', height: '80%' }}>
            <Row justify="center" style={{ marginBottom: '20px' }}>
              <Image src="/images/Icon.png" height={80} width={80} />
            </Row>
            <Row justify="center" style={{ marginBottom: '20px' }}>
              <Title level={2}>GROCERY LIST</Title>
            </Row>
            <GroceryList
              groceryList={groceryList}
              updateAndPostGroceryList={updateAndPostGroceryList}
            />
          </div>
          <Button
            danger
            type="primary"
            onClick={handleLogOut}
            style={{
              position: 'absolute',
              bottom: '15px',
            }}
          >
            Logout
          </Button>
        </div>
      </Spin>
    </div>
  );
}

export default MobileGroceryList;
