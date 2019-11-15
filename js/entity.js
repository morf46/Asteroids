import Vector2 from "./vector"
import World from "./world";
import { lerp } from './mathutils';

export class Entity {




    constructor(props) {

        props = props || {}

        this.Outer = props.outer || null;
        this.SpawnLocation = props.location ? props.location.clone() : new Vector2(0, 0);
        this.Velocity = props.velocity ? props.velocity.clone() : new Vector2(0, 0);
        this.Location = this.SpawnLocation.clone();
        /*Rotation in Radians */
        this.Rotation = 0;

        this.radius = 0;

        this.World = World;
        this.RootBody = null;
        this.vertexes = [];
        this.PendingDestroy = false;
        this.RegisterCollisonQuery = false;
        this.team = props.team || 0;


        this.maxHealth = props.maxHealth || 0;
        this.health = props.health || this.maxHealth;

        this.TimeToLife = props.timetolife || -1;
        this.spawnTime = World.GameTime;
        this.Age = 0;



        this.BaseColor = "#fff";
        this.StrokeColor = "#fff";


        this.ColorMap = null;
    }


    BeginPlay() {

    }

    

    update(delta) {

        this.Age = World.GameTime - this.spawnTime

        if (this.TimeToLife > 0) {
            if (this.Age > this.TimeToLife) {
                this.Destroy();
            }
        }

        if (!this.IsInWorldBounds()) {
            //console.log("Out of Bounds: ", this);
            this.Destroy();
        }
        
    }


    QueryCollisions(delta) {

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

    OnCheckedOverlap(OtherEntity) {

    }



    lerpChromaColor(delta) {
        if (this.ColorMap && this.ColorMap.length > 0) {

            let factor = this.Age / this.TimeToLife;
            this.BaseColor = this.ColorMap[
                Math.floor(lerp(0, this.ColorMap.length, factor))
            ];
        }
    }


}



