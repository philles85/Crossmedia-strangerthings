import "./components/StartMap.js";

import { pubsub } from "../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../core/pubsub/events.js";

class NavigationView {


    constructor() {
        this.appContent = document.querySelector("#app");
        this.subs();
    }

    subs() {
        pubsub.subscribe(EVENTS.VIEWS.PAGE.SHOW.NAVIGATION, () => {
            this.render();
        })
    }



    render() {
        this.appContent.innerHTML = `
        <start-map></start-map>
        <p>HEJ</p>
        
        `;
    }



}

new NavigationView();