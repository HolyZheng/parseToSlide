import pubsub from './pubsub';

class timeInterval {
    constructor(interval, num) {
        // 下一个间隔就是第二张图
        this.i = 2;
        this.interval = interval;
        this.timeId;
        this.num = num;
        this.init();
    }
    init() {
        const that = this;
        that.timeId = setInterval(() => {
            if (that.i === that.num + 1) {
                pubsub.publish('index', that.i);
                // 当轮播到末尾辅助图时，马上换成第一张。
                setTimeout(() => {
                    pubsub.publish('index', that.num + 2);
                    that.i = 2;
                }, 400)
            } else {
                pubsub.publish('index', that.i)
                that.i++;
            }
        }, (this.interval+0.4) * 1000)
    }
    setPlay(hover) {
        const that = this;
        if (!hover && !that.timeId) return;
        if (hover && that.timeId) {
            clearInterval(that.timeId);
        } else if (!hover) {
            this.init();
        }
    }
    updateIndex(index) {
        const that = this;
        if (index === that.num + 2) {
            setTimeout(() => {
                pubsub.publish('index', that.num + 2);
                that.i = 2;
            }, 400)
        } else if(index === 0) {
            // 下一个是 -1 的话就尽快出发-1边界操作
            setTimeout(() => {
                pubsub.publish('index', -1);
                that.i = that.num + 1;
            }, 400)
        } else {
            that.i = index;
        }
    }
    getIndex() {
        const that = this;
        return that.i;
    }
}

export default timeInterval;
