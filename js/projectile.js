
import Monster from "./monster";
import Vector2 from "./vector";
import colormap from 'colormap';
import { lerp } from "./mathutils";

class Projectile extends Monster {

    constructor(props) {
        super(props);


        this.RegisterPostUpdate = true;

        this.TimeToLife = 1200;

        this.ColorMap = colormap({
            colormap: 'summer',
            nshades: 20,
            format: 'hex',
            alpha: 1
        })
        this.BaseColor = this.ColorMap[0];
    }

    CreateCollionBody() {
        return this.World.collisions.createCircle(this.Location.x, this.Location.y, 2);
    }

    update(delta) {
        super.update(delta);
        let factor = this.Age / this.TimeToLife;
        this.BaseColor = this.ColorMap[
            Math.floor(lerp(0, this.ColorMap.length, factor))
        ];
    }

    postUpdate(delta) {
        if (!this.PendingDestroy) {
            const potentials = this.RootBody.potentials();
            for (const otherBody of potentials) {
                if (this.RootBody.collides(otherBody, this.World.collisionResults)) {
                    if (this.team !== otherBody.Outer.team) {
                        otherBody.Outer.takeDamage(10);
                        this.Destroy();
                        break;
                    }
                }
            }
        }

    }

    render(delta) {


        const ctx = this.World.ctx;
        ctx.save();
        ctx.translate(this.Location.x, this.Location.y);
        ctx.beginPath();
        ctx.fillStyle = this.BaseColor;
        ctx.arc(0, 0, 2, 0, 2 * Math.PI)
        ctx.fill();
        ctx.restore();
    }
}

export default Projectile;