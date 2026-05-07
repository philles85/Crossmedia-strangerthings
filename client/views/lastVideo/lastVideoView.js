import "./components/video.js";

import { pubsub } from "../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../core/pubsub/events.js";

class LastVideoView {

    constructor() {
        this.appContent = document.querySelector("#app");
        this.subs();
    }

    subs() {
        pubsub.subscribe(EVENTS.VIEWS.PAGE.SHOW.LASTPAGE, () => {
            this.render();
        })
    }


    render() {
        this.appContent.innerHTML = `
            <video-comp></video-comp>
        `;
    }


}

new LastVideoView();