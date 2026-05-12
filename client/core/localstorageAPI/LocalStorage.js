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
        // })
    }

    subStateChanges() {

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

        // Object.keys(localStorage).forEach(key => {
        //     try {
        //         const data = JSON.parse(localStorage.getItem(key));
        //         if (data && data.idname) {
        //             newState[data.idname] = data; // Lägg till i vårt tillfälliga objekt
        //         }
        //     } catch (e) { }
        // });

        // // Uppdatera store EN gång med allt vi hittat
        // store.state = newState;
        // console.log("Store är nu laddad med:", store.state);

        for (let key in localStorage) {
            if (newState[key]) {
                console.log(key)
                const data = JSON.parse(localStorage.getItem(key));
                newState[data.idname] = data;
            }
        }
        store.state = newState;
    }

    clearStorage() {
        localStorage.clear();
    }


}

export const localStorageService = new LocalStorage();