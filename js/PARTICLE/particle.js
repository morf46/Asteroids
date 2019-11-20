import { Entity } from "../internal";
import { getRandomfloat, lerp } from "../lib/mathutils";
import colormap from 'colormap';


export class Particle extends Entity {

   

    Init(props) {
        super.Init(props);
        this.TimeToLife = getRandomfloat(250, 700);
        
        this.ColorMap = colormap({
            colormap: 'winter',
            nshades: 20,
            format: 'hex',
            alpha: 1
        })
        this.BaseColor = this.ColorMap[0];
    }

    update(delta) {
        super.update(delta);

        this.Location.addScaled(this.Velocity, delta);

        this.lerpChromaColor();
    }





    render(delta) {
        const ctx = this.World.ctx;
        ctx.save();
        ctx.translate(this.Location.x, this.Location.y);
        ctx.beginPath();
        ctx.fillStyle = this.BaseColor;
        ctx.arc(0, 0, 1, 0, 2 * Math.PI)
        ctx.fill();
        ctx.restore();

    }


}
