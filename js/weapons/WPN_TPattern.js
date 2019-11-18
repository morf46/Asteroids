import { ProjectileWeaponBase } from "../internal";
import Vector2 from "../vector";
import { getRandomfloat } from "../mathutils";



export class WPN_TPattern extends ProjectileWeaponBase {

    constructor(props) {
        super(props);


        this.AmmunitionDrain = 1;
        this.MaxAmmunition = 15;
        this.Ammunition = this.MaxAmmunition;
    }


    HandleFireWeapon() {

        if (this.ProjectileClass) {


            for (let i = 0; i < 3; i++) {
                let xMagnitude = 0;
                let yMagnitude = -1;
                switch (i) {
                    case 1:
                        xMagnitude = 1;
                        yMagnitude = 0;
                        break;
                    case 2:
                        xMagnitude = -1;
                        yMagnitude = 0;
                        break;
                }
                let P = this.World.SpawnEntity(this.ProjectileClass, {
                    location: this.Outer.Location,
                    velocity: new Vector2(getRandomfloat(450, 550) * xMagnitude, getRandomfloat(450, 550) * yMagnitude).add(this.Outer.Velocity.clone().multiply(0.16)),
                    team: this.Outer.team

                });
                P.team = this.Outer.team;

                this.InternalShootCount++;
            }
        }

    }

}