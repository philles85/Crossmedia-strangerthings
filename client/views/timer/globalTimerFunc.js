import { store } from "../../core/store/Store.js";
import { pubsub } from "../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../core/pubsub/events.js";

export class GlobalTimerFunc {

    constructor() {
        this.appContent = document.querySelector("#app");
        this.timerInterval;
        this.correctRadians = (Math.PI * 2) / 10800;
        console.log(this.correctRadians)
        this.subs()


    }

    subs() {
        pubsub.subscribe(EVENTS.GAME.TIMER.START, () => {
            store.state = { startedTime: Date.now() };
            this.timerInterval = setInterval(() => {
                this.timerLogic();
            }, 1000)

        })
        console.log(store.state.startedTime)
        if (store.state.startedTime) {
            this.timerInterval = setInterval(() => {
                this.refreshTimerLogic();
            }, 1000);
        }

        store.subscribe("currentTime", (time) => {
            let currentEndAngle = store.state.timerCircleAngle;

            currentEndAngle = currentEndAngle - this.correctRadians;

            store.state = { timerCircleAngle: currentEndAngle };

            if (time == 0) {
                clearInterval(this.timerInterval);

                pubsub.publish(EVENTS.VIEWS.POPUP.SHOW.TIMERENDED)
                return;
            }
        })
    }

    timerLogic() {
        let currTime = store.state.currentTime;
        console.log(Date.now())
        currTime = currTime - 1000;

        store.state = { currentTime: currTime };
    }

    refreshTimerLogic() {
        let totalTime = 10800000;
        let currTime = store.state.currentTime;
        let startedDate = store.state.startedTime;
        let currentDate = Date.now();

        let timeDiff = currentDate - startedDate;


        if (timeDiff <= 0) {
            currTime = currTime - 1000;
        } else {
            currTime = totalTime - timeDiff;
        }

        store.state = { currentTime: currTime };

    }





}

new GlobalTimerFunc();