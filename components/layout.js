import Head from 'next/head'
import Link from 'next/link'
import {Layout, Menu} from 'antd';
import {
  HomeOutlined,
  PieChartOutlined,
  FolderOpenOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import classes from './css/layout.module.css';

const {Sider, Content} = Layout;

export default function AppLayout({ children }) {
  return (
    <div className="container">
      <Head>
        <title>Meal Planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Layout style={{minHeight: '100vh'}}>
          <Sider theme="dark">
            <div className={classes.sidebarTitle}>
              Welcome back,
              <h2>Sarah Ali</h2>
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link href="/">
                  Dashboard
                </Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<PieChartOutlined />}>
                <Link href="/mealplanner">
                  Meal Planner
                </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<FolderOpenOutlined />}>
                <Link href="/recipes">
                  Recipes
                </Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<LineChartOutlined />}>
                <Link href="/goals">
                  Goals
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{margin: '16px 0'}}>
            {children}
          </Content>
        </Layout>
      </main>
    </div>
  )
}
