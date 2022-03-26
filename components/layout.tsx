import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button, Layout, Menu } from 'antd';
import { signOut } from 'firebase/auth';
import {
  PieChartOutlined,
  FolderOpenOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import classes from './css/layout.module.css';
import { auth } from '../firebase/clientApp';
import { AuthContext } from './contexts/AuthContext';

const { Sider, Content } = Layout;

type AppLayoutProps = {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { setUser } = useContext(AuthContext);

  const handleLogOut = (): void => {
    signOut(auth).then(() => {
      if (setUser) setUser(null);
    });
  };

  return (
    <div className="container">
      <Head>
        <title>Meal Planner</title>
        <link rel="icon" href="/images/Icon.png" />
      </Head>

      <main>
        <Layout className={classes.layout}>
          <Sider theme="dark" className={classes.sider}>
            <div className={classes.sidebarTitle}>
              Daily Dozen
              <h2>Meal Planner</h2>
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                <Link href="/">
                  Meal Planner
                </Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<FolderOpenOutlined />}>
                <Link href="/recipes">
                  Recipes
                </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<LineChartOutlined />}>
                <Link href="/goals">
                  Goals
                </Link>
              </Menu.Item>
            </Menu>
            <div className={classes.logoutButton}>
              <Button
                danger
                type="primary"
                onClick={handleLogOut}
              >
                Logout
              </Button>
            </div>
            <div className={classes.iconCredit}>
              Icons created by
              {' '}
              <a href="https://www.flaticon.com/free-icons/food-waste" title="food waste icons">Flaticon</a>
            </div>
          </Sider>
          <Content className={classes.content}>
            {children}
          </Content>
        </Layout>
      </main>
    </div>
  );
}
