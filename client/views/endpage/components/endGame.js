import "../../../globalcomponents/podComp/PodComp.js";
import { pubsub } from "../../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../../core/pubsub/events.js";
import "../../navigation/components/startMap.js";

class EndGame extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.subs()
    }

    subs() {
        pubsub.subscribe(EVENTS.VIEWS.POPUP.SHOW.AUDIO, () => {
            this.render()
        })
    }

    render() {
        this.shadowRoot.innerHTML = `
            <podcast-comp type="fas4"></podcast-comp">

        `
    }
}

customElements.define("end-comp", EndGame);