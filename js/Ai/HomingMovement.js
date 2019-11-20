import MovementComponent from "./MovementComponent";
import Vector2  from "../lib/vector";


class HomingMovement extends MovementComponent {
    constructor(props) {

        super(props);

        this.target = props.target || null;

        this.HomingAccelerationMagnitude = 400;
        this.MaxVelocity = 200;
    }


    UpdateMovement(delta) {
        if (this.Outer) {

            //HomingAcceleration = ((HomingTargetComponent->GetComponentLocation() - UpdatedComponent->GetComponentLocation()).GetSafeNormal() * HomingAccelerationMagnitude);
            if (this.target) {

                let OldVelocity = this.Outer.Velocity.clone();
                let VectorAcceleration = this.target.Location.clone().subtract(this.Outer.Location).unitVector2.multiply(this.HomingAccelerationMagnitude);

                this.Outer.Velocity = VectorAcceleration.multiply(delta).add(OldVelocity);

                this.Outer.Location.addScaled(this.Outer.Velocity.limitTo(this.MaxVelocity), delta);


            } else {

                this.Outer.Location.addScaled(this.Outer.Velocity, delta);
            }


        }
    }
}

export default HomingMovement;