import {Entity} from './internal';
import Vector2 from './lib/vector';
import { getRandomfloat, lerp } from './lib/mathutils';
import chroma from 'chroma-js';


/**
 * Background star 
 * extra props size
 */
class StarBackGround extends Entity {


    constructor(props) {
        super(props);
        this.width = props.size;
        this.height = props.size;

    }

    BeginPlay() {

        super.BeginPlay();

        let factor = this.width / 5;
        let lerpValue = lerp(0, 0.5, factor);
        this.BaseColor = chroma('#fff').darken(lerpValue).hex();
    }

    update(delta) {

        this.Location.addScaled(this.Velocity, delta);

        if (this.Location.y > 900) {
            this.Location = new Vector2(getRandomfloat(0, 800), getRandomfloat(-120, -250));
        }
    }

    render(delta) {
        const ctx = this.World.ctx;
        ctx.save();
        ctx.fillStyle = this.BaseColor;
        
        ctx.translate(this.Location.x, this.Location.y);
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}


export default StarBackGround;