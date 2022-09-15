
import { makeAutoObservable } from "mobx";

class CanvasState {
    canvas = null
    undoList = []
    redoList = []


    constructor() {
        makeAutoObservable(this)
    }

    setCanvas(canvas) {
        // let ctx = canvas.getContext('2d')
        // ctx.fillStyle = 'red'
        // ctx.fillRect(0, 0, canvas.width, canvas.height)
        this.canvas = canvas
    }

    // setBGC() {
    //     if (this.canvas) {

    //         console.log('true');
    //         this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
    //         this.canvas.getContext('2d').fillStyle = 'red'
    //         this.canvas.getContext('2d').fillRect(0, 0, this.canvas.width, this.canvas.height)
    //     }
    // }


    pushToUndo(data) {
        this.undoList.push(data)
    }

    pushToRedo(data) {
        this.redoList.push(data)
    }

    //https://www.youtube.com/watch?v=KVeMsy4qCdg&ab_channel=UlbiTV
    //30''00
    undo() {
        // @ts-ignore
        let ctx = this.canvas.getContext('2d')
        if (this.undoList.length > 0) {
            let dataUrl = this.undoList.pop()
            // @ts-ignore
            this.redoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataUrl
            img.onload = () => {
                // @ts-ignore
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                // @ts-ignore
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        } else {
            // @ts-ignore
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.heigth)
        }
    }

    redo() {
        // @ts-ignore
        let ctx = this.canvas.getContext('2d')
        if (this.redoList.length > 0) {
            let dataUrl = this.redoList.pop()
            // @ts-ignore
            this.undoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataUrl
            img.onload = () => {
                // @ts-ignore
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                // @ts-ignore
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
    }

}

export default new CanvasState()
