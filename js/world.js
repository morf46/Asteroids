import Collisions from "./collisions/Collisions.mjs";




class _World {


    constructor() {
        this.EntityList = [];
        this.PendingSpawns = [];
        this.collisions = new Collisions();
        this.collisionResults = this.collisions.createResult();
        this.GameTime = 0;

        this.GlobalIDIncrement = 0;
    }

    GetNextEntityID() {
        return ++this.GlobalIDIncrement;
    }

    /**
     * Spawns entity and registers it ot the world
     * 
     * @param {Class} ClassToSpawn 
     * @param {Object} props 
     * @return Spawned Entity
     */
    SpawnEntity(ClassToSpawn, props) {
        let newEntity = new ClassToSpawn(props);
        this.RegisterEntity(newEntity);
        return newEntity;
    }

    RegisterEntity(NewEntity) {
        this.PendingSpawns.push(NewEntity);
    }

    RegisterParticle(NewParticle) {
        this.RegisterEntity(NewParticle);
    }




    InitWorld() {

        this.canvas = document.getElementById('mainCanvas');
        this.ctx = this.canvas.getContext('2d');

    }

    /**
     * updates game time
     * @param {number} TimeStamp Timestamp from gameloop
     */
    UpdateGameTime(TimeStamp) {
        this.GameTime = TimeStamp;
    }


    Update(delta) {


        //push new spawns to list
        for (let i = 0; i < this.PendingSpawns.length; i++) {
            const newEntity = this.PendingSpawns[i];
            this.EntityList.push(newEntity);
            newEntity.BeginPlay();
        }
        //clear list
        this.PendingSpawns = [];

        this.EntityList = this.EntityList.filter(entity => {
            if (!entity.PendingDestroy) {

                entity.update(delta);

                if (entity.RegisterCollisonQuery === true) {
                    entity.QueryCollisions(delta);
                }

                entity.render(delta);
            }

            return entity.PendingDestroy === false;
        });

    }

    UpdateCollisions(delta) {
        //Update Collision
        this.collisions.update();
    }

}

const World = new _World();
export default World;
