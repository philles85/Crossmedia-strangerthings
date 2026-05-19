import { store } from "../../core/store/Store.js";
import { pubsub } from "../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../core/pubsub/events.js";

export class GlobalTimerFunc {

    constructor() {
        this.appContent = document.querySelector("#app");

        // store.subscribe("currentTime", () => {
        //     if (store.state.currentTime.time == 5400000) {
        // }
        // })

        pubsub.publish(EVENTS.GAME.TIMER.HALF);

        pubsub.subscribe(EVENTS.GAME.TIMER.START, () => {
            store.state = { startedTime: { idname: "startedTime", time: Date.now() } };
            setInterval(() => {
                this.timerLogic();
            }, 1000)

        })

        if (store.state.startedTime.time) {
            setInterval(() => {
                this.refreshTimerLogic();
            }, 1000);
        }


    }

    timerLogic() {
        let currTime = store.state.currentTime.time;
        console.log(Date.now())
        currTime = currTime - 1000;

        store.state = { currentTime: { idname: "currentTime", time: currTime } };
    }

    refreshTimerLogic() {
        let totalTime = 10800000;
        let currTime = store.state.currentTime.time;
        let startedDate = store.state.startedTime.time;
        let currentDate = Date.now();

        let timeDiff = currentDate - startedDate;


        if (timeDiff <= 0) {
            currTime = currTime - 1000;
        } else {
            currTime = totalTime - timeDiff;
        }


        store.state = { currentTime: { idname: "currentTime", time: currTime } };


    }





}

new GlobalTimerFunc();