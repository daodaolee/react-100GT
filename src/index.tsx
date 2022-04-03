import React from 'react'
import ReactDOM from 'react-dom'
import RouteConfig from '@/router/index'
import { BrowserRouter } from 'react-router-dom'

import '@/assets/css/common.less'

ReactDOM.render(
  <BrowserRouter>
    <RouteConfig />
  </BrowserRouter>,
  document.getElementById('root')
)
