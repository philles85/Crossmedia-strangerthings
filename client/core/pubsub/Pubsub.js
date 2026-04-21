class PubSub {

    constructor() {
        this.listeners = {

        };
    }

    publish(eventName, payload) {
        console.log(this.listeners[eventName])
        for (let callback of this.listeners[eventName]) {
            callback(payload);
        }
    }


    subscribe(eventName, callback) {

        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [callback];

        } else {
            this.listeners[eventName] = [...this.listeners[eventName], callback];
        };
    }


    unsubscribe(eventName, callback) {
        if (!this.listeners[eventName]) {
            return
        } else {
            let callBacks = this.listeners[eventName];
            let removedCallback = callBacks.filter(callBackName => callBackName != callback);
            this.listeners[eventName] = [removedCallback];
        }
    }


}

export const pubsub = new PubSub(); 