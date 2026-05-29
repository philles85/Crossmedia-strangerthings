import "./components/riddle.js"
import { pubsub } from "../../core/pubsub/Pubsub.js"
import { EVENTS } from "../../core/pubsub/events.js"
import { store } from "../../core/store/Store.js";

class EndView {

    constructor() {
        this.appContent = document.querySelector("#app");
        this.subs();
    }

    subs() {
        pubsub.subscribe(EVENTS.VIEWS.PAGE.SHOW.ENDING, () => {

            store.state = {
                endingPageOpen: true
            };

            this.render();
        })
    }


    render() {
        // svara på gåtan för att få podcasten 

        this.appContent.innerHTML = `
            <header-comp></header-comp>
            <riddle-comp></riddle-comp>
            <timer-footer></timer-footer>
        `;
    }
}

new EndView();
