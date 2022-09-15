import Tool from "./Tool";

export default class Brush extends Tool {
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
        //moveTo - перемещение курсора - это перевели курсор в место с которого будем рисовать
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
        }

    }

    draw(x, y) {
        this.ctx.lineTo(x, y) //рисует линию
        this.ctx.stroke()// обвод того что рисуем
    }


}