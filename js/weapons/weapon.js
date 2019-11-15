import { Entity } from "../internal";
import World from "../world";


export class Weapon extends Entity {


    constructor(props) {

        super(props);

        this.Period = 250;
        this.lastTimeFired = 0;
        this.Outer = null;

        this.Ammunition = 0;

    }

    /**
     * Set the new owner of this weapon.
     * @param {Entity} NewOwner 
     */
    SetOwner(NewOwner) {
        this.Outer = NewOwner;

    }

    /**
     * basic pre weapon fire logic
     * can the weapon fire?
     */
    FireWeapon() {
        if (this.lastTimeFired + this.Period < World.GameTime) {
            this.HandleFireWeapon();
            this.lastTimeFired = World.GameTime;
        }
    }

    /**
     * weapon fire logic 
     * creates projectiles etc.
     */
    HandleFireWeapon() {

    }

    Destroy() {
        super.Destroy();
        if (this.Outer) {
            this.Outer.DropItem(this);
        }
    }
}


