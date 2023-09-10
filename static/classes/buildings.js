export class building {
    constructor(x,y,size,context) {
        this.x = x
        this.y = y
        this.size = size
        this.ctx = context
        this.color = "black"
    }
    get impassableArea() {
        return {
            topleft: (this.x,this.y),
            topright: (this.x + this.size, this.y),
            bottomleft: (this.x,this.y - this.size),
            bottomright: (this.x + this.size, this.y + this.size),
            size: this.size,
        }
    }
    draw() {
        this.ctx.fillColor = this.color
        this.ctx.fillRect(this.x,this.y,this.size,this.size)
    }
}
export class environmentalBuilding extends building {
    constructor(x,y,size,context) {
        super(x,y,size,context)
        this.color = "green"
        this.environemnt = true
    }
}
export class industrialBuilding extends building {
    constructor(x,y,size,context) {
        super(x,y,size,context)
        this.color = "red"
        this.environment = false
    }
}