import { store } from "../store/Store.js";

class LocalStorage {

    constructor() {
        this.storage = localStorage;

        store.subscribe("currentTime", (data) => {
            this.setItemStorage(data);
            console.log("HSS")
        })
        // store.subscribe("currentMap", (data) => {
        //     console.log("HSS")
        //     this.setItemStorage(data);
        // }       
        store.subscribe("startedTime", (data) => {
            this.setItemStorage(data);
            console.log("WORK")

        })

        this.storageUpdateState();
    }


    setItemStorage(data) {
        if (!data) {
            return;
        }

        localStorage.setItem(data.idname, JSON.stringify(data));

    }

    getItemStorage(data) {
        if (!data) {
            return localStorage.getItem("state");
        } else {
            return localStorage.getItem(`state.${data}`);
        }
    }

    storageUpdateState() {
        let newState = { ...store.state }; // Ta nuvarande state som bas
        console.log(newState)
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);

            const data = JSON.parse(localStorage.getItem(key));

            if (data) {
                console.log(data)
                console.log(key)

                store.state = { [data.idname]: data };;
                console.log(store.state);
            }
        }

        // store.state = newState;
    }

    clearStorage() {
        localStorage.clear();
    }


}

new LocalStorage();