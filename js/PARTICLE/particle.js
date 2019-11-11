import Entity from "../entity";
import { getRandomfloat, lerp } from "../mathutils";
import colormap from 'colormap';


class Particle extends Entity {

    constructor(props) {
        super(props);
        this.TimeToLife = getRandomfloat(250,700);

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

        let factor = this.Age / this.TimeToLife;
        this.BaseColor = this.ColorMap[
            Math.floor(lerp(0, this.ColorMap.length, factor))
        ];
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


export default Particle;