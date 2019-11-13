import { Monster } from "../internal";
import Vector2 from "../vector";
import colormap from 'colormap';

class PowerUpBase extends Monster {


    constructor(props) {
        super(props);

        this.TimeToLife = 60000;
        this.Velocity = new Vector2(0, 0);



        this.BaseColor = "#FF0";

    }

    CreateCollionBody() {
        this.radius = 10;
        return this.World.collisions.createCircle(this.Location.x, this.Location.y, this.radius);
    }





    update(delta) {

        super.update(delta);

    }

    OnCheckedOverlap(OtherEntity) {
        if (OtherEntity instanceof Player) {
            this.Destroy();
        }
    }




}


export default PowerUpBase;