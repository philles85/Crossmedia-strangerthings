import "./components/StartPageTerminal.js";

class StartPageView {

    constructor() {
        this.appContent = document.querySelector("#app");
        this.render();
    }

    subs() {

    }


    render() {
        this.appContent.innerHTML = `
            <header-comp></header-comp>
            <start-page-terminal></start-page-terminal>
        `;
    }


}

new StartPageView();