class PubSub {

    constructor() {
        this.listeners = {};
    }


    static publish(eventName, payload) {
        for (let callback in this.listeners[eventName]) {
            let executeCallback = callback(payload);

        }
    }


    static subscribe(eventName, callback) {

        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [callback];

        } else {
            this.listeners[eventName] = [...this.listeners[eventName], callback];
        };
    }


    static unsubscribe(eventName, callback) {
        if (!this.listeners[eventName]) {
            return
        } else {
            let callBacks = this.listeners[eventName];
            let removedCallback = callBacks.filter(callBackName => callBackName != callback);
            this.listeners[eventName] = [removedCallback];
        }
    }


}