import React, { ChangeEvent, useState } from 'react'
import './index.less'
interface Point {
  x: number;
  y: number;
  w: number;
  h: number;
}
function ScreenShot(){
  // 预览图片数组
  const [imgArr, setImgArr] = useState([])
  // 对焦的位置
  const [focusPosition, setFocusPosition] = useState({
    x: 0,
    y: 0,
    display: 'none'
  })

  const mask = document.querySelector(".screenshot-mask") as HTMLElement

  const imageToCanvas = (img:CanvasImageSource) => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    canvas.width = img.width as number
    canvas.height = img.height as number
    canvas.getContext('2d')?.drawImage(img, 0, 0)
    return canvas
  }
  
  const inputChange = (e:ChangeEvent<HTMLInputElement>) => {
    imgArr.length = 0
    setImgArr([...imgArr])
    e.stopPropagation()
    const url = URL.createObjectURL(e.target.files![0])
    const img = new Image()
    img.src = url
    img.onload = () => {
      imageToCanvas(img)
    }
  }

  const screenshot = async () =>  {
    setFocusPosition({...focusPosition})
    for(let i = 0; i < 8; i++){
      await sleep(clip, 1500)
    }
  }

  // 延迟执行函数
  const sleep = (fn:any, ms:number) => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        fn()
        resolve()
      }, ms)
    })
  }
  const focusClipStyle = () => {
    mask!.style.display = 'block'
    setTimeout(() => {
      mask!.style.display = 'none'
    },1000)
  }

  const clip = async () => {
    const tempH = document.querySelector(".screenshot-cut") as HTMLElement
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    const cw = canvas.width
    const ch = canvas.height
    const dw = 400
    const dh = tempH.offsetHeight + 30
    const xp = cw / 400
    const yp = ch / dh
    const point = {
      x: (dw - 50) * Math.random(),
      y: (dh - 50) * Math.random(),
    }
    const { x, y } = point

    focusPosition.x = x
    focusPosition.y = y
    focusPosition.display = 'block'
    setFocusPosition({...focusPosition})

    await sleep(focusClipStyle, 1000)

    const data = ctx?.getImageData(x * xp, y * yp, cw/8, ch/8)!
    const resultCanvas = document.createElement('canvas') as HTMLCanvasElement
    resultCanvas.width = cw/8
    resultCanvas.height = ch/8
    const resultCtx = resultCanvas.getContext('2d')
    resultCtx?.putImageData(data, 0, 0)
    const resultUrl = resultCanvas.toDataURL('image/png', 1)
    
    imgArr.push(resultUrl as never)
    // 触发dom更新
    setImgArr([...imgArr])

  }
  return (
    <div className='screenshot w100 h100'>
      <div className='screenshot-cut'>
        <input type="file" onChange={inputChange}/>
        <canvas id='canvas' width="400px" height="400px"></canvas>
        <div className='screenshot-mask'></div>
        <div className='focus-tool' style={{top:focusPosition.y, left: focusPosition.x, display:focusPosition.display}}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className='screenshot-preview'>
        <button onClick={screenshot}>截图</button>
        <div className='screenshot-preview-item'>
          {
            imgArr.map((item, index) => 
              <img src={item} key={index}/>
            )
          }
        </div>
      </div>
    </div>
  )
}
export default ScreenShot