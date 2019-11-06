import World from "../world";


class Weapon {


    constructor() {

        this.Period = 250;
        this.lastTimeFired = 0;
        this.Outer = null;
        
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
        }
    }

    /**
     * weapon fire logic 
     * creates projectiles etc.
     */
    HandleFireWeapon() {

    }
}


export default Weapon;