import { Entity } from "../internal";
import World from "../world";


export class Weapon extends Entity {


    constructor(props) {

        super(props);

        this.Period = 250;
        this.lastTimeFired = 0;
        this.Outer = null;

        this.Ammunition = 0;
        this.MaxAmmunition = 0;
        this.MaxTimeToLife = 0;

        //DrainAmmoPerUpdate
        this.AmmunitionDrain = 0;

    }

    /**
     * Set the new owner of this weapon.
     * @param {Entity} NewOwner 
     */
    SetOwner(NewOwner) {
        this.AttachToParent(NewOwner);
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

    onStackInventory() {
        this.Ammunition = this.MaxAmmunition;
    }

    update(delta) {
        super.update(delta);
        if (this.AmmunitionDrain > 0) {
            this.Ammunition -= this.AmmunitionDrain * delta;
        }
        if (this.MaxAmmunition > 0 && this.Ammunition <= 0) {
            this.Destroy();
        }
    }

}


