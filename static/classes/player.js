export class player {
    constructor(x,y,context) {
        this.x = x
        this.y = y
        this.ctx = context
    }
    draw() {
        let player = new Path2D()
        player.arc(this.x,this.y,30,0,Math.PI * 2)
        this.ctx.fillStyle = "teal"
        this.ctx.fill(player)
        this.ctx.stroke()
    }
}