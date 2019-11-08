import Entity from './entity';
import Vector2 from './vector';
import { getRandomfloat } from './mathutils';


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

    update(delta) {

        this.Location.addScaled(this.Velocity, delta);

        if (this.Location.y > 900) {
            this.Location = new Vector2(getRandomfloat(0, 800), getRandomfloat(-120, -250));
        }
    }

    render(delta) {
        const ctx = this.World.ctx;
        ctx.save();
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#fff';
        ctx.translate(this.Location.x, this.Location.y);
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}


export default StarBackGround;