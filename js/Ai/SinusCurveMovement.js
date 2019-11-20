
import Vector2  from "../lib/vector";
import MovementComponent from "./MovementComponent";




/**
 * Y Axis Sinus Movement, Spawn x axis keept as offset
 */
class SinusCurveMovementComponent extends MovementComponent {

    constructor(props) {

        super(props)
        this.frequency = props.frequency || 100;
        this.magnitude = props.magnitude || 90;
        this.OffsetX = this.Outer.Location.x;
        this.UseSpawnLocationDiff = props.usespawnlocationdiff || false;
    }

    UpdateMovement(delta) {

        var LocalLocation = this.Outer.Location.clone()
        LocalLocation.addScaled(this.Outer.Velocity, delta);

        let DiffY = this.UseSpawnLocationDiff ? LocalLocation.clone().subtract(this.Outer.SpawnLocation) : LocalLocation;
        //use y axis for sinus
        this.Outer.Location = new Vector2((Math.sin(DiffY.y / this.frequency) * this.magnitude) + this.OffsetX, LocalLocation.y);

    }

}


export default SinusCurveMovementComponent;