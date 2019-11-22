import { Asteroid, ProjectileWeaponBase } from "../internal";




class Pool {

    constructor() {

        this.metrics = {}
        this.clearMetrics();

        this.assocPoolList = {};

    }

    Init() {

        for (let i = 0; i < 100; i++) {
            this.alloc(Asteroid, {});
        }

        for (let i = 0; i < 100; i++) {
            this.alloc(ProjectileWeaponBase, {});
        }

    }

    /**
     * Allocate Object 
     * Creates one if list is empty
     * @param {Object} props 
     * @return {Object} Returns Object from pool
     */
    alloc(ClassType, props) {
        var Obj;

        if (!this.assocPoolList[ClassType.name] || this.assocPoolList[ClassType.name].length == 0) {

            Obj = new ClassType(props);

            this.metrics.totalalloc++;

        } else {

            Obj = this.assocPoolList[ClassType.name].pop();
            Obj.Init(props);

            Obj.PendingDestroy = false;

            this.metrics.totalfree--;
        }

        this.printDebug();

        return Obj;
    }

    /**
     * Returns object to pool.
     * @param {Object} obj 
     */
    free(obj) {

        if (!this.assocPoolList[obj.constructor.name]) {
            this.assocPoolList[obj.constructor.name] = []
        }
        this.assocPoolList[obj.constructor.name].push(obj);
        this.metrics.totalfree++;

        this.printDebug();
    }

    /**
     * Clear Pool
     */
    collect() {

        this.poollist = [];

        var inUse = this.metrics.totalalloc - this.metrics.totalfree;
        this.clearMetrics(inUse);

    }

    clearMetrics(allocated) {
        this.metrics.totalalloc = allocated || 0;
        this.metrics.totalfree = 0;

    }

    printDebug() {
        var e = document.getElementById('debug');
        while (e.firstChild) {
            e.removeChild(e.firstChild);
        }
        for (var property in this.assocPoolList) {
            if (this.assocPoolList.hasOwnProperty(property)) {
                var p = document.createElement("p");
                p.innerText = `${property} : ${this.assocPoolList[property].length}` ;
                e.appendChild(p);
            }
        }
    }


}


export default Pool;



