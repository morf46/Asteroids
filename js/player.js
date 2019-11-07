import Monster from "./monster";
import Vector2 from "./vector";
import Key from "./input";
import Projectile from "./projectile";
import Weapon from "./weapons/weapon";
import BaseProjectileWeapon from "./weapons/baseprojectile";
import World from "./world";
import { getRandomfloat } from "./mathutils";
import { SpawnEnemyLine } from "./GameplayStatics";



class Player extends Monster {

    constructor(location) {

        super(location);
        this.RegisterPostUpdate = true;
        this.team = 0;

        this.maxHealth = 100;
        this.health = this.maxHealth;

        this.InputStrength = 250;

        this.weapon = new BaseProjectileWeapon();
        this.weapon.SetOwner(this);

        //start with 1 to avoid modulus 0
        this.PositionLevel = 1;
    }

    update(delta) {

        this.Velocity = new Vector2(0, 0);
        this.PositionLevel += 1 * delta;

        if (Math.floor(this.PositionLevel) % 10 === 0) {

            //add 1 to avoid modulus 0
            this.PositionLevel += 1;
            let TargetLocation = new Vector2(0, 0);
            TargetLocation.setDirection(0, 2000);
            SpawnEnemyLine(new Vector2(200, 0), TargetLocation, 20);
        }

        if (Key.isDown(Key.UP)) {
            this.Velocity.addScaled(new Vector2(0, -1), this.InputStrength);
        }

        if (Key.isDown(Key.DOWN)) {
            this.Velocity.addScaled(new Vector2(0, 1), this.InputStrength);
        }

        if (Key.isDown(Key.LEFT)) {
            this.Velocity.addScaled(new Vector2(-1, 0), this.InputStrength);
        }
        if (Key.isDown(Key.RIGHT)) {
            this.Velocity.addScaled(new Vector2(1, 0), this.InputStrength);
        }

        super.update(delta);



        if (Key.isDown(Key.CTRL)) {

            if (this.weapon) {
                this.weapon.FireWeapon();
            }

        }
    }

    postUpdate(delta) {
        if (!this.PendingDestroy) {
            const potentials = this.RootBody.potentials();
            for (const otherBody of potentials) {
                if (this.RootBody.collides(otherBody, this.World.collisionResults)) {
                    if (this.team !== otherBody.Outer.team) {
                        otherBody.Outer.Destroy();
                        this.takeDamage(10);
                    }
                }
            }
        }
    }

    takeDamage(amount) {

        super.takeDamage(amount);

        console.log("player HP: " + this.health);
    }

    CreateCollionBody() {
        return this.World.collisions.createPolygon(this.Location.x, this.Location.y, [[0, 0], [16, 32], [-16, 32]]);
    }

}


export default Player;