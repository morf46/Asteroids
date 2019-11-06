import Vector2 from "./vector"
import World from "./world";

class Entity {




    constructor() {
        this.Location = new Vector2(0, 0);
        this.Velocity = new Vector2(0, 0);
        this.World = World;
        this.RootBody = null;
        this.PendingDestroy = false;
        this.RegisterPostUpdate = false;
        this.team = 0;


        this.health = 0;
        this.maxHealth = 0;

        this.lifetime = -1;
        this.spawnTime = World.GameTime;

    }

    preUpdate(delta) {

    }

    update(delta) {
        if (this.lifetime > 0) {
            if (this.spawnTime + this.lifetime < World.GameTime) {
                this.Destroy();
            }
        }

        if (!this.IsInWorldBounds()) {
            console.log("Out of Bounds: ", this);
            this.Destroy();
        }

    }

    /**
     * Runs after Update needs to be registered with RegisterPostUpdate = true
     * @param {number} delta DeltaTime 
     */
    postUpdate(delta) {

    }

    /**
     * Take damage 
     * @param {number} amount 
     */
    takeDamage(amount) {

    }

    /**
     * Prepare Destroy Entity 
     */
    Destroy() {
        this.PendingDestroy = true;

    }

    render(delta) {

    }

    /**
     * Set Entity Velocity clones the input vector
     * @param {Vector2} velocity the new velocity
     */
    SetVelocity(velocity) {
        this.Velocity = velocity.clone();
    }


    /**
     * Checks if entity is relevant in world
     * @returns {Boolean} 
     */
    IsInWorldBounds() {

        if (this.Location.x < -400
            || this.Location.x > 1200
            || this.Location.y < -400
            || this.Location.y > 1000) {
            return false;
        }

        return true;
    }



}



export default Entity;