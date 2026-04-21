import PubSub from "../../../core/pubsub/Pubsub.js"
import EVENTS from "../../../core/pubsub/events.js"

class PodFas1 extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.subs();
    }

    subs() {
        PubSub.subscribe(EVENTS.VIEWS.PAGE.SHOW.PODCAST, () => {
            this.render();
        })
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
            </style>
            <div id="header">
                <audio controls autoplay>
                    <source src="../podcasts/testSound.mp3" type="audio/mpeg"> 

                </audio>
                
            </div>
        `
    }
}

customElements.define("pod-fas1", PodFas1);