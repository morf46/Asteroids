import Vector2 from "../lib/vector";
import { Entity, Particle } from "../internal";
import { getRandomfloat } from "../lib/mathutils";
import World from "../world";



export class ParticleEmitter extends Entity {



    Init(props) {
        super.Init(props);

        this.SpawnCount = 5;
        this.Direction = props.direction || new Vector2(0, 0);
        this.Location = props.location || new Vector2(0, 0);

        this.ParticleClass = props.ParticleClass || Particle;

        //BurstList [Time, Count], pre ordered by time ASC
        this.BurstList = [
            [0, 5],
        ];
        //Stored Burst list index
        this.BurstListIndex = 0;

        this.TimeToLife = props.timetolife || 1000;

        this.IsActive = false;

        this.Period = 0;
        this.LastTimeEmitted = 0;
    }


    Activate() {
        this.IsActive = true;
    }

    Deactivate() {
        this.IsActive = false;
    }

    SpawnParticle() {
        if (this.ParticleClass) {
            for (let i = 0; i < this.SpawnCount; i++) {

                let randomDirection = getRandomfloat(-0.2, 0.2);
                let localVelocity = this.Direction.clone().rotate2D(randomDirection).multiply(getRandomfloat(200, 400));
                this.World.SpawnEntity(this.ParticleClass, { location: this.Location, velocity: localVelocity });
            }
        }
    }


    update(delta) {

        super.update(delta);

        if (this.IsActive) {
            if (this.Period > 0) {
                if (this.LastTimeEmitted + this.Period < this.World.GameTime) {
                    this.SpawnParticle();
                    this.LastTimeEmitted = this.World.GameTime;
                }
            }

            if (this.BurstListHasValidEntry()) {
                this.SpawnParticle();
                this.BurstListIndex++;
            }
        }


    }

    BurstListHasValidEntry() {
        const TIME_INDEX = 0;
        const COUNT_INDEX = 1;
        return this.BurstList.length > 0
            && this.BurstListIndex < this.BurstList.length
            && this.Age > this.BurstList[this.BurstListIndex][TIME_INDEX]
    }


}



