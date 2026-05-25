import { pubsub } from "../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../core/pubsub/events.js";
import "./components/Timer.js";
import "../../globalcomponents/timercomp/TimerComponent.js";
import "./components/ended.js";
import "./components/backButton.js";

class StartPageView {

    constructor() {
        this.appContent = document.querySelector("#app");
        this.subs();
    }

    subs() {
        pubsub.subscribe(EVENTS.VIEWS.PAGE.SHOW.TIMER, () => {
            this.render();
        })

        pubsub.subscribe(EVENTS.VIEWS.POPUP.SHOW.TIMERENDED, () => {
            this.render();
            this.appContent.innerHTML += "<timer-ended></timer-ended>"
        })

    }


    render() {
        this.appContent.innerHTML = `
            <header-comp></header-comp>
            <timer-circle></timer-circle>
            <back-button></back-button>
        `;
    }


}

new StartPageView();