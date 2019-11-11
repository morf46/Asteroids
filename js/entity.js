import Vector2 from "./vector"
import World from "./world";

class Entity {




    constructor(props) {

        this.Location = props.location ? props.location.clone() : new Vector2(0, 0);
        this.Velocity = props.velocity ? props.velocity.clone() : new Vector2(0, 0);
        /*Rotation in Radians */
        this.Rotation = 0;

        this.radius = 0;

        this.World = World;
        this.RootBody = null;
        this.vertexes = [];
        this.PendingDestroy = false;
        this.RegisterPostUpdate = false;
        this.team = props.team || 0;


        this.maxHealth = props.maxHealth || 0;
        this.health = props.health || this.maxHealth;

        this.TimeToLife = props.timetolife || -1;
        this.spawnTime = World.GameTime;
        this.Age = 0;



        this.BaseColor = "#fff";
        this.StrokeColor = "#fff";
    }


    BeginPlay() {

    }

    preUpdate(delta) {

    }

    update(delta) {

        this.Age = World.GameTime - this.spawnTime

        if (this.TimeToLife > 0) {
            if (this.Age > this.TimeToLife) {
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

        if (this.Location.x < -2000
            || this.Location.x > 2000
            || this.Location.y < -2000
            || this.Location.y > 2000) {
            return false;
        }

        return true;
    }



}



export default Entity;