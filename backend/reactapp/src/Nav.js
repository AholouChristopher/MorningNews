import React from 'react';
import './App.css';

import {Menu} from 'antd'

import { HomeOutlined, ReadOutlined, LogoutOutlined  } from '@ant-design/icons';


import {Link} from 'react-router-dom';

function Nav() {

  return (
    <nav >
      <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

        <Menu.Item key="mail" icon={<HomeOutlined/>}>
          <Link to="/screensource">Sources</Link>
        </Menu.Item>

        <Menu.Item key="test" icon={<ReadOutlined/>}>
            <Link to="/screenmyarticles">My Articles</Link>
        </Menu.Item>

        <Menu.Item key="app" icon={<LogoutOutlined/>}>
          <Link to="/">Logout</Link>
        </Menu.Item>

      </Menu>
    </nav>
  );
}

export default Nav;
