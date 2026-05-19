import { pubsub } from "../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../core/pubsub/events.js";
import "./components/Timer.js";
import "../../globalcomponents/timercomp/TimerComponent.js";

class StartPageView {

    constructor() {
        this.appContent = document.querySelector("#app");
        this.subs();
    }

    subs() {
        pubsub.subscribe(EVENTS.VIEWS.PAGE.SHOW.TIMER, () => {
            this.render();
        })
    }


    render() {
        this.appContent.innerHTML = `
            <header-comp></header-comp>
            <timer-circle></timer-circle>
            <timer-footer></timer-footer>
            <timer-ended></timer-ended>
        `;
    }


}

new StartPageView();