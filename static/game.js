import {player} from "./classes/player.js"
import { environmentalBuilding, industrialBuilding } from "./classes/buildings.js";
const canvas = document.querySelector("#myCanvas")
const ctx = canvas.getContext("2d");
ctx.canvas.width = 3000;
ctx.canvas.height = 2000;
ctx.textBaseline = "top";

const character = new player(950,450,ctx)

const environmentalBuildings = []
for (var i=0;i<45;i++) {
    let randomX = Math.floor(Math.random() * 10)
    let randomY = Math.floor(Math.random() * 7)
    let environemntbuilding = new environmentalBuilding(300*randomX,300*randomY,300,ctx)
    environmentalBuildings.push(environemntbuilding)
}
const industrialBuildings = []
for (var i=0;i<20;i++) {
    let randomX = Math.floor(Math.random() * 10)
    let randomY = Math.floor(Math.random() * 7)
    environmentalBuildings.forEach(envirobuild => {
        if (randomX in envirobuild) {
            randomX = Math.floor(Math.random() * 10)
            randomY = Math.floor(Math.random() * 7)
        }
    });
    let industrialbuilding = new industrialBuilding(300*randomX,300*randomY,300,ctx)
    industrialBuildings.push(industrialbuilding)
}
function draw() {
    //Basic Shapes
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 3000, 2000);

    ctx.fillStyle = "green"
    for (var i=0;i<45;i++) {
        environmentalBuildings[i].draw();
        
    }

    ctx.fillStyle = "red"
    for (var i=0;i<20;i++) {
        industrialBuildings[i].draw();
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

    //Text Labels
    ctx.fillStyle = "black"
    ctx.font = "50px Helvetica"
    ctx.fillText("Shop",125,125,140)


    //Player
    character.draw()
    window.scrollTo(character.x - 950,character.y - 460)
}

//keyboard input
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "a":
            character.x -= 15
            if (character.x <= 30) {
                character.x = 30;
            }
            draw();
            break;
        case "d":
            character.x += 15
            if (character.x >= 2970) {
                character.x = 2970;
            }
            draw();
            break; 
        case "s":
            character.y += 15
            if (character.y >= 1970) {
                character.y = 1970;
            }
            draw();
            break;
        case "w":
            character.y -= 15
            if (character.y <= 30) {
                character.y = 30;
            }
            draw();
            break;
    }
})
draw();