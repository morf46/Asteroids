import Vector2 from './vector';
import StarBackGround from './starbackground';
import Monster from './monster';
import Player from './player';
import World from './world';
import { getRandomfloat, getRandomInt } from './mathutils';
import Key from './input';



const DebugBVH = false;

var lastFrameTimeMs = 0;
var maxFPS = 60;
var delta = 0;
var timestep = 1000 / 60;

var lastTimeGC = 0;

function GameLoop(TimeStamp) {

    World.UpdateGameTime(TimeStamp);

    if (TimeStamp < lastFrameTimeMs + (1000 / maxFPS)) {
        requestAnimationFrame(GameLoop);
        return;
    }

    if (lastTimeGC + 60000 < TimeStamp) {
        lastTimeGC = TimeStamp;
        World.UnregisterInactiveEntitys();
    }

    delta = (TimeStamp - lastFrameTimeMs) / 1000;
    lastFrameTimeMs = TimeStamp;



    //Update
    World.EntityList.forEach(entity => {
        if (!entity.PendingDestroy) {
            entity.update(delta);
        }
    });

    //Update Collision
    World.collisions.update();
    //POST update
    World.EntityListPostUpdate.forEach(entity => {
        if (!entity.PendingDestroy) {
            entity.postUpdate(delta);
        }
    });

    //Draw
    //clear screen  CLS
    World.ctx.fillStyle = "#000";
    World.ctx.fillRect(0, 0, 800, 600);

    World.EntityList.forEach(entity => {
        if (!entity.PendingDestroy) {
            entity.render(delta);
        }
    });

    // Draw Debug collisons
    World.ctx.strokeStyle = '#f00';
    World.ctx.beginPath();
    World.collisions.draw(World.ctx);
    World.ctx.stroke();

    //draw BVH
    if (DebugBVH) {

        World.ctx.strokeStyle = '#FF0';
        World.ctx.beginPath();
        World.collisions.drawBVH(World.ctx);
        World.ctx.stroke();
    }

    

    requestAnimationFrame(GameLoop);
}


const SCREEN_W = 800;
const SCREEN_H = 600;

function InitGame() {

    InitStars();


    for (let i = 0; i < 20; i++) {
        let x = getRandomfloat(0, SCREEN_W);
        let y = getRandomfloat(0, SCREEN_H);
        let monster = new Monster(new Vector2(x, y));
        World.RegisterEntity(monster);


    }

    var xxPlayer = new Player(new Vector2(20, 20));
    World.RegisterEntity(xxPlayer);


    function InitStars() {
        for (let i = 0; i < 60; i++) {
            let size = getRandomInt(1, 5);
            let x = getRandomfloat(0, SCREEN_W);
            let y = getRandomfloat(0, SCREEN_H);
            let speed = getRandomfloat(150, 180) / size;
            if (i > 45) {
                size = getRandomInt(4, 8);
                speed = getRandomfloat(50, 80) / size;
            }
            let Star = new StarBackGround(x, y, speed, size);
            World.RegisterEntity(Star);
        }
    }
}




window.addEventListener('keyup', function (event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function (event) { Key.onKeydown(event); }, false);
//window.addEventListener('mousemove', MouseMove, false);

document.addEventListener('DOMContentLoaded', (event) => {
    World.InitWorld();
    InitGame();
    requestAnimationFrame(GameLoop);
});





