
import {Monster} from "../internal";
import Vector2 from "../vector";
import colormap from 'colormap';
import { lerp } from "../mathutils";
import ParticleEmitter from "../particle/particleemitter";

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

        this.ImpactFX = ParticleEmitter;

        this.DamageDealt = 5;
    }

    CreateCollionBody() {
        return this.World.collisions.createCircle(this.Location.x, this.Location.y, 2);
    }

    update(delta) {
        super.update(delta);
        this.lerpChromaColor();
    }

    postUpdate(delta) {
        if (!this.PendingDestroy) {
            const potentials = this.RootBody.potentials();
            for (const otherBody of potentials) {
                if (this.RootBody.collides(otherBody, this.World.collisionResults)) {
                    if (this.team !== otherBody.Outer.team) {
                        otherBody.Outer.takeDamage(this.DamageDealt);
                        let Direction = new Vector2(this.World.collisionResults.overlap_x, this.World.collisionResults.overlap_y).multiply(-1);
                        let FX = new ParticleEmitter({ location: this.Location, direction: Direction })
                        FX.Activate();
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