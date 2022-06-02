import { Particle } from "../internal";
import { getRandomfloat, lerp } from "../lib/mathutils";
import colormap from 'colormap';


export class P_Rainbow_Trail extends Particle {



    Init(props) {
        super.Init(props);

        this.TimeToLife = getRandomfloat(50,75);

        this.ColorMap = colormap({
            colormap: 'rainbow',
            nshades: 20,
            format: 'hex',
            alpha: 0.5
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
        ctx.arc(0, 0, 2, 0, 2 * Math.PI)
        ctx.fill();
        ctx.restore();

    }


}

