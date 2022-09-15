import { observer } from 'mobx-react-lite'
import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import CanvasState from '../store/CanvasState'
import '../style/canvas.scss'

const Canvas = observer(() => {

    let withW = document.documentElement.clientWidth //window.innerWidth
    let heightW = window.innerHeight
    let ratio = 1

    const canvasRef = useRef()

    useEffect(() => {
        // let canv = canvasRef.current
        // let context = canv.getContext('2d')
        // context.fillStyle = 'red'
        // context.fillRect(0, 0, canv.width, canv.height)

        CanvasState.setCanvas(canvasRef.current)

    }, [])


    function mouseDownHandler() {
        // @ts-ignore
        CanvasState.pushToUndo(canvasRef.current.toDataURL())
        //     axios.post(`http://localhost:5000/image?id=${params.id}`, { img: canvasRef.current.toDataURL() })
        //         .then(response => console.log(response.data))
    }

    return (
        <div className='canvas' >
            <canvas
                // @ts-ignore
                // ref={canvasRef} onMouseDown={() => mouseDownHandler()} width={1100} height={500} />
                ref={canvasRef}
                onMouseDown={() => mouseDownHandler()}
                width={withW * ratio} height={heightW}
            // style={{ backgroundColor: 'white' }}
            />
        </div >
    )
})

export default Canvas

