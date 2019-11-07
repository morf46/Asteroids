import Monster from "../monster";
import World from "../world";
import Vector2 from "../vector";





class SinusCurveMonster extends Monster {



    UpdateMovement() {


        var Lifetime = World.GameTime - this.spawnTime

        /*
        X = this.position.X + this.speed.X;
        Y = ((float)Math.Sin(X / this.ratio) * this.height) + this.offsetY;
        */

        this.Location = new Vector2(Math.cos(this.Location.y / 2) + 200, this.Location.y + this.Velocity.y);

    }

}


export default SinusCurveMonster;