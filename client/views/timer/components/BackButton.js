import { pubsub } from "../../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../../core/pubsub/events.js";
import { router } from "../../../core/router/Router.js";

class BackButton extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render()
        this.subs()
    }

    subs() {
        this.shadowRoot.querySelector("div").addEventListener("click", () => {
            router.updateUrl("?page=podcast")
            pubsub.publish(EVENTS.VIEWS.PAGE.SHOW.PODCAST);
        })
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    font-size: 52px;
                    color: red;
                    padding: 30px;
                    cursor: pointer;
                }
                
            </style>
           
            <div>&larr;</div>

        `
    }
}

customElements.define("back-button", BackButton);