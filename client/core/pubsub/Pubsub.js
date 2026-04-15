class PubSub {

    constructor() {
        this.listeners = {};
    }

    publish(eventName, payload) {
        for (let callback in this.listeners[eventName]) {
            let executeCallback = callback(payload);

        }
    }


    subscribe(eventName, callback) {

        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [callback];
            // Här ska det skapas en ny nyckel med array för varje sub där eventet inte finns, raden där uppe är fel så bortse från den
            // Används object keys isåfall
            // Jämför sedan vad som är bättre, array eller object med allt 
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