import Monster from "../monster";
import World from "../world";
import Vector2 from "../vector";




/**
 * Y Axis Sinus Movement, Spawn x axis keept as offset
 */
class SinusCurveMonster extends Monster {

    constructor(location) {
        super(location)
        this.Velocity = new Vector2(0, 200);
        this.frequency = 100;
        this.magnitude = 90;
        this.OffsetX = this.Location.x;
    }

    UpdateMovement(delta) {



     
        var LocalLocation = this.Location.clone()
        LocalLocation.addScaled(this.Velocity, delta);

        //use y axis for sinus
        this.Location = new Vector2((Math.sin(LocalLocation.y / this.frequency) * this.magnitude) + this.OffsetX, LocalLocation.y);

    }

}


export default SinusCurveMonster;