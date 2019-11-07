import Vector2 from "./vector";
import Monster from "./monster";
import World from "./world";
import { getRandomfloat } from "./mathutils";



export const SCREEN_W = 800;
export const SCREEN_H = 600;


/**
 * Spawns Enemys in a Line
 * 
 * @param {Vector2} Location Origin location
 * @param {Vector2} TargetLocation Direction vector 
 * @param {Number} Padding Distance betweens spawns.
 * @param {Class} ClassToSpawn The Class to Spawn. Defaults to Monster 
 */
export function SpawnEnemyLine(Location, TargetLocation, Padding, ClassToSpawn = Monster) {

    let LocalPadding = Padding || 1;

    let Dist = Location.Distance(TargetLocation);
    let Count = Math.round(Dist / Padding);
    let LocalLocation = Location.clone();

    for (let i = 0; i < Count; i++) {
        let monster = new ClassToSpawn(LocalLocation);
        World.RegisterEntity(monster);
        LocalLocation.moveTowards(TargetLocation, Padding);
    }

}