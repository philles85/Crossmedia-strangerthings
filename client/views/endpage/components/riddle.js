import "../../../globalcomponents/podComp/PodComp.js";
import { pubsub } from "../../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../../core/pubsub/events.js";

class Riddle extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    // när input är korrekt ska det skickas en pubsub.publish(EVENTS.VIEWS.POPUP.SHOW.AUDIO)

    render(){
        // svara på gåtan för att få podcasten 
        this.shadowRoot.innerHTML = `
            <input>Hej</input>
            <podcast-comp type="fas4"></podcast-comp">

        `
    }
}

customElements.define("riddle-comp", Riddle);