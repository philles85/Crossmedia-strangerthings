import "../../globalcomponents/podComp/PodComp.js";
import { pubsub } from "../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../core/pubsub/events.js";

class PodCastView {

    constructor() {
        this.appContent = document.querySelector("#app");
        this.subs();
    }

    subs() {
        pubsub.subscribe(EVENTS.VIEWS.PAGE.SHOW.PODCAST, () => {
            this.render();
        })
    }


    render() {
        this.appContent.innerHTML = `
            <header-comp></header-comp>
            <podcast-comp type="fas1"></podcast-comp>
        `;
    }


}

new PodCastView();