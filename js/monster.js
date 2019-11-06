import Entity from "./entity";
import Vector2 from "./vector";



class Monster extends Entity {

    constructor(location) {
        super();
        this.Location = location.clone();
        this.Velocity = new Vector2(0, 100);
        this.RootBody = this.CreateCollionBody();
        this.RootBody.Outer = this;
        this.team = 8;

        this.maxHealth = 30;
        this.health = this.maxHealth;

    }

    /**
     * @returns Collision Body
     */
    CreateCollionBody() {
        return this.World.collisions.createCircle(this.Location.x, this.Location.y, 10);
    }

    update(delta) {

        super.update(delta);

        this.Location.addScaled(this.Velocity, delta);

        this.UpdateRootBody();

        

    }

    UpdateRootBody() {
        this.RootBody.x = this.Location.x;
        this.RootBody.y = this.Location.y;
    }

    postUpdate(delta) {


    }

    Destroy() {
        super.Destroy();
        this.RootBody.remove();
    }

    render(delta) {

    }

    takeDamage(amount) {
        this.health -= amount;

        if (this.health <= 0) {
            this.Destroy();
        }
    }
}


export default Monster;