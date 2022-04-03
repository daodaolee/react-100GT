import React from 'react'
import { useNavigate } from 'react-router-dom'
import './index.less'

function DashBoard () {
  const navigate = useNavigate()


  return (
    <div className='dashboard w100 h100'>
      随心写一些小demo，主要是小游戏和小工具类
    </div>
  )
}
export default DashBoard
