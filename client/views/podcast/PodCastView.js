import "./components/PodFas1.js";
import { pubsub } from "../../../core/pubsub/Pubsub.js"
import { EVENTS } from "../../../core/pubsub/events.js"

class PodCastView {

    constructor() {
        this.appContent = document.querySelector("#app");
        // this.render();
        this.subs();
    }

    subs() {
        pubsub.subscribe(EVENTS.VIEWS.PAGE.SHOW.PODCAST, () => {
            this.render();
            console.log("hejs")
        })
    }


    render() {
        this.appContent.innerHTML = `
            <pod-fas1></pod-fas1">
        `;
    }


}

new PodCastView();