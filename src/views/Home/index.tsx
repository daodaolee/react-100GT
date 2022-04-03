import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Menu } from 'antd';
import './index.less'
import { Nav } from '@/global/Nav'

function Home () {
  const navigate = useNavigate()

  return (
    <div className='home w100 h100'>
      <div className='left'>
        <Menu
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1">
            Option 1
          </Menu.Item>
          {
            Nav.map((item, index) => 
              <Menu.Item key={index}  onClick={() => navigate(`/${item.link}`)}>
                {item.title}
              </Menu.Item>
            )
          }
        </Menu>
      </div>
      <div className='right'>
        <Outlet />
      </div>
    </div>
  )
}
export default Home
