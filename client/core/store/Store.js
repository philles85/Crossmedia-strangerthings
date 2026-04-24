import { state } from "./state.js";

class Store {

    constructor(startState) {
        // Kanske ha this.allStates för att jämföra om någon ändring skett någonstans?
        this.listeners = {};
        // this.state ska eventuellt vara en privat variabel
        this._state = startState;
    }

    set state(newState) {
        // Kollar om nycklarna i statet finns med när nytt state läggs in, så det inte läggs till andra nycklar
        if (typeof newState !== "object" || newState == null || Array.isArray(newState)) {
            return;
        } else {
            Object.assign(this._state, newState);
            // state = {
            //     ...state,
            //     ...newState
            // }
        }

        for (let key in newState) {
            this.notify(key, newState[key]);
        }


    }

    get state() {
        return this._state;
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

export const store = new Store(state);