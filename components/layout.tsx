import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Layout, Menu } from 'antd';
import {
  PieChartOutlined,
  FolderOpenOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import classes from './css/layout.module.css';

const { Sider, Content } = Layout;

type AppLayoutProps = {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="container">
      <Head>
        <title>Meal Planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            theme="dark"
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
            }}
          >
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
            <div className={classes.iconCredit}>
              Icons created by
              {' '}
              <a href="https://www.flaticon.com/free-icons/food-waste" title="food waste icons">Flaticon</a>
            </div>
          </Sider>
          <Content style={{ marginLeft: 200, marginTop: 16 }}>
            {children}
          </Content>
        </Layout>
      </main>
    </div>
  );
}
