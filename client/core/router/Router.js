import { pubsub } from "../pubsub/Pubsub.js";
import { EVENTS } from "../pubsub/events.js";

class Router {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }


    updateUrl(path) {
        history.pushState({}, { "": path });

        let newUrl = new URL(path, this.baseUrl);
        // let urlPath = newUrl.pathname;
        // let searchParams = newUrl.searchParams;
        let cleanPath = path.split("/").pop();
        let pageName = cleanPath.toUpperCase();

        // Publicerar ett event utifrån vilken path det är
        console.log(EVENTS.VIEWS.PAGE.SHOW[pageName]);
        pubsub.publish(EVENTS.VIEWS.PAGE.SHOW[pageName], {
            url: newUrl
        })

    }

    urlHistory() {
        window.addEventListener("popstate", function () {
            this.updateUrl(window.location.pathname);
        })
    }


}

export const router = new Router("http://localhost:8000");
