import Vector2 from "./lib/vector";
import { Monster } from "./internal";
import World from "./world";
import SinusCurveMovementComponent from "./Ai/SinusCurveMovement";
import colormap from 'colormap';


export const SCREEN_W = 800;
export const SCREEN_H = 600;


export const DefaultEnemyProps = { velocity: new Vector2(0, 150) };
export const SinusCurveDefaultProps = { MovementComponent: SinusCurveMovementComponent, velocity: new Vector2(0, 200) }


export const AsteroidColormap = colormap({
    colormap: 'turbidity',
    nshades: 40,
    format: 'hex',
    alpha: 1
});
export const SuicideColormap = colormap({
    colormap: 'bluered',
    nshades: 40,
    format: 'hex',
    alpha: 1
});
export const ParticleBaseColormap = colormap({
    colormap: 'winter',
    nshades: 20,
    format: 'hex',
    alpha: 1
});

/**
 * Spawns Enemys in a Line
 * 
 * @param {Vector2} Location Origin location
 * @param {Vector2} TargetLocation Direction vector 
 * @param {Number} Padding Distance betweens spawns.
 * @param {Class} ClassToSpawn The Class to Spawn. Defaults to Monster 
 * @param {Object} InProps Properties passed to constructor
 */
export function SpawnEnemyLine(Location, TargetLocation, Padding, ClassToSpawn = Monster, InProps = {}) {

    let LocalPadding = Padding || 1;

    let Dist = Location.Distance(TargetLocation);
    let Count = Math.round(Dist / Padding);
    let LocalLocation = Location.clone();

    for (let i = 0; i < Count; i++) {
        let LocalProps = { location: LocalLocation };
        LocalProps = { ...LocalProps, ...InProps };
        World.SpawnEntity(ClassToSpawn, LocalProps);
        LocalLocation.moveTowards(TargetLocation, Padding);
    }

}