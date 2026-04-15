class Router {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }


    updateUrl(path) {
        history.pushState({ "": path });

        let newUrl = new URL(path, this.baseUrl);
        // let urlPath = newUrl.pathname;
        // let searchParams = newUrl.searchParams;
        let pageName = path.toUpperCase();

        // Publicerar ett event utifrån vilken path det är
        PubSub.publish(EVENTS.VIEWS.PAGE[pageName], {
            url: newUrl
        })

    }

    urlHistory() {
        window.addEventListener("popstate", function () {
            this.updateUrl(window.location.pathname);
        })
    }


}

new Router("http://localhost:8000");