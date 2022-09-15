import React, { useState } from 'react'
import ToolState from '../store/ToolState'
import "../style/toolbar.scss"
import Brush from '../tools/Brush'
import CanvasState from '../store/CanvasState'
import Rect from '../tools/Rect'
import Circle from '../tools/Circle'
import Line from '../tools/Line'
import Eraser from '../tools/Eraser'



const ToolBar = () => {


    const [activeBtn, setActiveBtn] = useState('')

    function clearCanvas(canvas) {
        let context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height);
        // context.fillStyle = 'white'
        // context.fillRect(0, 0, canvas.width, canvas.height)
        CanvasState.setCanvas(canvas)

    }

    function changeColor(e) {
        ToolState.setStrokeColor(e.target.value)
        ToolState.setFillColor(e.target.value)
    }

    const download = () => {
        // @ts-ignore
        const dataUrl = CanvasState.canvas.toDataURL()
        const a = document.createElement('a')
        a.href = dataUrl
        let name = Date.now()
        a.download = name + ".jpg"
        // // a.download = CanvasState.sessionid + ".jpg"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    function toolHandler(tool, name) {
        ToolState.setTool(new tool(CanvasState.canvas))
        setActiveBtn(name)
    }


    function fileHandler(e) {
        let file = e.target.files[0]
        var img = new Image();
        img.src = URL.createObjectURL(file);
        let ctx = CanvasState.canvas.getContext("2d");
        img.onload = function () {
            ctx.drawImage(img, 0, 0); // drawImage(img, x, y);
        }
        e.target.value = null
    }

    return (
        <div className='toolbar'>

            <button
                className={activeBtn === 'brush' ? "toolbar__btn brush active" : "toolbar__btn brush "}
                onClick={() => {
                    toolHandler(Brush, 'brush')
                    // ToolState.setTool(new Brush(CanvasState.canvas))
                    // setActiveBtn('brush')
                }}>
            </button>

            <button
                className={activeBtn === 'rect' ? "toolbar__btn rect active" : "toolbar__btn rect "}
                onClick={() => {
                    toolHandler(Rect, 'rect')
                }}
            >
            </button>

            <button className={activeBtn === 'circle' ? "toolbar__btn circle active" : "toolbar__btn circle "}
                onClick={() => {
                    toolHandler(Circle, 'circle')
                    // ToolState.setTool(new Circle(CanvasState.canvas))
                }}>
            </button>

            <button className={activeBtn === 'line' ? "toolbar__btn line active" : "toolbar__btn line "}
                onClick={() => {
                    toolHandler(Line, 'line')
                    // ToolState.setTool(new Line(CanvasState.canvas))
                }}>
            </button>

            <button className={activeBtn === 'eraser' ? "toolbar__btn eraser active" : "toolbar__btn eraser "}
                onClick={() => {
                    toolHandler(Eraser, 'eraser')
                    // ToolState.setTool(new Eraser(CanvasState.canvas))
                }}>
            </button>

            <input className='color' type="color" style={{ marginLeft: "20px" }} onChange={e => changeColor(e)} />

            <input accept="image/*" title="&nbsp;" type="file" id="imageLoader" onChange={e => fileHandler(e)} />

            <button className="clear-canvas"
                onClick={() => clearCanvas(CanvasState.canvas)}>Clear
            </button>

            <button className="toolbar__btn undo" onClick={() => CanvasState.undo()}>
            </button>

            <button className="toolbar__btn redo" onClick={() => CanvasState.redo()}></button>
            <button className="toolbar__btn save" onClick={() => download()}></button>
        </div>
    )
}

export default ToolBar




