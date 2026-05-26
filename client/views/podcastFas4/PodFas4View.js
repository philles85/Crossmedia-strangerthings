import "../../globalcomponents/podComp/PodComp.js";
import "../../globalcomponents/timercomp/TimerComponent.js";

import { pubsub } from "../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../core/pubsub/events.js";

class PodCastFas4View {

    constructor() {
        this.appContent = document.querySelector("#app");
        this.subs();
    }

    subs() {
        pubsub.subscribe(EVENTS.VIEWS.PAGE.SHOW.PODCASTFAS4, () => {

            this.render();
        })
    }


    render() {
        this.appContent.innerHTML = `
            <header-comp></header-comp>
            <podcast-comp type="fas4"></podcast-comp>
            <timer-footer></timer-footer>
        `;
    }


}

new PodCastFas4View();