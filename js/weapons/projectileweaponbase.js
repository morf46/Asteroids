import Weapon from "./weapon";
import World from "../world";
import Projectile from "../projectiles/projectile";
import Vector2 from "../vector";
import { getRandomfloat } from "../mathutils";


/**
 * Projectile shoots "Upwards"
 */
class ProjectileWeaponBase extends Weapon {

    constructor() {
        super();



        this.ProjectileClass = Projectile;


        //Private shoot count
        this.InternalShootCount = 0;

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

export default ProjectileWeaponBase;