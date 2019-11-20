import Vector2 from "./lib/vector";
import { SpawnEnemyLine, DefaultEnemyProps, SinusCurveDefaultProps } from "./GameplayStatics";
import { Monster, Asteroid, Player, SuicideMonster } from "./internal";
import { getRandomfloat, getRandomBoolWithWeight, getRandomBool, getRandomInt } from "./lib/mathutils";
import CosineCurveMovementComponent from "./Ai/CosineCurveMovement";
import World from "./world";



const SINE_VERCTICAL_DOWN = 1;
const SINE_HORIZONTAL = 2;
const LINE_X = 3;
const LINE_HORIZONTAL = 4;


class _GameMode {


    constructor() {
        this.PlayerPawn = null;

    }
    RegisterPlayerPawn(InPlayerPawn) {
        this.PlayerPawn = InPlayerPawn;
    }

    RespawnDEV() {
        var newPlayer = World.SpawnEntity(Player, { location: new Vector2(400, 500) })
        this.RegisterPlayerPawn(newPlayer);
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
        const EnemyClass = Asteroid;
        let SetID = getRandomInt(1, 5);
        switch (SetID) {
            case SINE_VERCTICAL_DOWN:
                {
                    let OriginLocation = new Vector2(getRandomfloat(100, 700), -400);
                    let TargetLocation = new Vector2(OriginLocation.x, 0);
                    SpawnEnemyLine(OriginLocation, TargetLocation, 40, EnemyClass, SinusCurveDefaultProps);
                }
                break;
            case SINE_HORIZONTAL:
                {
                    let IsSpawnLeft = getRandomBool();
                    let randomY = getRandomfloat(100, 500);
                    let OriginLocation = IsSpawnLeft ? new Vector2(-400, randomY) : new Vector2(1200, randomY);
                    let TargetLocation = IsSpawnLeft ? new Vector2(0, randomY) : new Vector2(800, randomY);
                    let LocalVelocity = IsSpawnLeft ? new Vector2(200, 0) : new Vector2(-200, 0)
                    SpawnEnemyLine(OriginLocation, TargetLocation, 40, EnemyClass, {
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

                    SpawnEnemyLine(OriginLocation, TargetLocation, 40, EnemyClass, { velocity: LocalVelocity });
                }
                break;
            case LINE_HORIZONTAL:
                {
                    let OriginLocation = new Vector2(0, 0);
                    let TargetLocation = new Vector2(800, 0);
                    let LocalVelocity = new Vector2(0, 200);
                    SpawnEnemyLine(OriginLocation, TargetLocation, 80, EnemyClass, { velocity: LocalVelocity });
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

