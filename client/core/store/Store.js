

class Store {

    constructor() {
        // Kanske ha this.allStates för att jämföra om någon ändring skett någonstans?
        this.listeners = {};
        // this.state ska eventuellt vara en privat variabel
        this.state = state;
    }

    set state(newState) {
        // Kollar om nycklarna i statet finns med när nytt state läggs in, så det inte läggs till andra nycklar
        if (typeof newState !== "object" || !Array.isArray(newState)) {
            return;
        } else {
            Object.assign(this.state, newState);
        }

        for (let key in newState) {
            this.notify(key, newState[key]);
        }


    }

    get state() {
        return this.state;
    }

    subscribe(key, callback) {
        if (!this.listeners[key]) {
            this.listeners[key] = [callback];
        } else {
            this.listeners[key] = [...this.listeners[key], callback];
        }
    }

    notify(key, payload) {
        if (!this.listeners[key]) {
            return
        } else {
            for (let callback of this.listeners[key]) {
                callback(payload);
            }
        }

    }








}