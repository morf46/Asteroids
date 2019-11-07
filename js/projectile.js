
import Monster from "./monster";
import Vector2 from "./vector";


class Projectile extends Monster {

    constructor(location) {
        super(location);


        this.RegisterPostUpdate = true;

        this.TimeToLife = 3000;
    }

    CreateCollionBody() {
        return this.World.collisions.createCircle(this.Location.x, this.Location.y, 2);
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
}

export default Projectile;