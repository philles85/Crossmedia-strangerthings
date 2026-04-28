import "../../globalcomponents/podComp/PodComp.js";
import { pubsub } from "../../../core/pubsub/Pubsub.js"
import { EVENTS } from "../../../core/pubsub/events.js"

class PodCastView {

    constructor() {
        this.appContent = document.querySelector("#app");
        // this.render();
        this.subs();
    }

    subs() {
        pubsub.subscribe(EVENTS.VIEWS.PAGE.SHOW.ENDING, () => {
            this.render();
        })
    }


    render() {
        this.appContent.innerHTML = `
            <header-comp></header-comp>
            <podcast-comp type="fas4"></podcast-comp">
        `;
    }
}

new PodCastView();
