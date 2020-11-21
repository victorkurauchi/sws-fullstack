import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout as AntdLayout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = AntdLayout;

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <AntdLayout className="layout">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <Link href="/">
            <a>home</a>
          </Link></Menu.Item>
        <Menu.Item key="2">
          <Link href="/companies">
            <a>companies</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link href="/users">
            <a>users</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link href="/about">
            <a>about</a>
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>{useRouter().pathname.slice(1)}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">
        {children}
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Built with ❤️ and ☕ ©2020 by VictorK </Footer>
  </AntdLayout>
)

export default Layout
