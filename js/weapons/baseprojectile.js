import Weapon from "./weapon";
import World from "../world";
import Projectile from "../projectile";
import Vector2 from "../vector";
import { getRandomfloat } from "../mathutils";


/**
 * Projectile shoots "Upwards"
 */
class BaseProjectileWeapon extends Weapon {

    constructor() {
        super();

   

    }



    HandleFireWeapon() {
        let P = new Projectile({
            location: this.Outer.Location,
            velocity: new Vector2(0, getRandomfloat(-550, -450)).add(this.Outer.Velocity.clone().multiply(0.16))
        });
        P.team = this.Outer.team;
        World.RegisterEntity(P);
    }

 
}

export default BaseProjectileWeapon;