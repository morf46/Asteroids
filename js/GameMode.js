import Vector2 from "./vector";
import { SpawnEnemyLine, DefaultEnemyProps, SinusCurveDefaultProps } from "./GameplayStatics";
import Monster from "./monster";
import { getRandomfloat, getRandomBoolWithWeight, getRandomBool, getRandomInt } from "./mathutils";
import Asteroid from "./monsters/asteroid";
import CosineCurveMovementComponent from "./Ai/CosineCurveMovement";

const SINE_VERCTICAL_DOWN = 1;
const SINE_HORIZONTAL = 2;
const LINE_X = 3;


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
        let SetID = getRandomInt(1, 4);
        switch (SetID) {
            case SINE_VERCTICAL_DOWN:
                {
                    let OriginLocation = new Vector2(getRandomfloat(100, 700), -400);
                    let TargetLocation = new Vector2(OriginLocation.x, 0);
                    SpawnEnemyLine(OriginLocation, TargetLocation, 40, Asteroid, SinusCurveDefaultProps);
                }
                break;
            case SINE_HORIZONTAL:
                {
                    let IsSpawnLeft = getRandomBool();
                    let randomY = getRandomfloat(100, 500);
                    let OriginLocation = IsSpawnLeft ? new Vector2(-400, randomY) : new Vector2(1200, randomY);
                    let TargetLocation = IsSpawnLeft ? new Vector2(0, randomY) : new Vector2(800, randomY);
                    let LocalVelocity = IsSpawnLeft ? new Vector2(200, 0) : new Vector2(-200, 0)
                    SpawnEnemyLine(OriginLocation, TargetLocation, 40, Asteroid, {
                        MovementComponent: CosineCurveMovementComponent, velocity: LocalVelocity
                    });

                }
                break;
            case LINE_X:
                {
                    let IsSpawnLeft = getRandomBool();
                    let randomY = getRandomfloat(-100, -400);
                    let OriginLocation, TargetLocation, LocalVelocity;
                    let magnitudeX = getRandomfloat(100, 200);
                    let magnitudeY = getRandomfloat(100, 200);

                    if (IsSpawnLeft) {
                        OriginLocation = new Vector2(1200, randomY);
                        TargetLocation = new Vector2(OriginLocation.x - getRandomfloat(100, 400), randomY + getRandomfloat(100, 300));
                        LocalVelocity = new Vector2(magnitudeX * -1, magnitudeY);

                    } else {
                        OriginLocation = new Vector2(-400, randomY);
                        TargetLocation = new Vector2(OriginLocation.x + getRandomfloat(100, 400), randomY + getRandomfloat(100, 300));
                        LocalVelocity = new Vector2(magnitudeX, magnitudeY);
                    }

                    SpawnEnemyLine(OriginLocation, TargetLocation, 40, Asteroid, { velocity: LocalVelocity });
                }
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
