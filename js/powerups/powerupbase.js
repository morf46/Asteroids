import { Monster, Player,RainbowGun } from "../internal";
import Vector2 from "../vector";
import { WPN_TPattern } from "../weapons/WPN_TPattern";


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

    OnOverlap(OtherEntity) {
        if (OtherEntity instanceof Player) {

            let NewGun = new WPN_TPattern();
            OtherEntity.PickupItem(NewGun);
            this.Destroy();
        }
    }




}


export default PowerUpBase;