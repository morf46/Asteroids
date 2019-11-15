import Vector2 from "../vector";
import { Entity, ParticleEmitter, P_Rainbow_Trail } from "../internal";
import { getRandomfloat } from '../mathutils';



export class E_Rainbow_Trail extends ParticleEmitter {

    constructor(props) {
        super(props);

        this.SpawnCount = 5;
        this.Direction = props.direction || new Vector2(0, 0);
        this.Location = props.location || new Vector2(0, 0);

        this.ParticleClass = props.ParticleClass || P_Rainbow_Trail;


        this.BurstList = [];
        this.BurstListIndex = 0;
        this.TimeToLife = props.timetolife || 0;

        this.IsActive = false;

        this.Period = 50;
    }


    SpawnParticle() {
        if (this.ParticleClass) {
            for (let i = 0; i < this.SpawnCount; i++) {

                let randomDirection = getRandomfloat(-0.1, 0.1);
                let localVelocity = this.Direction.clone().rotate2D(randomDirection).multiply(getRandomfloat(50, 70));
                let NewParticle = new this.ParticleClass({ location: this.Location, velocity: localVelocity });
                this.World.RegisterParticle(NewParticle);
            }
        }
    }
}



