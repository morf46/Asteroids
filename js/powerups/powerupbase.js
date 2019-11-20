import { Monster, Player, RainbowGun, WPN_TPattern } from "../internal";
import Vector2 from "../lib/vector";
import colormap from 'colormap';

class PowerUpBase extends Monster {


    constructor(props) {
        super(props);

        this.TimeToLife = 60000;
        this.Velocity = new Vector2(0, 0);

        this.ColorMap = colormap({
            colormap: 'temperature',
            nshades: 40,
            format: 'hex',
            alpha: 1
        })
        this.BaseColor = this.ColorMap[0];



    }

    CreateCollionBody() {
        this.radius = 10;
        return this.World.collisions.createCircle(this.Location.x, this.Location.y, this.radius);
    }





    update(delta) {

        super.update(delta);
        this.lerpChromaColorLoop(delta, 500);
    }

    OnOverlap(OtherEntity) {
        if (OtherEntity instanceof Player) {

            OtherEntity.PickupItem(WPN_TPattern);
            this.Destroy();
        }
    }




}


export default PowerUpBase;