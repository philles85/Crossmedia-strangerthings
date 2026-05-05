import "./components/endGame.js"
import { pubsub } from "../../core/pubsub/Pubsub.js"
import { EVENTS } from "../../core/pubsub/events.js"

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
            <end-comp></end-comp>
        `;
    }
}

new PodCastView();
