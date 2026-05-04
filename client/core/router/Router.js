import { pubsub } from "../pubsub/Pubsub.js";
import { EVENTS } from "../pubsub/events.js";

class Router {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }


    updateUrl(pathname, searchParams) {
        console.log(pathname)
        history.pushState({}, { "": pathname + searchParams });

        // Lägg in en kontroll här om exempelvis url: index.html?=start, Vi måste ha en start url så webshare kan navigera en vidare
        // eftersom webshare defaultar till index.html alltid, och vi kan inte använda interna sökvägar via webshare för starta på sidan
        // efter det kan våra sökvägar användas för att navigera en vidare och rendera nytt.

        let newUrl = new URL(pathname + searchParams, this.baseUrl);
        console.log(newUrl)
        // let urlPath = newUrl.pathname;
        // let searchParams = newUrl.searchParams;
        let cleanPath = newUrl.searchParams.get("page");
        console.log(cleanPath)
        // let cleanPath = path.split("/").pop();
        let pageName = cleanPath.toUpperCase();

        // Publicerar ett event utifrån vilken path det är
        console.log(EVENTS.VIEWS.PAGE.SHOW[pageName]);
        pubsub.publish(EVENTS.VIEWS.PAGE.SHOW[pageName], {
            url: newUrl
        })

    }

    urlHistory() {
        window.addEventListener("popstate", function () {
            this.updateUrl(window.location.pathname, this.window.location.search);
        })
    }


}

export const router = new Router(window.location.origin);
