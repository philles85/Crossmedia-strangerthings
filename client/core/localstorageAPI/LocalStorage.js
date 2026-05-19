import { store } from "../store/Store.js";

class LocalStorage {

    constructor() {
        this.stuffs = {
            currentTime: null,
            startedTime: null
        }
        this.selections = {
            currentTime: null,
            startedTime: null
        }
        this.storage = localStorage;

        store.subscribe("currentTime", (data) => {
            // this.setItemStorage({ currentTime: data });
            this.setItemStorage({ currentTime: data });
            console.log("HSS")
        })
        // store.subscribe("currentMap", (data) => {
        //     console.log("HSS")
        //     this.setItemStorage(data);
        // }       
        store.subscribe("startedTime", (data) => {
            // this.setItemStorage({ startedTime: data });
            this.setItemStorage({ startedTime: data });
            console.log("WORK")

        })

        this.storageUpdateState();

    }


    setItemStorage(data) {
        if (!data) {
            return;
        }
        localStorage.setItem(Object.keys(data), JSON.stringify(data));
        // this.stuffs = {
        //     ...this.stuffs,
        //     ...data
        // }
        // localStorage.setItem("stuffs", JSON.stringify(this.stuffs));

        // if (!data) {
        //     return;
        // }

        // localStorage.setItem(data.idname, JSON.stringify(data));

    }

    getItemStorage(data) {
        if (!data) {
            return localStorage.getItem("state");
        } else {
            return localStorage.getItem(`state.${data}`);
        }
    }

    storageUpdateState() {

        // Sebbes lösning
        // if (localStorage.getItem("stuffs")) {
        //     this.stuffs = JSON.parse(localStorage.getItem("stuffs"))
        //     store.state.currentTime = this.stuffs.currentTime;
        //     store.state.startedTime = this.stuffs.startedTime;
        // }

        for (let key in this.selections) {
            let selection = JSON.parse(localStorage.getItem(key));
            console.log(key)
            console.log(selection)

            store.state = selection;
            console.log(store.state);
        }


        // GÖR OM LOCALSTORAGE, SÅ ATT DEN UPPDATERAR STATE ALLTID, OCH HELA STATE OCH INTE BARA VARJE GREJ HELA TIDEN VIA LOOP
        // let newState = { ...store.state }; // Ta nuvarande state som bas
        // console.log(newState)
        // for (let i = 0; i < localStorage.length; i++) {
        //     let key = localStorage.key(i);

        //     const data = JSON.parse(localStorage.getItem(key));

        //     if (data) {
        //         console.log(data)
        //         console.log(key)

        //         store.state = { [data.idname]: data };;
        //         console.log(store.state);
        //     }
        // }

        // store.state = newState;
    }

    clearStorage() {
        localStorage.clear();
    }


}

new LocalStorage();