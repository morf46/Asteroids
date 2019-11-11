import Monster from "../monster";
import Vector2 from "../vector";
import { getRandomfloat, getRandomBool, getRandomInt } from "../mathutils";
import chroma from 'chroma-js';



class Asteroid extends Monster {

    constructor(props) {
        super(props);
        //inverse rotation
        let inverse = getRandomBool() ? 1 : -1;
        this.rotationSpeed = getRandomfloat(0.01, 0.05) * inverse;

        this.BaseChroma = chroma('saddlebrown').darken(getRandomfloat(0, 0.8));
        this.BaseColor = this.BaseChroma.hex();
        this.LowHealthColor = "#F00";
        this.HealthChromaScale = chroma.scale(["#fff", this.LowHealthColor]).mode('lab');


        this.maxHealth = 70;
        this.health = this.maxHealth;
    }

    update(delta) {

        this.Rotation += this.rotationSpeed;

        super.update(delta);

    }

    CreateRandomPolygon() {
        let Radius = getRandomfloat(15, 40);
        let Center = new Vector2(0, 0);
        let ArrayVertexes = [];
        let RandomAngles = [];
        let numVertexes = getRandomInt(8, 16);
        for (let i = 0; i < numVertexes; i++) {
            RandomAngles.push(getRandomfloat(0, Math.PI * 2));
        }

        //sort random angels direction dont matter
        RandomAngles.sort();

        for (let i = 0; i < numVertexes; i++) {

            let x = Center.x + Radius * Math.cos(RandomAngles[i]);
            let y = Center.y + Radius * Math.sin(RandomAngles[i]);

            ArrayVertexes.push([x, y]);
        }
        return ArrayVertexes;
    }

    CreateCollionBody() {
        return this.World.collisions.createPolygon(this.Location.x, this.Location.y, this.vertexes);
    }

    takeDamage(amount) {
        super.takeDamage(amount);
        this.BaseColor = chroma.blend(this.BaseChroma.hex(), this.HealthChromaScale(this.health / this.maxHealth).hex(), 'multiply');;
    }

    render() {
        const ctx = this.World.ctx;
        ctx.save();

        ctx.fillStyle = this.BaseColor;
        ctx.strokeStyle = this.StrokeColor;

        ctx.translate(this.Location.x, this.Location.y);
        ctx.rotate(this.Rotation);

        ctx.beginPath();
        //draw polygon
        for (let i = 0; i < this.vertexes.length; i++) {
            ctx.lineTo(this.vertexes[i][0], this.vertexes[i][1]);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

}


export default Asteroid;