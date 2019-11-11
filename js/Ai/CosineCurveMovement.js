
import Vector2 from "../vector";
import MovementComponent from "./MovementComponent";




/**
 * X Axis Cosine Movement, Spawn y axis keept as offset
 */
class CosineCurveMovementComponent extends MovementComponent {

    constructor(props) {

        super(props)
        this.frequency = 100;
        this.magnitude = 90;
        this.OffsetY = this.Outer.Location.y;
    }

    UpdateMovement(delta) {

        var LocalLocation = this.Outer.Location.clone()
        LocalLocation.addScaled(this.Outer.Velocity, delta);

        //use y axis for sinus
        this.Outer.Location = new Vector2(LocalLocation.x, (Math.cos(LocalLocation.x / this.frequency) * this.magnitude) + this.OffsetY);

    }

}


export default CosineCurveMovementComponent;