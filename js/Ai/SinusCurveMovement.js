
import Vector2 from "../vector";
import MovementComponent from "./MovementComponent";




/**
 * Y Axis Sinus Movement, Spawn x axis keept as offset
 */
class SinusCurveMovementComponent extends MovementComponent {

    constructor(props) {

        super(props)
        this.frequency = 100;
        this.magnitude = 90;
        this.OffsetX = this.Outer.Location.x;
    }

    UpdateMovement(delta) {

        var LocalLocation = this.Outer.Location.clone()
        LocalLocation.addScaled(this.Outer.Velocity, delta);

        //use y axis for sinus
        this.Outer.Location = new Vector2((Math.sin(LocalLocation.y / this.frequency) * this.magnitude) + this.OffsetX, LocalLocation.y);

    }

}


export default SinusCurveMovementComponent;