


class Pool {
    constructor(PoolClass) {

        this.ClassToPool = PoolClass;

        this.metrics = {}
        this.clearMetrics();

        this.poollist = [];
    }

    alloc() {
        var Obj;

        if (this.poollist.length == 0) {
            
            Obj = new this.ClassToPool();

            this.metrics.totalalloc++;

        } else {
            
            Obj = this.poollist.pop();

            this.metrics.totalfree--;
        }

        return Obj;
    }


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




