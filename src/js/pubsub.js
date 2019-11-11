class pubsub {
    constructor() {
        // 主题/事件通道
        this.topics = {}
    }
    subscribe(topic, subscriber, fun) {
        if (!this.topics[topic]) {
            this.topics[topic] = []
        }
        this.topics[topic].push([subscriber, fun])
    }
    publish(topic, args) {
        if (!this.topics[topic]) {
            return
        }
        let res;
        let subscribers = this.topics[topic]
        subscribers.forEach(item => {
            let subscriber = item[0];
            res = subscriber[item[1]](args);
        })
        if (res) return res;
    }
}

export default new pubsub();
