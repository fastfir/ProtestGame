// Drawing Canvas
let player = {
    x: 950,
    y: 460,
}
const canvas = document.querySelector("#myCanvas")
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth
ctx.canvas.height = window.innerHeight  

let randomPositions = []
for (var i=0;i<35;i++) {
    let randomX = Math.floor((Math.random()) * 10)
    let randomY = Math.floor((Math.random()) * 7)
    randomPositions.push([randomX, randomY])
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 3000, 2000);

    ctx.fillStyle = "green"
    for (var i=0;i<35;i++) {
        ctx.fillRect(300*randomPositions[i][0],300*randomPositions[i][1],300,300)
    }

    ctx.fillStyle = "gray"
    for (var i=0;i<10;i++) {
        ctx.fillRect(0,300*i,3000,100);
    }
    for (var i=0;i<11;i++) {
        ctx.fillRect(300*i,0,100,2000);
    }

    ctx.fillStyle = "gold"
    ctx.fillRect(100,100,200,200)

    let circle = new Path2D()
    circle.arc(player.x,player.y,30,0,2*Math.PI)
    ctx.fillStyle = "teal"
    ctx.fill(circle)
    ctx.stroke()
    window.scrollTo(player.x,player.y)
    
}

//keyboard input
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "a":
            player.x -= 10
            draw();
            break;
        case "d":
            player.x += 10
            draw();
            break; 
        case "s":
            player.y += 10
            draw();
            break;
        case "w":
            player.y -= 10
            draw();
            break;
    }
})
draw();