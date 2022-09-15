import { makeAutoObservable } from "mobx";

class ToolState {

    tool = null

    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool) {
        this.tool = tool
    }

    setFillColor(color) {
        // @ts-ignore
        this.tool.fillColor = color
    }
    setStrokeColor(color) {
        // @ts-ignore
        this.tool.strokeColor = color
    }
    setLineWidth(width) {
        // @ts-ignore
        this.tool.lineWidth = width
    }


}

export default new ToolState()