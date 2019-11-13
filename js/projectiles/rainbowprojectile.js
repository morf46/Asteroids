import Projectile from "./projectile";
import SinusCurveMovementComponent from "../Ai/SinusCurveMovement";
import colormap from 'colormap';
import { getRandomBool } from "../mathutils";


export class RainbowProjectile extends Projectile {

    constructor(props) {
        super(props);

        this.RegisterPostUpdate = true;

        this.TimeToLife = 1200;

        this.ColorMap = colormap({
            colormap: 'rainbow',
            nshades: 30,
            format: 'hex',
            alpha: 1
        })
        this.BaseColor = this.ColorMap[0];
        this.DamageDealt = 5;

        
    }

    update(delta) {
        super.update(delta);
    }



}