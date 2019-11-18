import Vector2 from './vector';
import StarBackGround from './starbackground';
import { Player } from './internal';
import World from './world';
import { getRandomfloat, getRandomInt } from './mathutils';
import Key from './input';
import GameMode from './GameMode';
import { SpawnEnemyLine, SCREEN_H, SCREEN_W, DefaultEnemyProps, SinusCurveDefaultProps } from './GameplayStatics';



const DebugBVH = false;
const DebugShapes = false;

var lastFrameTimeMs = 0;
var maxFPS = 60;
var delta = 0;
var timestep = 1000 / 60;


function GameLoop(TimeStamp) {

    World.UpdateGameTime(TimeStamp);

    if (TimeStamp < lastFrameTimeMs + (1000 / maxFPS)) {
        requestAnimationFrame(GameLoop);
        return;
    }



    delta = (TimeStamp - lastFrameTimeMs) / 1000;
    lastFrameTimeMs = TimeStamp;


    //Draw
    //clear screen  CLS
    World.ctx.fillStyle = "#000";
    World.ctx.fillRect(0, 0, 800, 600);


    //Update Collisions
    World.UpdateCollisions(delta);

    //Update
    GameMode.Update(delta);
    World.Update(delta);




    // UI render
    if (GameMode.PlayerPawn) {

        const weapon = GameMode.PlayerPawn.weapon;
        if (weapon && weapon.MaxAmmunition > 0) {

            
            const ctx = World.ctx;
            ctx.save();
            //module import for rollup
            ctx.fillStyle = "#ff8000";
            ctx.strokeStyle = '#f00';

            ctx.translate(20, 500);

            ctx.fillRect(0, 0, (weapon.Ammunition / weapon.MaxAmmunition) * 120, 16);

            ctx.restore();
        }

    }



    // Draw Debug collisons
    if (DebugShapes) {
        World.ctx.strokeStyle = '#f00';
        World.ctx.beginPath();
        World.collisions.draw(World.ctx);
        World.ctx.stroke();
    }

    //draw BVH
    if (DebugBVH) {

        World.ctx.strokeStyle = '#FF0';
        World.ctx.beginPath();
        World.collisions.drawBVH(World.ctx);
        World.ctx.stroke();
    }



    requestAnimationFrame(GameLoop);
}




function InitGame() {




    InitStars();

    //  World.SpawnEntity(Asteroid, { location: new Vector2(400, 300), maxhealth:10000500 })

    var newPlayer = World.SpawnEntity(Player, { location: new Vector2(400, 500) })
    GameMode.RegisterPlayerPawn(newPlayer);

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

            World.SpawnEntity(StarBackGround, {
                location: new Vector2(x, y),
                velocity: new Vector2(0, speed),
                size: size
            });

        }
    }
}




window.addEventListener('keyup', function (event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function (event) { Key.onKeydown(event); }, false);
//window.addEventListener('mousemove', MouseMove, false);

document.addEventListener('DOMContentLoaded', (event) => {
    World.InitWorld();
    WorldGlobal = World;
    RespawnHandle = GameMode.RespawnDEV;
    InitGame();
    requestAnimationFrame(GameLoop);
});





