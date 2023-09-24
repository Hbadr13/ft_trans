// export let player = {
//     x: 0,
//     y: 0,


// }


export class Player {
    x: number = 0
    y: number = 0
    public constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}
export class Canvas {
    canvas: HTMLCanvasElement
    cnx: CanvasRenderingContext2D | null
    width: number
    height: number
    flag: number = 0
    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.cnx = this.canvas.getContext("2d")
        this.width = canvas.width
        this.height = canvas.height
        if (!this.cnx) {
            throw new Error("Unable to obtain 2D rendering context.");
        }
    }
    // public get getCanvas(): HTMLCanvasElement {
    //     return this.canvas
    // }
    public ClearCanvas(): void {
        if (!this.cnx) return
        this.cnx.fillStyle = "#000000"
        // this.cnx.
        this.cnx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }
    public drawRect(Coordinates: { x: number, y: number }): void {
        if (!this.cnx) return
        this.cnx.fillStyle = "#FFFFFF"
        this.cnx.fillRect(Coordinates.x, Coordinates.y, 10, 50)
    }
    public drawCircle(): void {

    }
}
