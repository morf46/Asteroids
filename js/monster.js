import Entity from "./entity";
import Vector2 from "./vector";
import MovementComponent from "./Ai/MovementComponent";



class Monster extends Entity {

    constructor(props) {
        super(props);
        this.vertexes = this.CreateRandomPolygon();
        this.RootBody = this.CreateCollionBody();
        this.RootBody.Outer = this;
        this.team = props.team || 8;

        this.maxHealth = 30;
        this.health = this.maxHealth;

        this.MovementComponent = this.CreateMovementComponent(props);

    }


    CreateMovementComponent(props) {
        if (props.MovementComponent) {
            return new props.MovementComponent({ Outer: this, ...props.MovementConfig });
        } else {

            return new MovementComponent({ Outer: this });
        }
    }


    /**
     * Create Random Poylgon
     * @return {Number|Array}Vertexes array
     */
    CreateRandomPolygon() {
        return [];
    }

    /**
     * @return Collision Body
     */
    CreateCollionBody() {
        return this.World.collisions.createCircle(this.Location.x, this.Location.y, 10);
    }

    update(delta) {

        super.update(delta);
        this.UpdateMovement(delta);
        this.UpdateRootBody();

    }

    UpdateMovement(delta) {
        this.MovementComponent.UpdateMovement(delta);

    }

    UpdateRootBody() {
        this.RootBody.x = this.Location.x;
        this.RootBody.y = this.Location.y;
        this.RootBody.angle = this.Rotation;
    }

    postUpdate(delta) {


    }

    Destroy() {
        super.Destroy();
        this.RootBody.remove();
    }

    render(delta) {
        const ctx = this.World.ctx;
        ctx.save();
        ctx.translate(this.Location.x, this.Location.y);
        ctx.beginPath();
        ctx.fillStyle = this.BaseColor;
        ctx.arc(0, 0, 10, 0, 2 * Math.PI)
        ctx.fill();
        ctx.restore();
    }

    takeDamage(amount) {
        this.health -= amount;

        if (this.health <= 0) {
            this.Destroy();
        }
    }
}


export default Monster;