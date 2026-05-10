import { store } from "../store/Store.js";

class LocalStorage {

    constructor() {
        this.storage = localStorage;
    }

    subStateChanges() {
        store.subscribe("currentTime", (data) => {

        })
        store.subscribe("currentMap", (data) => {

        })
    }

    setItemStorage(data) {
       
    }

    getItemsStorage(data) {
        if (!data) {
            return localStorage.getItem("state");
        } else {
            return localStorage.getItem(`state.${data}`);
        }
    }

    clearStorage() {

    }


}