import Tool from "./Tool";

export default class Rect extends Tool {
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
            this.draw(this.startX, this.startY, this.width, this.height)
        }

    }

    draw(x, y, w, h) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) // полная очистка канвасс
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.rect(x, y, w, h) // у контекста есть параметр rect для рисования прямоугольика
            this.ctx.fill()// заполнение цветом
            this.ctx.stroke() // обводка
        }
    }


}


// https://github.com/utimur/Fullstack-websocket-paint/blob/master/client/src/tools/Rect.js
//21"00