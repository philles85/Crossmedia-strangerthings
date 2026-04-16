class StartPageTerminal extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    subs() {

    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                
            </style>
        
        `
    }



}

customElements.define("start-page-terminal", StartPageTerminal);