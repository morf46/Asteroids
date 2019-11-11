import Vector2 from "../vector";
import Particle from "./particle";
import { getRandomfloat } from "../mathutils";
import World from "../world";



class ParticleEmitter {

    constructor(props) {

        this.SpawnCount = 5;
        this.Direction = props.direction || new Vector2(0, 0);
        this.Location = props.location || new Vector2(0, 0);

    }




    Activate() {
        for (let i = 0; i < this.SpawnCount; i++) {
            let randomDirection = getRandomfloat(-0.2, 0.2);
            let localVelocity = this.Direction.clone().rotate2D(randomDirection).multiply(getRandomfloat(200, 400));
            let NewParticle = new Particle({ location: this.Location, velocity: localVelocity });
            World.RegisterParticle(NewParticle);
        }
    }


}



export default ParticleEmitter;