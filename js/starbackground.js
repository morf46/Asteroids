import Entity from './entity';
import Vector2 from './vector';
import { getRandomfloat } from './mathutils';


class StarBackGround extends Entity {


    constructor(x, y, speed, size) {
        super();
        this.Location = new Vector2(x, y);
        this.Velocity = new Vector2(0, speed);
        this.width = size;
        this.height = size;

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