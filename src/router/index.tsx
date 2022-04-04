import React from 'react'
import { useRoutes, RouteObject } from 'react-router-dom'

import Home from '@/views/Home'
import Dashboard from '@/views/Dashboard'
import ScreenShot from '@/views/ScreenShot'

const routes:RouteObject[] = [{
  path: '/',
  element: <Home />,
  children: [
    // 默认路由
    { index: true, element: <Dashboard /> },
    { path: '/screenshot', element: <ScreenShot /> }
  ]
}]
export default function RouteConfig () {
  const element = useRoutes(routes)
  return (
    <>
      { element }
    </>
  )
}
