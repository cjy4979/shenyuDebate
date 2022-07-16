import React from 'react'
import { Layout, Anchor ,Divider, Typography } from 'antd'
import Header from '@/components/header/Header';
const { Sider,Content } = Layout;
const { Link } = Anchor;
const { Title, Paragraph, Text} = Typography;

export default function index() {
  return (
    <Layout >
      <Header></Header>
      <Layout > 
        <Sider width={200} className="site-layout-background" theme="light">
          <Anchor>
            <Link href="#components-anchor-demo-basic" title="Basic demo" />
            <Link href="#components-anchor-demo-static" title="Static demo" />
            <Link href="#API" title="API">
              <Link href="#Anchor-Props" title="Anchor Props" />
              <Link href="#Link-Props" title="Link Props" />
            </Link>
          </Anchor>
        </Sider>

        <Content>
          <div> 
            <Title>深语10.0赛事系统使用指南</Title>
          </div>
          <div>
            
          </div>
          
      </Content>
      </Layout>
     
    </Layout>
  )
}

