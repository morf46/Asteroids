import Collisions from "./collisions/Collisions.mjs";




class _World {


    constructor() {
        this.EntityList = [];
        this.EntityListPostUpdate = [];
        this.collisions = new Collisions();
        this.collisionResults = this.collisions.createResult();
        this.GameTime = 0;


    }



    RegisterEntity(NewEntity) {
        this.EntityList.push(NewEntity);
        if (NewEntity.RegisterPostUpdate === true) {
            this.EntityListPostUpdate.push(NewEntity);
        }
    }


    UnregisterInactiveEntitys() {
        console.log("GC run");
        this.EntityList = this.EntityList.filter(x => x.PendingDestroy === false);
        this.EntityListPostUpdate = this.EntityListPostUpdate.filter(x => x.PendingDestroy === false);
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
       

        this.EntityList.forEach(entity => {
            if (!entity.PendingDestroy) {
                entity.update(delta);
            }
        });
    }

    PostUpdate(delta) {
        //Update Collision
        this.collisions.update();
        //POST update
        this.EntityListPostUpdate.forEach(entity => {
            if (!entity.PendingDestroy) {
                entity.postUpdate(delta);
            }
        });
    }

}

const World = new _World();
export default World;
