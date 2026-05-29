import { store } from "../store/Store.js";

class LocalStorage {

    constructor() {
        this.selections = {
            currentTime: null,
            startedTime: null,
            currentMap: null,
            timerCircleAngle: null,
            endingPageOpen: null,
            lastPageOpen: null
        }
        this.storage = localStorage;

        store.subscribe("currentTime", (data) => {
            this.setItemStorage({ currentTime: data });
            console.log("HSS")
        })

        store.subscribe("startedTime", (data) => {
            this.setItemStorage({ startedTime: data });
            console.log("WORK")

        })

        store.subscribe("currentMap", (data) => {
            console.log(data)
            this.setItemStorage({ currentMap: data });
            console.log("WORK")

        })

        store.subscribe("timerCircleAngle", (data) => {
            this.setItemStorage({ timerCircleAngle: data })
        })

        store.subscribe("endingPageOpen", (data) => {
            this.setItemStorage({ endingPageOpen: data });
        })

        store.subscribe("lastPageOpen", (data) => {
            this.setItemStorage({ lastPageOpen: data });
        })

        this.storageUpdateState();
        // this.clearStorage()
    }


    setItemStorage(data) {
        if (!data) {
            return;

        }
        localStorage.setItem(Object.keys(data), JSON.stringify(data));

    }

    getItemStorage(data) {
        if (!data) {
            return localStorage.getItem("state");
        } else {
            return localStorage.getItem(`state.${data}`);
        }
    }

    storageUpdateState() {

        for (let key in this.selections) {
            let selection = JSON.parse(localStorage.getItem(key));
            console.log(selection)
            store.state = selection;

        }

    }

    clearStorage() {
        localStorage.clear();
    }


}

new LocalStorage();