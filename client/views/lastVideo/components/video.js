import { pubsub } from "../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../core/pubsub/events.js";
import { router } from "../../../core/router/Router.js";


class VideoComp {

    constructor() {
        this.appContent = document.querySelector("#app");
        this.render();
    }



    render() {
        this.appContent.innerHTML = `
            <style>
                video{
                    transform: rotate(90deg);
                    width: 250px;
                }
            </style>
            <video controls>
                <source src="./views/lastVideo/components/StrangerThingsJohanv4.mp4" type="video/mp4"/>
            </video>
        `;
    }


}

customElements.define("video-comp", VideoComp)