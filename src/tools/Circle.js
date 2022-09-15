import Tool from "./Tool";

export default class Circle extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.listen() // при создании слушает сам себя
    }

    //создаем слушатель
    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e) {
        this.mouseDown = false
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        this.ctx.beginPath() // у контекта - говорит что начали рисовать новую линию
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.saved = this.canvas.toDataURL() //сохр канвас каждый раз
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            // @ts-ignore
            this.width = currentX - this.startX;
            // @ts-ignore
            this.height = currentY - this.startY;
            let r = Math.sqrt(this.width ** 2 + this.height ** 2)
            this.draw(this.startX, this.startY, r)
        }

    }

    draw(x, y, r) {
        const img = new Image()
        img.src = this.saved
        img.onload = async function () {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.arc(x, y, r, 0, 2 * Math.PI)
            this.ctx.fill()
            this.ctx.stroke()
        }.bind(this)
    }


}


// https://github.com/utimur/Fullstack-websocket-paint/blob/master/client/src/tools/Rect.js
//21"00