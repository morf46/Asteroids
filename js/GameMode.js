import Vector2 from "./vector";
import { SpawnEnemyLine, DefaultEnemyProps, SinusCurveDefaultProps } from "./GameplayStatics";
import Monster from "./monster";
import { getRandomfloat, getRandomBoolWithWeight, getRandomBool, getRandomInt } from "./mathutils";
import Asteroid from "./monsters/asteroid";


class _GameMode {


    constructor() {
        this.PlayerPawn = null;

    }

    RegisterPlayerPawn(InPlayerPawn) {
        this.PlayerPawn = InPlayerPawn;
    }

    Update(delta) {
        if (this.PlayerPawn) {

            this.PlayerPawn.PositionLevel += 1 * delta;

            if (Math.floor(this.PlayerPawn.PositionLevel) % 3 === 0) {

                //add 1 to avoid modulus 0
                this.PlayerPawn.PositionLevel += 1;

                this.SpawnNextEnemySet();


            }
        }
    }

    SpawnNextEnemySet() {
        let SetID = getRandomInt(1, 1);
        switch (SetID) {
            case 1:
                let OriginLocation = new Vector2(getRandomfloat(100, 700), -400);
                let TargetLocation = new Vector2(OriginLocation.x, 0);
                SpawnEnemyLine(OriginLocation, TargetLocation, 40, Asteroid, SinusCurveDefaultProps);
                break;
            default:
                {
                    let TargetLocation = new Vector2(400, 0);
                    TargetLocation.setDirection(getRandomInt(360, 180), 2000);

                    var b = getRandomBool();
                    console.log(b);
                    var LocalProps = b ? DefaultEnemyProps : SinusCurveDefaultProps;
                    SpawnEnemyLine(new Vector2(400, 0), TargetLocation, 20, Monster, LocalProps);
                }
                break;
        }


    }





}


const GameMode = new _GameMode();
export default GameMode;

