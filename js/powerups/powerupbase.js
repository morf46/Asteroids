import { Monster, Player, RainbowGun, WPN_TPattern } from "../internal";
import Vector2 from "../lib/vector";
import chroma from 'chroma-js';

class PowerUpBase extends Monster {


    Init(props) {

        super.Init(props);

        this.TimeToLife = 60000;
        this.Velocity = new Vector2(0, 0);
        this.BaseColor = "#ffa500";

    }

    CreateCollionBody() {
        this.radius = 10;
        return this.World.collisions.createCircle(this.Location.x, this.Location.y, this.radius);
    }





    update(delta) {
        super.update(delta);

        this.BaseColor = chroma('#ffa500').darken(Math.sin(this.Age / 500)).hex();
    }

    OnOverlap(OtherEntity) {
        if (OtherEntity instanceof Player) {

            OtherEntity.PickupItem(WPN_TPattern);
            this.Destroy();
        }
    }




}


export default PowerUpBase;