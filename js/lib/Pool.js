


class Pool {

    constructor(PoolClass) {

        this.ClassToPool = PoolClass;

        this.metrics = {}
        this.clearMetrics();

        this.poollist = [];
    }


    /**
     * Allocate Object 
     * Creates one if list is empty
     * @param {Object} props 
     * @return {Object} Returns Object from pool
     */
    alloc(props) {
        var Obj;

        if (this.poollist.length == 0) {

            Obj = new this.ClassToPool();

            this.metrics.totalalloc++;

        } else {

            Obj = this.poollist.pop();

            Obj.Init(props);
            Obj.PendingDestroy = false;

            this.metrics.totalfree--;
        }

        return Obj;
    }

    /**
     * Returns object to pool.
     * @param {Object} obj 
     */
    free(obj) {

        this.poollist.push(obj);
        this.metrics.totalfree++;

    }


    collect() {

        this.poollist = [];

        var inUse = this.metrics.totalalloc - this.metrics.totalfree;
        this.clearMetrics(inUse);

    }

    clearMetrics(allocated) {
        this.metrics.totalalloc = allocated || 0;
        this.metrics.totalfree = 0;

    }


}


export default Pool;



