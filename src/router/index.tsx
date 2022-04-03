import React from 'react'
import { useRoutes, RouteObject } from 'react-router-dom'

import Home from '@/views/Home'
import Dashboard from '@/views/Dashboard'

const routes:RouteObject[] = [{
  path: '/',
  element: <Home />,
  children: [
    // 默认路由
    { index: true, element: <Dashboard /> }
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
