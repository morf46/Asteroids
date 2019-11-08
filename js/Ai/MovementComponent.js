



/**
 * Basic Movement Component adds Velocity to Location scaled by delta.
 */
class MovementComponent {

    constructor(props) {

        this.Outer = props.Outer || null;

    }


    UpdateMovement(delta) {
        if (this.Outer) {
            
            this.Outer.Location.addScaled(this.Outer.Velocity, delta);

        }
    }
}


export default MovementComponent;