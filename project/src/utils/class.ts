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
export class Ball {
    raduis: number
    color: string
    x: number = 0
    y: number = 0

    public constructor(x: number, y: number, color: string, raduis: number) {
        this.x = x
        this.y = y
        this.color = color
        this.raduis = raduis
    }
}
export const GameInfo = {
    FPS: 1000 / 60,
    PLAYER_HEIGHT: 100,
    PLAYER_WIDTH: 10,
    BALL_START_SPEED: 2,
    RADIUS_BALL: 10,
    VELOCITY: 1,
    LEVEL: 0.05,
}

export class Canvas {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null
    width: number
    height: number
    flag: number = 0
    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.width = canvas.width
        this.height = canvas.height
        if (!this.ctx) {
            throw new Error("Unable to obtain 2D rendering context.");
        }
    }
    public ClearCanvas(): void {
        if (!this.ctx) return
        this.ctx.fillStyle = "#000000"
        // this.ctx.
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }
    public drawRect(Coordinates: { x: number, y: number }): void {
        if (!this.ctx) return
        this.ctx.fillStyle = "#FFFFFF"
        this.ctx.fillRect(Coordinates.x, Coordinates.y, 10, 50)
    }
    public drawCircle(ball: Ball): void {
        if (!this.ctx) return
        this.ctx.fillStyle = ball.color
        this.ctx.beginPath();
        this.ctx.arc(ball.x, ball.y, ball.raduis, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill()
    }
}
