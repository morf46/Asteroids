import { Monster } from "../internal";
import GameMode from "../GameMode";
import HomingMovement from "../Ai/HomingMovement";
import colormap from 'colormap';



export class SuicideMonster extends Monster {


    Init(props) {

        super.Init(props);

        this.ColorMap = colormap({
            colormap: 'bluered',
            nshades: 40,
            format: 'hex',
            alpha: 1
        })
        this.BaseColor = this.ColorMap[0];
        

        this.target = GameMode.PlayerPawn;
        
    }



    CreateMovementComponent() {
        return new HomingMovement({ Outer: this, target: GameMode.PlayerPawn });
    }

    CreateCollionBody() {
        this.radius = 20;
        return this.World.collisions.createCircle(this.Location.x, this.Location.y, this.radius);
    }

    update(delta) {
        super.update(delta);
        this.lerpChromaColorLoop(delta, 200, this.ID);
    }


}