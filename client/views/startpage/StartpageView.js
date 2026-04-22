import { pubsub } from "../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../core/pubsub/events.js";
import "./components/StartPageTerminal.js";

class StartPageView {

    constructor() {
        this.appContent = document.querySelector("#app");
        this.subs();
    }

    subs() {
        pubsub.subscribe(EVENTS.VIEWS.PAGE.SHOW.STARTPAGE, () => {
            this.render();
        })
    }


    render() {
        this.appContent.innerHTML = `
            <header>
                <header-comp></header-comp>
            <header>
            <main>
                <start-page-terminal></start-page-terminal>
            </main>
        `;
    }


}

new StartPageView();