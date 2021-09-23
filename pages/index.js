import Head from 'next/head'
import Link from 'next/link'
import {Layout, Menu} from 'antd';
import {
  HomeOutlined,
  PieChartOutlined,
  FolderOpenOutlined,
  LineChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import styled from 'styled-components'

const {Sider} = Layout;

const SiderbarTitle = styled.div`
  color: rgba(255, 255, 255, 0.65);;
  margin-left: 25px;
  margin-top: 20px;
  margin-bottom: 15px;

  & > h2 {
    color: #FFFFFF;
  }
`

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Layout style={{minHeight: '100vh'}}>
          <Sider theme="dark">
            <SiderbarTitle>
              Welcome back,
              <h2>Sarah Ali</h2>
            </SiderbarTitle>
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
              <Menu.Item key="5" icon={<UserOutlined />}>
                <Link href="/account">
                  Account
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
        </Layout>
      </main>
    </div>
  )
}
