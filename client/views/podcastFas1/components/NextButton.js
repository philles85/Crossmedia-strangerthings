import { pubsub } from "../../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../../core/pubsub/events.js";
import { router } from "../../../core/router/Router.js";

class NextButton extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render()
        this.subs()
    }

    subs() {
        this.shadowRoot.querySelector("div").addEventListener("click", () => {
            router.updateUrl("?page=timer")
            pubsub.publish(EVENTS.VIEWS.PAGE.SHOW.TIMER);
        })
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    display: flex;
                    justify-content: end;
                    align-items: center;
                    font-size: 52px;
                    border-radius: 10px;
                    color: red;
                    padding: 30px;
                    cursor: pointer;
                }
                
            </style>
           
            <div>&rarr;</div>

        `
    }
}

customElements.define("next-button", NextButton);