import { pubsub } from "../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../core/pubsub/events.js";
import "../../globalcomponents/timercomp/TimerComponent.js";
import "./components/ended.js";

class GameOverView {

    constructor() {
        this.appContent = document.querySelector("#app");
        this.subs();
    }

    subs() {
        pubsub.subscribe(EVENTS.VIEWS.PAGE.SHOW.TIMERENDED, () => {
            this.render();
        })

    }


    render() {
        this.appContent.innerHTML = `
            <timer-ended></timer-ended>
            <timer-footer></timer-footer>
        `;
    }


}

new GameOverView();