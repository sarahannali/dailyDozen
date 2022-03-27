import {
  Button, Row, Spin, Typography,
} from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import type { GroceryItem } from 'utils/propTypes/db';
import { getGroceryList, postGroceryList } from 'components/requests';
import classes from 'components/css/login.module.css';
import { AuthContext } from 'components/contexts/AuthContext';
import { auth } from 'firebaseUtils/clientApp';
import GroceryList from '../mealplanner/components/groceryList/GroceryList';

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
        if (res) setGroceryList(res);
        setLoading(false);
      });
  }, []);

  return (
    <div className={classes.loginDiv}>
      <Spin spinning={loading} size="large" className={classes.spin}>
        <div className={classes.fullScreen}>
          <div className={`${classes.loginModal} ${classes.groceryListRow}`}>
            <Row justify="center" className={classes.iconRow}>
              <Image src="/images/Icon.png" height={80} width={80} />
            </Row>
            <Row justify="center" className={classes.groceryListRow}>
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
            className={classes.logoutButton}
          >
            Logout
          </Button>
        </div>
      </Spin>
    </div>
  );
}

export default MobileGroceryList;
