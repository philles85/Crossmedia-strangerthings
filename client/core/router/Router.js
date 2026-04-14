class Router {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }


    updateUrl(path) {
        history.pushState({ "": path });

        let newUrl = new URL(path, this.baseUrl);

        PubSub.publish("EVENTNAME", {
            urlPath: newUrl.pathname,
            urlSearchParams: newUrl.searchParams
        })

    }

    urlHistory() {
        window.addEventListener("popstate", function () {
            this.updateUrl(window.location.pathname);
        })
    }


}

new Router("http://localhost:8000");