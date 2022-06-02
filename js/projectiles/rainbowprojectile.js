import colormap from 'colormap';
import { P_Rainbow_Trail, Projectile, E_Rainbow_Trail } from '../internal';
import Vector2 from '../lib/vector';



export class RainbowProjectile extends Projectile {

    Init(props) {
        super.Init(props);
        this.RegisterCollisonQuery = true;

        this.TimeToLife = 1200;

        this.ColorMap = null;
        this.BaseColor = "#220000";
        this.DamageDealt = 5;

        this.FX = null;

        this.ColorMap = colormap({
            colormap: 'rainbow',
            nshades: 20,
            format: 'hex',
            alpha: 0.5
        })
    }



    BeginPlay() {
        this.FX = this.World.SpawnEntity(E_Rainbow_Trail, { ParticleClass: P_Rainbow_Trail, location: this.Location, direction: new Vector2(0, 1) });
        this.FX.Activate();
    }

    update(delta) {
        super.update(delta);
        if (this.FX) {
            this.FX.Location = this.Location.clone();
        }
        this.lerpChromaColor();
    }


    Destroy() {
        super.Destroy();
        if (this.FX) {
            this.FX.Deactivate();
            this.FX.Destroy();
        }
    }

}