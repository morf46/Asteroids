import { Weapon,Projectile } from "../internal";
import World from "../world";
import Vector2 from "../lib/vector";
import { getRandomfloat } from "../lib/mathutils";


/**
 * Projectile shoots "Upwards"
 */
export class ProjectileWeaponBase extends Weapon {

    constructor(props) {
        super(props);



        this.ProjectileClass = Projectile;


        //Private shoot count
        this.InternalShootCount = 0;

        this.Period = 100;


    }



    HandleFireWeapon() {

        if (this.ProjectileClass) {

            let P = World.SpawnEntity(this.ProjectileClass, {
                location: this.Outer.Location,
                velocity: new Vector2(0, getRandomfloat(-550, -450)).add(this.Outer.Velocity.clone().multiply(0.16)),
                team: this.Outer.team

            });
            P.team = this.Outer.team;

            this.InternalShootCount++;
        }

    }


}

