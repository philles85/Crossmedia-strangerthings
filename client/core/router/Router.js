import { pubsub } from "../pubsub/Pubsub.js";
import { EVENTS } from "../pubsub/events.js";

class Router {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    // updateUrl(searchParams) {
    //     let pathName = window.location.pathname;

    //     // 1. Pusha upp i adressfältet (görs bara när vi navigerar framåt via klick)
    //     history.pushState({}, "", pathName + searchParams);

    //     // 2. Kör den gemensamma hanteringen för att läsa URL och trigga PubSub
    //     this.handleUrl(searchParams);
    // }

    updateUrl(searchParams) {

        let pathName = window.location.pathname;

        if (window.location.search !== searchParams) {
            history.pushState({}, "", pathName + searchParams);
        }

        // Lägg in en kontroll här om exempelvis url: index.html?=start, Vi måste ha en start url så webshare kan navigera en vidare
        // eftersom webshare defaultar till index.html alltid, och vi kan inte använda interna sökvägar via webshare för starta på sidan
        // efter det kan våra sökvägar användas för att navigera en vidare och rendera nytt.

        let newUrl = new URL(pathName + searchParams, this.baseUrl);
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

    updateBrowserPath() {

    }

    // Vi behöver nog inte använda bakåtpilarna på sidan? Då behövs ej metoden
    urlHistoryNavigate() {
        window.addEventListener("popstate", () => {
            this.updateUrl(window.location.search);
        })
    }


}

export const router = new Router(window.location.origin);
