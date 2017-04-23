class Pubsub {

    /**
     * The Event Aggregator
     */
    constructor() {
        this._subscriptions = {};
    }

    get subscriptions() {
        return this._subscriptions;
    }

    /**
     * Subscribes to an event
     * @param {string} name Subscription event
     * @param {Function} fn Function that will be called when the event is fired
     */
    subscribe(name, fn) {
        if (!name || !fn) throw new Error('You have to specify a name and a callback for your subscription');

        let sub = this._subscriptions[name];
        if (!sub) {
            this._subscriptions[name] = sub = [];
        }
        sub.push(fn);
    }

    /**
     * Publishes an event
     * @param {string} name Event that will be published
     * @param {*} data Data to be published
     */
    publish(name, data) {
        let sub = this._subscriptions[name];
        if (sub) {
            this._subscriptions[name].forEach((fn) => fn(data));
        }
    }
}