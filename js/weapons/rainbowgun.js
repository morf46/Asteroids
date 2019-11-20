import World from '../world';
import Vector2 from '../lib/vector';
import { getRandomfloat } from "../lib/mathutils";
import SinusCurveMovementComponent from "../Ai/SinusCurveMovement";
import { ProjectileWeaponBase,RainbowProjectile } from "../internal";


export class RainbowGun extends ProjectileWeaponBase {


    constructor(props) {
        super(props);

        this.ProjectileClass = RainbowProjectile;

        this.Ammunition = 100;
        this.Period = 500;
    }



    HandleFireWeapon() {

        if (this.ProjectileClass) {

            for (let i = 0; i < 2; i++) {
                let localInverse = i === 0 ? 1 : -1;
                let P = World.SpawnEntity(this.ProjectileClass, {
                    location: this.Outer.Location,
                    velocity: new Vector2(0, getRandomfloat(-450, -600)).addScaled(this.Outer.Velocity.clone(), 0.16),
                    team: this.Outer.team,

                    MovementComponent: SinusCurveMovementComponent,
                    MovementConfig: {
                        usespawnlocationdiff: true,
                        frequency: 30,
                        magnitude: (getRandomfloat(10, 15) * localInverse)
                    }
                });
                P.team = this.Outer.team;

                this.InternalShootCount++;
                this.Ammunition--;

                if (this.Ammunition <= 0) {
                    this.Destroy();
                    break;
                }
            }
        }
    }
}