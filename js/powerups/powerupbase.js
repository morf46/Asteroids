import { Monster, Player, RainbowGun, WPN_TPattern } from "../internal";
import Vector2 from "../lib/vector";
import chroma from 'chroma-js';

class PowerUpBase extends Monster {


    Init(props) {

        super.Init(props);

        this.TimeToLife = 60000;
        this.Velocity = new Vector2(0, 0);
        this.BaseColor = "#ffa500";
        this.DropClass = WPN_TPattern;
        this.DropWeights =[
            {Class: WPN_TPattern, Weight: 1},
            {Class: RainbowGun, Weight: 1},
        ]
    }

    CreateCollionBody() {
        this.radius = 10;
        return this.World.collisions.createCircle(this.Location.x, this.Location.y, this.radius);
    }





    update(delta) {
        super.update(delta);

        this.BaseColor = chroma('#ffa500').darken(Math.sin(this.Age / 500)).hex();
    }

    getDropClass() {

        let totalWeight = this.DropWeights.reduce((acc, cur) => acc + cur.Weight, 0);
        let random = Math.random() * totalWeight;
        let currentWeight = 0;

        for (let i = 0; i < this.DropWeights.length; i++) {
            currentWeight += this.DropWeights[i].Weight;
            if (random < currentWeight) {
                return this.DropWeights[i].Class;
            }
        }

        return this.DropClass;
    }

    OnOverlap(OtherEntity) {
        if (OtherEntity instanceof Player) {

            OtherEntity.PickupItem(this.getDropClass());
            this.Destroy();
        }
    }




}


export default PowerUpBase;