import { store } from "../../../core/store/Store.js";
import { pubsub } from "../../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../../core/pubsub/events.js";


class TimerEnded extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render()
    }
    subs(){
    }

    render() {
        this.shadowRoot.innerHTML = `

        <style>
            div{
                display: none;
                position: absolute;
                width: 100%;
                hight: 100%;
            }
        </style>
        <div>
            <h1>time is up</h1>
        </div>
        `;
    }

}

customElements.define("timer-ended", TimerEnded);