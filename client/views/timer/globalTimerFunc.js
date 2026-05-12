import { store } from "../../core/store/Store.js";

class GlobalTimerFunc {

    constructor() {
        this.appContent = document.querySelector("#app");

    }

    timerLogic() {
        let currTime = store.state.currentTime.time;

        currTime = currTime - 1000;

        store.state = { currentTime: { idname: "currentTime", time: currTime } };
    }




}

export const globalTime = new GlobalTimerFunc();