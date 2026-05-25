import "./components/endGame.js"
import "./components/riddle.js"
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
        // svara på gåtan för att få podcasten 

        this.appContent.innerHTML = `
            <header-comp></header-comp>
            <riddle-comp></riddle-comp>
            <timer-footer></timer-footer>
            <end-comp></end-comp>
        `;
    }
}

new PodCastView();
