import { pubsub } from "../pubsub/Pubsub.js";
import { EVENTS } from "../pubsub/events.js";

class Router {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }


    updateUrl(searchParams) {

        let pathName = window.location.pathname;

        if (window.location.search !== searchParams) {
            history.pushState({}, "", pathName + searchParams);
        }

        let newUrl = new URL(pathName + searchParams, this.baseUrl);

        let cleanPath = newUrl.searchParams.get("page");

        let pageName = cleanPath.toUpperCase();

        console.log(EVENTS.VIEWS.PAGE.SHOW[pageName]);
        pubsub.publish(EVENTS.VIEWS.PAGE.SHOW[pageName], {
            url: newUrl
        })
    }

    urlHistoryNavigate() {
        window.addEventListener("popstate", () => {
            this.updateUrl(window.location.search);
        })
    }


}

export const router = new Router(window.location.origin);
