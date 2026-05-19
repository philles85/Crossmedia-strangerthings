import { pubsub } from "../../core/pubsub/Pubsub.js";
import { EVENTS } from "../../core/pubsub/events.js";
import "./components/HalfTimePopup.js";

class PopupView {

    constructor() {
        this.appContent = document.querySelector("#app");
        this.subs();
        this.render()
    }

    subs() {
        // pubsub.subscribe(EVENTS.GAME.TIMER, () => {
        //     this.render();
        // })
    }


    render() {
        this.appContent.innerHTML = `
            <halftime-popup></halftime-popup>
        `;
    }


}

new PopupView();